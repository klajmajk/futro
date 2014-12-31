<?php

namespace App\ApiModule\Presenters;

use Nette,
	Drahak\Restful\IResource,
	Drahak\Restful\Application\UI\ResourcePresenter;

/**
 * CRUD resource presenter
 * @package ResourcesModule
 * @author Václav Novotný
 */
class BasePresenter extends ResourcePresenter
{

	const DATE_FORMAT = Nette\Utils\DateTime::ISO8601;

	/** @var Nette\Database\Context */
	protected $db;

	/** @var Nette\Database\Table */
	protected $table;

	/** @var array database result filter */
	protected $queryFilter;

	/** @var array append referenced tables to database when read */
	protected $deepListing;
	
	/** @var array append referenced tables data to database output */
	protected $inputData;


	public function __construct(Nette\Database\Context $database)
	{
		parent::__construct();

		$this->db = $database;
		$tableName = $this->getTableByPresenterName();
		$this->table = $this->db->table($tableName);
	}
	
	
	public function startup()
	{
		if ($this->getAction() === 'create' AND
				(int) $this->getParameter('id') ||
				!empty($this->input->getData()['id'])) {
			$this->changeAction('update');
		}
		
		parent::startup();
		
		if ($this->getAction() !== 'read' && !$this->inputData)
			$this->inputData = $this->getInputData();
		
		$relation = $this->getParameter('relation');
		if ($relation !== null) {
			$this->table = $this->db->table($relation)
				->where($this->table->getName(), $this->getParameter('id'));
			$this->deepListing = NULL;
			$this->queryFilter = NULL;
		}
	}


	/**
	 * namespace\someTablePresenter => some_table
	 * @return string table_name
	 */
	private function getTableByPresenterName()
	{
		$className = get_class($this);
		$offset = strrpos($className, "\\") + 1;
		$tableName = substr($className, $offset, -9);

		return \Drahak\Restful\Utils\Strings::toSnakeCase($tableName);
	}


	/**
	 * Standard read (GET) action
	 * @param int $id
	 */
	public function actionRead($id)
	{
		try {
			if ($id === NULL) {
				if (is_array($this->queryFilter))
					$this->filterTable();
				$this->resource = array();
				foreach ($this->table as $row) {
					if ($this->getParameter('outputAssoc')) {
						$dest = &$this->resource[$row->id];
					} else {
						$dest = &$this->resource[];
					}
					$dest = $row->toArray();
					if ($this->deepListing)
						$this->getDeepData($dest, $row, $this->deepListing);
				}
			}  else if ((int) $id > 0 && (int) $id == $id) {
				$row = $this->table->get($id);
				if ($row === FALSE)
					throw new \Exception ('No record for given ID.', 404);
				$this->resource = $row->toArray();
				if ($this->deepListing)
					$this->getDeepData($this->resource, $row, $this->deepListing);
			} else {
				throw new \Exception('Request URL does not follow convention'.
						' /item/id/relation/relationId.'.
						' Valid ID is positive non zero integer', 400);
			}
		} catch (\Exception $ex) {
			$this->sendErrorResource($ex);
		}
		// sendResource() call Nette\AbortException, so it has to be outisde try {} catch {} block
		$this->sendResource(IResource::JSON);
	}


	/**
	 * Filter database output
	 */
	protected function filterTable()
	{
		foreach ($this->queryFilter as $filter => $setting) {
			$filterParam = $this->getParameter($filter);
			if ($filterParam === NULL) {
				if (isset($setting['default']))
					$this->table->where($filter, $setting['default']);
			} else if (strcasecmp($filterParam, 'ALL')) {
				$this->table->where($filter, isset($setting[$filterParam]) ?
								$setting[$filterParam] : explode(',', $filterParam));
			}
		}
	}


	/**
	 * Appends referencing database table data to result set
	 * @param array $dest reference to data destination
	 * @param \Nette\Database\Table\ActiveRow $row
	 * @param array $map
	 */
	protected function getDeepData(array &$dest, \Nette\Database\Table\ActiveRow $row, array $map)
	{
		foreach ($map as $key => $val) {
			if (is_array($val)) {
				if (!is_int($dest[$key]))
					continue;
				$dest[$key] = $row->ref($key)->toArray();
				$this->getDeepData($dest[$key], $row->ref($key), $val);
			} else {
				$oneToMany = strpos($val, '.');
				if ($oneToMany) {
					$dest[substr($val, 0, $oneToMany)] = iterator_to_array($row->related($val), false);
				} else {
					$dest[$val] = $row->ref($val)->toArray();
				}
			}
		}
	}


	/**
	 * Standard create (POST) action
	 */
	public function actionCreate()
	{
		try {
			$row = $this->table->insert($this->inputData);
			$this->resource = $row->toArray();
		} catch (\Exception $ex) {
			$this->sendErrorResource($ex);
		}
		$this->sendResource(IResource::JSON);
	}


	/**
	 * Standard update (PUT) action
	 * @param int $id
	 */
	public function actionUpdate($id)
	{
		try {
			$id = empty($this->inputData['id']) ? (int) $id : $this->inputData['id'];
			unset($this->inputData['date_add']);
			$row = $this->table->get($id);
			$row->update($this->inputData);
			$this->resource = $row->toArray();
		} catch (\Exception $ex) {
			$this->sendErrorResource($ex);
		}
		$this->sendResource(IResource::JSON);
	}


	/**
	 * Standard delete (DELETE) action
	 * @param int $id
	 */
	public function actionDelete($id)
	{
		$this->resource->action = 'Delete';
		try {
			$id = (int) $id ?: $this->inputData['id'];
			$this->table->get($id)->delete();
			$this->resource->id = $id;
		} catch (\Exception $ex) {
			$this->sendErrorResource($ex);
		}
		$this->sendResource(IResource::JSON);
	}


	/**
	 * Parse input data for inserting to database
	 * @param bool $flatten flatten nested arrays
	 * @return type
	 */
	protected function getInputData($flatten = true)
	{
		$converter = new \Drahak\Restful\Converters\SnakeCaseConverter();
		$data = $converter->convert($this->input->getData());
		
		if ($flatten) {
			foreach ($data as $key => &$value) {
				if (is_array($value)) {
					if (!empty($value['id']))
						$value = (int) $value['id'];
					else
						unset($data[$key]);
				}
			}
		}

		return $data;
	}


	protected function normalizeDate(array &$input)
	{
		foreach ($input as $key => &$inpt)
			if ($timestamp = strtotime($inpt)) {
				$inpt = new Nette\Utils\DateTime();
				$inpt->setTimestamp($timestamp);
			}
	}


}
