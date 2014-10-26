<?php

namespace App\ApiModule\Presenters;

use Nette,
	Drahak\Restful\IResource;

/**
 * CRUD resource presenter
 * @package ResourcesModule
 * @author Václav Novotný
 */
class BasePresenter extends \Drahak\Restful\Application\UI\ResourcePresenter
{

	const DATE_FORMAT = Nette\Utils\DateTime::ISO8601;

	protected $db;
	protected $table;


	public function __construct(Nette\Database\Context $database)
	{
		parent::__construct();
		$this->db = $database;

		$table = $this->tableNameByClass(get_class($this));
		$this->table = $database->table($table);
	}


	protected function flatten(array &$input)
	{
		foreach ($input as $key => &$ipt)
			if (is_array($ipt))
				$ipt = (int) $ipt['id_'.$key];
	}


	protected function normalizeDate(&$input)
	{
		foreach ($input as $key => &$ipt)
			if ($timestamp = strtotime($ipt)) {
				$ipt = new Nette\Utils\DateTime();
				$ipt->setTimestamp($timestamp);
			}
				
	}

 
	private function tableNameByClass($className)
	{
		$tableName = explode("\\", $className);
		$tableName = lcfirst(array_pop($tableName));
		$tableName = substr($tableName, 0, -9); // remove "Presenter"

		$replace = array(); // A => _a
		foreach (range("A", "Z") as $letter)
			$replace[$letter] = "_".strtolower($letter);

		return strtr($tableName, $replace);
	}


	protected function getInputData($checkDate = true, $flatten = true)
	{
		$input = $this->input->getData();
                //var_dump($input);
		$converter = new \Drahak\Restful\Converters\SnakeCaseConverter();
		$input = $converter->convert($input);
		if ($flatten)
			$this->flatten($input);
		return $input;
	}


	/*
	  public function actionCreate()
	  {
	  $this->resource->action = 'Create';
	  $input = $this->getInputData();
	  $this->table->insert($input);
	  $this->resource->message = 'good';
	  }


	  public function actionRead()
	  {
	  $this->resource->action = 'Read';
	  $this->resource = iterator_to_array($this->table, false);
	  $this->sendResource(IResource::JSON);
	  }


	  public function actionUpdate($id)
	  {
	  $this->resource->action = 'Update';
	  $input = $this->getInputData();
	  $this->table->get($id)->update($input);
	  }


	  public function actionDelete($id)
	  {
	  $this->resource->action = 'Delete';
	  $this->table->get($id)->delete();
	  }
	 */

}
