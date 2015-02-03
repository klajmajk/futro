<?php

namespace App\ApiModule\Presenters;

use Drahak\Restful\Application\UI\ResourcePresenter,
	Drahak\Restful\Application\BadRequestException;

/**
 * CRUD resource presenter
 * @package ResourcesModule
 * @author Václav Novotný
 */
class StatPresenter extends BasePresenter
{
	
	private $labels;
	private $data;
	private $dateBegin;
	private $dateEnd;
	
	private $relations = array(
		'consumption' => array(
			'user' => 'user',
			'beer' => 'keg.beer'
		),
		'credit' => array(
			'user' => 'user',
			'beer' => 'keg.beer'
		)
	);
	
	
	public function startup()
	{
		if ($this->getAction() !== 'read')
			throw BadRequestException::forbidden('Stat presenter handles GET requests ONLY.');
			
		ResourcePresenter::startup();
		
		$this->labels = $this->getParameter('labels');
		$this->data = $this->getParameter('data');
		$this->dateBegin = $this->getParameter('dateBegin');
		$this->dateEnd = $this->getParameter('dateEnd');
	}
	
	
	public function actionRead($id)
	{
		$this->table = $this->db->table($this->data);
		$relation = $this->relations[$this->data][$this->labels];
		$select = $this->getSelectForData().' AS data,'.
				$this->getSelectForLabels($relation).' AS labels';
		$this->table->select($select)->group($relation);
		
		if ($this->dateBegin) {
			$this->encapsulateInDateTime ($this->dateBegin);
			$this->table->where('date_add >= ?', $this->dateBegin);
		}
		if ($this->dateEnd) {
			$this->encapsulateInDateTime ($this->dateEnd);
			$this->table->where('date_add <= ?', $this->dateEnd);
		}
				
		parent::actionRead(NULL);
	}
	
	
	private function getSelectForData()
	{
		switch($this->data) {
			case 'consumption':
				$select = 'SUM(consumption.volume)';
				break;
			case 'credit':
				$select = 'FLOOR(ABS(SUM(credit.amount)))';
				$this->table->where('keg IS NOT NULL');
				break;
		}
		
		return $select;
	}
	
	
	private function getSelectForLabels($relation)
	{
		if ($relation)
			$relation .= '.';
		
		switch($this->labels) {
			case 'user':
				$select = $relation.'name';
				break;
			case 'beer':
				$select = 'CONCAT('.$relation.'brewery.name, \' \', '.$relation.'name)';
				$this->table->where('keg IS NOT NULL');
				break;
		}
		
		return $select;
	}
	
}
