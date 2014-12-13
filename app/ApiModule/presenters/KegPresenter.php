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
		$e = new \Exception('Keg can be modified only in relation to tap', 403);
		$this->sendErrorResource($e);
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
