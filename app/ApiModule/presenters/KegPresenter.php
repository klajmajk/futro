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

	// if fraction (real_consumption/keg_volume) lower than this
	// during attempt to FINISH keg, mistaken request is assumed
	const MIN_CONSUMPTION_EFFECTIVENESS = 0.7;

	/** possible keg volumes in mililitres
	 * @var array */
	private $volumes = array(5000, 10000, 15000, 20000, 30000, 50000);

	/** possible keg states in order new >>> depleted
	 * @var array */
	private $states = array('STOCKED', 'TAPPED', 'FINISHED');

	
	public function __construct(Nette\Database\Context $database)
	{
		parent::__construct($database);

		$this->deepListing = array('beer' => array('brewery'));
		$this->queryFilter = array('state' => array('default' => array('TAPPED', 'STOCKED')));
	}
	
	
	public function validateCreate()
	{
		$this->input->field('volume')->addRule(IValidator::IS_IN, 'Unsupported keg volume', $this->volumes);
	}


	public function validateUpdate()
	{
		$this->input->field('state')->addRule(IValidator::IS_IN, 'Unsupported keg state', $this->states);
	}
	
	public function actionCreate()
	{
		try {
			$this->inputData['state'] = $this->states[0];
			if (empty($this->inputData['date_add']))
				$this->inputData['date_add'] = date('c');
			$quantity = (int) $this->inputData['quantity'] ?: 1;
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
		try {
			// db transaction - no db changes will be stored if error occurs
			$this->db->beginTransaction();
			$keg = $this->table->get((int) $id ?: $this->inputData['id']);
			
			if ($keg->state === $this->inputData['state'])
				throw new \Exception('No change in state. Other values cannot be modified', 403);
			if ($keg->state === $this->states[2])
				throw new \Exception('Cannot change state of finished keg.', 403);
			if ($keg->state === $this->states[0] && $this->inputData['state'] === $this->states[2])
				throw new \Exception('Cannot finish untapped barrel.', 403);
			
			// currently only keg.state and datetime data can be updated
			$data = array('state' => $this->inputData['state']);			
			if ($this->inputData['state'] === $this->states[2]) {
				$data['date_end'] = empty($this->inputData['date_end']) ?
						date('c') : $this->inputData['date_end'];
				$consumption = $keg->related('consumption.keg')
						->select('user, SUM(volume) AS volume')
						->group('user');
				
				$total_consumption = $consumption->sum('volume');
				if ($total_consumption / $keg->volume < self::MIN_CONSUMPTION_EFFECTIVENESS)
					throw new \Exception('Real consumption too low, assumed mistaken request', 403);
				$price_per_ml = $keg->price / $total_consumption;
				
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
			} else if ($this->inputData['state'] === $this->states[1] && $keg->date_tap === NULL) {
				$data['date_tap'] = empty($this->inputData['date_tap']) ?
						date('c') : $this->inputData['date_tap'];
			}
			
			$keg->update($data);
			$this->db->commit();
			$this->resource = $keg->toArray();
			$this->getDeepData($this->resource, $keg, $this->deepListing);
		} catch (\Exception $ex) {
			$this->db->rollBack();
			$this->sendErrorResource($ex);
		}
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
