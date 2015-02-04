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
	
	private $series;
	private $data;
	private $dateBegin;
	private $dateEnd;
	
	private $dataSources = array(
		'consumption' => array(
			'dataCol' => 'volume',
			'dateCol' => 'date_add',
			'relations' => array(
				'user' => 'user',
				'beer' => 'keg.beer'
			)
		),
		'credit' => array(
			'dataCol' => 'amount',
			'dateCol' => 'date_add',
			'relations' => array(
				'user' => 'user',
				'beer' => 'keg.beer'
			)
		)
	);	
	
	public function startup()
	{
		if ($this->getAction() !== 'read')
			throw BadRequestException::forbidden('Stat presenter handles GET requests ONLY.');
			
		ResourcePresenter::startup();
		
		$this->series = $this->getParameter('series');
		$this->data = $this->getParameter('data');
		$this->dateBegin = $this->getParameter('dateBegin');
		$this->dateEnd = $this->getParameter('dateEnd');
	}
	
	
	public function actionRead($id)
	{
		$this->table = $this->db->table($this->data);
		$this->setDatabaseForData();
		$this->setDatabaseForSeries();
		$this->setDatabaseForDate();
						
		parent::actionRead(NULL);
	}
	
	
	private function setDatabaseForData()
	{
		$dataSource = $this->dataSources[$this->data];
		$column = $this->data.'.'.$dataSource['dataCol'];
		
		switch($this->data) {
			case 'credit':
				$select = "FLOOR(ABS(SUM($column)))";
				$this->table->where('keg IS NOT NULL');
				break;
			case 'consumption':
				$select = "0.001 * SUM($column)";
				break;
			default:
				$select = "SUM($column)";
		}
		
		$this->table->select($select.' AS data');
	}
	
	
	private function setDatabaseForSeries()
	{
		$dataSource = $this->dataSources[$this->data];
		$relation = $dataSource['relations'][$this->series];
		if ($relation)
			$relation .= '.';
		
		switch($this->series) {
			case 'beer':
				$select = 'CONCAT('.$relation.'brewery.name, \' \', '.$relation.'name)';
				break;
			default:
				$select = $relation.'name';
		}
		
		$this->table->select($select.' AS series')->order($select);
	}
	
	
	private function setDatabaseForDate()
	{
		$dataSource = $this->dataSources[$this->data];
		$groupBy = $dataSource['relations'][$this->series];
		
		if (isset($dataSource['dateCol'])) {
			$column = $this->data.'.'.$dataSource['dateCol'];
			$this->table->select("DATE_FORMAT($column, ?) AS date", '%Y-%m-%d')
					->order($column);
			$groupBy .= ", DATE($column)";
			if ($this->dateBegin) {
				$this->encapsulateInDateTime ($this->dateBegin);
				$this->table->where($column.' >= ?', $this->dateBegin);
			}
			if ($this->dateEnd) {
				$this->encapsulateInDateTime ($this->dateEnd);
				$this->table->where($column.' <= ?', $this->dateEnd);
			}
		}
		
		$this->table->group($groupBy);
	}
	
}