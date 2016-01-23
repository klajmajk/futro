<?php

namespace App\FutroModule\Presenters;

use Nette\Utils\DateTime,
	Drahak\Restful\Application\UI\ResourcePresenter,
	Drahak\Restful\Application\BadRequestException;

/**
 * CRUD resource presenter
 * @package ResourcesModule
 * @author Václav Novotný
 */
class StatPresenter extends BasePresenter
{
	
	const MAX_DAYS_TO_NOT_OPTIMIZE = 30;
	const MAX_DATES_WHEN_OPTIMIZE = 9;
	
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
		$this->setDatabaseForDate();
		$this->setDatabaseForSeries();
						
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
			$groupBy .= ", date";
			$dateCol = $this->data.'.'.$dataSource['dateCol'];
			$oldestRecord = $this->db->table($this->data)
						->order($dateCol)->limit(1)->fetch()
						->$dataSource['dateCol'];
			$newestRecord = $this->db->table($this->data)
						->order($dateCol.' DESC')->limit(1)->fetch()
						->$dataSource['dateCol'];
			
			if ($this->dateBegin) {
				$this->encapsulateInDateTime ($this->dateBegin);
				$this->table->where($dateCol.' >= ?', $this->dateBegin);
				$dateBegin = $this->dateBegin->format('U') < $oldestRecord->format('U') ?
						$oldestRecord : $this->dateBegin;
			} else {
				$dateBegin = $oldestRecord;
			}
			
			if ($this->dateEnd) {
				$this->encapsulateInDateTime ($this->dateEnd);
				$this->table->where($dateCol.' <= ?', $this->dateEnd);
				$dateEnd = $this->dateEnd->format('U') > $newestRecord->format('U') ?
						$newestRecord : $this->dateEnd;
			} else {
				$dateEnd = $newestRecord;
			}
			
			$diffDays = $dateBegin->diff($dateEnd)->days;
			if ($diffDays > static::MAX_DAYS_TO_NOT_OPTIMIZE) {
				$interval = $diffDays / (static::MAX_DATES_WHEN_OPTIMIZE - 1) * 86400;
				$beginTimestamp = $dateBegin->format('U');
				$dateCol = "FROM_UNIXTIME("
						. "(UNIX_TIMESTAMP($dateCol) - $beginTimestamp)"
						. " DIV $interval * $interval + $beginTimestamp)";
			}
			
			$this->table
				->select("DATE_FORMAT($dateCol, ?) AS date", '%Y-%m-%d')
				->order($dateCol);
		}
		
		$this->table->group($groupBy);
	}
	
	
	
}