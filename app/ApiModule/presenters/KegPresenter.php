<?php

namespace App\ApiModule\Presenters;

use Nette,
	Drahak\Restful\IResource,
	Drahak\Restful\Validation\IValidator,
	Drahak\Restful\Application\BadRequestException;;

/**
 * CRUD resource presenter
 * @package ResourcesModule
 * @author Václav Novotný
 */
class KegPresenter extends BasePresenter
{

	/** possible keg volumes in mililitres
	 * @var array */
	public static $volumes = array(5000, 10000, 15000, 20000, 25000, 30000, 50000);

	/** possible keg states in order new >>> depleted
	 * @var array */
	public static $states = array('STOCKED', 'TAPPED', 'FINISHED');
	
	/** extra store for $this->deepListing
	 * @var array */
	private $listing = array('beer' => array('brewery'));

	
	public function __construct(Nette\Database\Context $database)
	{
		parent::__construct($database);

		$this->deepListing = $this->listing;
		$this->queryFilter = array('state' => array('default' => array('TAPPED', 'STOCKED')));
	}
	
	
	public function validateCreate()
	{
		$this->input->field('volume')->addRule(IValidator::IS_IN, 'Unsupported keg volume.', self::$volumes);
	}


	public function validateUpdateTap()
	{
		$this->input->field('state')->addRule(IValidator::IS_IN, 'Unsupported keg state.', self::$states);
	}
	
	public function actionRead($id)
	{
		if (strcasecmp($this->getParameter('state'), self::$states[2]) === 0)
			$this->table
				->select('keg.*, SUM(:consumption.volume) AS total_consumption')
				->group('keg.id');
		
		parent::actionRead($id);
	}
	
	public function actionCreate()
	{
		try {
			$this->inputData['state'] = self::$states[0];
			$this->inputData['date_add'] = new Nette\Utils\DateTime(
					empty($this->inputData['date_add']) ?
							NULL : $this->inputData['date_add']);		
			$quantity = empty($this->inputData['quantity']) ? 1 : (int) $this->inputData['quantity'];
			$this->harmonizeInputData();
			while($quantity--)
				$row = $this->table->insert($this->inputData);
			$this->resource = $row->toArray();
			$this->getDeepData($this->resource, $row, $this->deepListing);
		} catch (\Exception $ex) {
			$this->sendErrorResource($ex);
		}
		$this->sendResource(IResource::JSON);
	}


	public function actionUpdate($id)
	{
		$e = BadRequestException::methodNotSupported('Keg can be modified only in relation to tap');
		$this->sendErrorResource($e);
	}
	
	public function actionUpdateTap($id, $relationId)
	{
		$tap = $this->db->table('tap')->get($relationId);
		$keg = $this->db->table('keg')->get($id);

		$errors = [];
		
		try {			
			// db transaction - no db changes will be stored if error occurs
			$this->db->beginTransaction();
			
			if ($keg->state === $this->inputData['state']) {
				$errors[] = 'No change in state. Other values cannot be modified';
			} else if ($keg->state === self::$states[2]) {
				$errors[] = 'Cannot change state of finished keg.';
			} else if ($keg->state === self::$states[0] && $this->inputData['state'] === self::$states[2]) {
				$errors[] = 'Cannot finish untapped barrel.';
			}
			if (count($errors) > 0)
				throw BadRequestException::unprocessableEntity($errors, 'Invalid change in state');

			// currently only keg.state and datetime data can be updated
			$dataKeg = array('state' => $this->inputData['state']);
			$dataTap = array('keg' => NULL);

			switch (array_search($this->inputData['state'], self::$states)) {
				case 1:
					if ($tap->keg !== NULL) {
						$errors[] = 'Tap already in use.';
					} else {
						$dataTap['keg'] = $id;
						if ($keg->date_tap === NULL)
							$data['date_tap'] = new Nette\Utils\DateTime(
									empty($this->inputData['date_tap']) ? NULL : $this->inputData['date_tap']);
					}
					break;
				case 2:
					$data['date_end'] = new Nette\Utils\DateTime(empty($this->inputData['date_end']) ?
							NULL : $this->inputData['date_end']);
					$this->finishAndAccount($keg, $data['date_end']);
				// there is no break; because following actions applies also for previous case
				case 0:
					if ($tap->keg != $id)
						$errors[] = 'This keg is not assigned to this tap.';
			}
			
			if (count($errors) > 0)
				throw BadRequestException::unprocessableEntity ($errors, 'Invalid Keg to Tap relation.');

			$keg->update($dataKeg);
			$tap->update($dataTap);
			$this->db->commit();
		} catch (BadRequestException $ex) {
			$this->db->rollBack();
			$this->sendErrorResource($ex);
		}

		$this->resource = $keg->toArray();
		$this->getDeepData($this->resource, $keg, $this->listing);
		$this->sendResource(IResource::JSON);
	}
	
	private function finishAndAccount(Nette\Database\Table\ActiveRow $keg, $datetime)
	{
		$consumption = $keg->related('consumption.keg')
				->select('user, SUM(volume) AS volume')
				->group('user');

		$price_per_ml = $keg->price / $consumption->sum('volume');
		$updateQuery = 'UPDATE `user` SET `balance` = `balance` - ? WHERE `id` = ?';
		foreach ($consumption as $consumer) {
			$bill = round($price_per_ml * $consumer['volume'], 2);
			$this->db->query($updateQuery, $bill, $consumer['user']);
			$this->db->table('credit')->insert(array(
				'user' => $consumer['user'],
				'date_add' => $datetime,
				'amount' => $bill * -1,
				'keg' => $keg->id
			));
		}
	}


	/**
	 * relation: keg/<id>/consumption
	 * outputs consumed ml from keg
	 * @param int $relationId
	 */	
	public function actionReadConsumption($relationId)
	{		
		parent::actionRead($relationId);
	}
	
	public function actionCreateConsumption($id)
	{
		$this->inputData['keg'] = $id;
		parent::actionCreate();
	}
	
	
}
