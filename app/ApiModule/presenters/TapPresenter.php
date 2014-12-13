<?php

namespace App\ApiModule\Presenters;

use Nette,
	Drahak\Restful\IResource;

/**
 * CRUD resource presenter
 * @package ResourcesModule
 * @author Václav Novotný
 */
class TapPresenter extends BasePresenter
{
	
	// if fraction (real_consumption/keg_volume) lower than this
	// during attempt to FINISH keg, mistaken request is assumed
	const MIN_CONSUMPTION_EFFECTIVENESS = 0.7;

	/** possible keg states in order new >>> depleted
	 * @var array */
	// TODO: also in KegPresenter
	private $states = array('STOCKED', 'TAPPED', 'FINISHED');


	public function __construct(Nette\Database\Context $database)
	{
		parent::__construct($database);

		$this->deepListing = array('keg' => array('beer' => array('brewery')));
	}


	public function startup()
	{
		\Drahak\Restful\Application\UI\ResourcePresenter::startup();

		if ($this->getAction() !== 'read' && !$this->inputData)
			$this->inputData = $this->getInputData();
	}


	public function actionCreate()
	{
		$e = new \Exception('Tap cannot be created', 403);
		$this->sendErrorResource($e);
	}


	public function actionUpdate($id)
	{
		$e = new \Exception('Tap cannot be modified', 403);
		$this->sendErrorResource($e);
	}


	public function actionDelete($id)
	{
		$e = new \Exception('Tap cannot be deleted', 403);
		$this->sendErrorResource($e);
	}


	public function actionUpdateKeg($id, $relationId)
	{
		$tap = $this->table->get((int) $id ? : $this->inputData['id']);
		$keg = $this->db->table('keg')->get((int) $relationId);

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
			$data = array('state' => $this->inputData['state']);

			if ($this->inputData['state'] === $this->states[2]) {
				if ($tap->keg != $relationId)
					throw new \Exception('This keg is not assigned to this tap', 403);
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
				$tap->update(array('keg' => null));
			} else if ($this->inputData['state'] === $this->states[1]) {
				if ($tap->keg !== NULL)
					throw new \Exception('Tap already in use', 403);
				if ($keg->date_tap === NULL)
					$data['date_tap'] = empty($this->inputData['date_tap']) ?
							date('c') : $this->inputData['date_tap'];				
				$tap->update(array('keg' => $relationId));
			} else {
				if ($tap->keg != $relationId)
					throw new \Exception('This keg is not assigned to this tap', 403);
				$tap->update(array('keg' => NULL));
			}

			$keg->update($data);
			$this->db->commit();
		} catch (Exception $ex) {
			$this->db->rollBack();
			$this->sendErrorResource($ex);
		}

		$this->resource = $tap->toArray();
		$this->getDeepData($this->resource, $tap, $this->deepListing);
		$this->sendResource(IResource::JSON);
	}


}
