<?php

namespace App\ApiModule\Presenters;

use Nette,
	Drahak\Restful\IResource,
	Drahak\Restful\Validation\IValidator;

/**
 * CRUD resource presenter
 * @package ResourcesModule
 * @author Václav Novotný
 */
class KegPresenter extends BasePresenter
{

	/** possible keg volumes in mililitres
	 * @var array */
	private $volumes = array(5000, 10000, 15000, 20000, 25000, 30000, 50000);

	/** possible keg states in order new >>> depleted
	 * @var array */
	private $states = array('STOCKED', 'TAPPED', 'FINISHED');
	
	private $listing = array('beer' => array('brewery'));

	
	public function __construct(Nette\Database\Context $database)
	{
		parent::__construct($database);

		$this->deepListing = $this->listing;
		$this->queryFilter = array('state' => array('default' => array('TAPPED', 'STOCKED')));
	}
	
	
	public function validateCreate()
	{
		$this->input->field('volume')->addRule(IValidator::IS_IN, 'Unsupported keg volume', $this->volumes);
	}


	public function validateUpdateTap()
	{
		$this->input->field('state')->addRule(IValidator::IS_IN, 'Unsupported keg state', $this->states);
	}
	
	public function actionCreate()
	{
		try {
			$this->inputData['state'] = $this->states[0];
			if (empty($this->inputData['date_add']))
				$this->inputData['date_add'] = date('c');
			$quantity = empty($this->inputData['quantity']) ? 1 : (int) $this->inputData['quantity'];
			unset($this->inputData['quantity'], $this->inputData['brewery']);
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
		$e = new \Exception('Keg can be modified only in relation to tap', 403);
		$this->sendErrorResource($e);
	}
	
	public function actionUpdateTap($id, $relationId)
	{
		$tap = $this->db->table('tap')->get((int) $relationId);
		$keg = $this->db->table('keg')->get((int) $id ? : $this->inputData['id']);

		try {
			// db transaction - no db changes will be stored if error occurs
			$this->db->beginTransaction();

			if ($keg->state === $this->inputData['state'])
				throw new \Exception('No change in state. Other values cannot be modified', 403);
			if ($keg->state === $this->states[2])
				throw new \Exception('Cannot change state of finished keg.', 403);
			if ($keg->state === $this->states[0] && $this->inputData['state'] === $this->states[2])
				throw new \Exception('Cannot finish untapped barrel.', 403);


			// currently only keg.state and datetime data can be updated
			$dataKeg = array('state' => $this->inputData['state']);
			$dataTap = array('keg' => NULL);
			
			switch (array_search($this->inputData['state'], $this->states)) {
				case 1:
					if ($tap->keg !== NULL)
						throw new \Exception('Tap already in use', 403);
					if ($keg->date_tap === NULL)
						$data['date_tap'] = empty($this->inputData['date_tap']) ?
								date('c') : $this->inputData['date_tap'];
					$dataTap = array('keg' => $id);
					break;
				case 2:
					$data['date_end'] = empty($this->inputData['date_end']) ?
							date('c') : $this->inputData['date_end'];
					$consumption = $keg->related('consumption.keg')
							->select('user, SUM(volume) AS volume')
							->group('user');

					$price_per_ml = $keg->price / $consumption->sum('volume');
					$updateQuery = 'UPDATE `user` SET `balance` = `balance` - ? WHERE `id` = ?';
					foreach ($consumption as $consumer) {
						$bill = round($price_per_ml * $consumer['volume'], 2);
						$this->db->query($updateQuery, $bill, $consumer['user']);
						$this->db->table('credit')->insert(array(
							'date_add' => $data['date_end'],
							'user' => $consumer['user'],
							'amount' => $bill * -1
						));
					}	
				// there is no break; because following actions applies also for previous case
				case 0:
					if ($tap->keg != $id)
						throw new \Exception('This keg is not assigned to this tap', 403);
			}

			$keg->update($dataKeg);
			$tap->update($dataTap);
			$this->db->commit();
		} catch (\Exception $ex) {
			$this->db->rollBack();
			$this->sendErrorResource($ex);
		}

		$this->resource = $keg->toArray();
		$this->getDeepData($this->resource, $keg, $this->listing);
		$this->sendResource(IResource::JSON);
	}
	
	/**
	 * relation: keg/<id>/consumption
	 * outputs consumed ml from keg 
	 * @param int $id
	 * @param int $relationId
	 */	
	public function actionReadConsumption($id, $relationId)
	{		
		parent::actionRead($relationId);
	}
	
	public function actionCreateConsumption($id)
	{
		
	}


}
