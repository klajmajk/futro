<?php

namespace App\ApiModule\Presenters;

use Nette,
	Nette\Database,
	Nette\Database\Table\ActiveRow,
	Drahak\Restful,
	Drahak\Restful\Converters,
	Drahak\Restful\IResource,
	Drahak\Restful\Application\UI\ResourcePresenter,
	Drahak\Restful\Application\BadRequestException;

/**
 * CRUD resource presenter
 * @package ResourcesModule
 * @author Václav Novotný
 */
class BasePresenter extends ResourcePresenter // SecuredResourcePresenter
{

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
	
	/** @var array contains metadata that are appended to response */
	protected $metadata = array();

	public function __construct(Database\Context $database)
	{
		parent::__construct();

		$this->db = $database;
	}


	public function startup()
	{
		try {
			$id = $this->getParameter('id');
			if ($id !== NULL && ($id = $this->isValidId($id)) === FALSE)
					throw BadRequestException::methodNotSupported(
							'Url must follow convention /presenter/id/relation/relationId.'.
							' Valid ID is only positive, non zero integer.');
			
			$action = $this->getAction();
			if ($action === 'create' && $id)
					$this->changeAction('update');

			parent::startup();
			
			if ($action !== 'read')
				$this->inputData = $this->inputData ? : $this->getInputData();

			if (($relation = $this->getParameter('relation')) !== NULL) {
				$this->table = $this->db->table($relation)->where($this->getTableName(), $id);
				$this->deepListing = $this->queryFilter = NULL;
			} else {
				$this->table = $this->db->table($this->getTableName());
			}
		} catch (BadRequestException $ex) {
			$this->sendErrorResource($ex);
		}
	}
	
	/**
	 * Returns table name by presenter i.e.: BaseTestPresenter => base_test
	 * @return string
	 */
	public function getTableName()
	{		
		$name = parent::getName();
		if (($pos = strpos($name, ':')))
				$name = substr($name, $pos + 1);
		return Restful\Utils\Strings::toSnakeCase($name);
	}


	/**
	 * Standard read (GET) action
	 * @param int $id
	 */
	public function actionRead($id)
	{
		try {
			$this->resource = $id === NULL ? 
					$this->getCollection() : $this->getItem($id);
		} catch (BadRequestException $ex) {
			$this->sendErrorResource($ex);
		}
		// sendResource() call Nette\AbortException, so it has to be outisde try {} catch {} block
		$this->sendResource(IResource::JSON);
	}


	/**
	 * Returns single database record as associative array
	 * @param int $id
	 * @return array item
	 * @throws Drahak\Restful\Application\BadRequestException
	 */
	protected function getItem($id)
	{
		$row = $this->table->get($id);
		if ($row === FALSE)
			throw BadRequestException::notFound('No record for ID: '.$id);
		$item = $row->toArray();
		if ($this->deepListing)
			$this->getDeepData($item, $row, $this->deepListing);
		
		if (count($this->metadata) > 0)
			$item['metadata'] = $this->metadata;

		return $item;
	}

	/**
	 * Return all matched database records as simple array
	 * @return array collection
	 */
	protected function getCollection()
	{
		$this->filterTable();
		$this->paginate();

		$collection = array();
		foreach ($this->table as $row) {
			$item = &$collection[];
			$item = $row->toArray();
			if ($this->deepListing)
				$this->getDeepData($item, $row, $this->deepListing);
		}

		if (count($this->metadata) > 0 && count($collection) > 0)
			$collection[0]['metadata'] = $this->metadata;

		return $collection;
	}

	/**
	 * Set limit on database and adds total count to metadata
	 */
	protected function paginate()
	{
		$limit = $this->getParameter('limit');
		if ($limit !== NULL) {
			$offset = 0;
			if (strpos($limit, ','))
				list($limit, $offset) = explode(',', $limit);

			$this->metadata['count'] = $this->table->count();
			$this->table->limit($limit, $offset);
		}
	}


	/**
	 * Filter database output according to $this->queryFilter
	 */
	protected function filterTable()
	{
		if (is_array($this->queryFilter)) {
			foreach ($this->queryFilter as $filter => $setting) {
				$filterParam = $this->getParameter($filter);
				if ($filterParam === NULL) {
					if (isset($setting['default']))
						$this->table->where($filter, $setting['default']);
				} else if (strcasecmp($filterParam, 'ALL') !== 0) {
					$this->table->where($filter, isset($setting[$filterParam]) ?
									$setting[$filterParam] : explode(',', $filterParam));
				}
			}
		}
	}


	/**
	 * Appends referencing database table data to result set according to $this->deepListing
	 * @param array $dest reference to data destination
	 * @param \Nette\Database\Table\ActiveRow $row
	 * @param array $map
	 */
	protected function getDeepData(array &$dest, ActiveRow $row, array $map)
	{
		foreach ($map as $key => $val) {
			if (is_array($val)) {
				if ($this->isValidId($dest[$key]) === FALSE)
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
			unset($this->inputData['id']);
			$this->inputData['date_add'] = new Nette\Utils\DateTime(
					empty($this->inputData['date_add']) ? NULL : $this->inputData['date_add']);
			$this->harmonizeInputData();
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
			unset($this->inputData['date_add'], $this->inputData['id']);
			$row = $this->table->get($id);
			$this->harmonizeInputData($row);
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
			$this->table->get($id)->delete();
			$this->resource->id = $id;
		} catch (\Exception $ex) {
			$this->sendErrorResource($ex);
		}
		$this->sendResource(IResource::JSON);
	}


	/**
	 * Parse input data for inserting to database
	 * @return type
	 */
	protected function getInputData()
	{
		$converter = new Converters\SnakeCaseConverter();
		$data = $this->getInput()->getData();

		return $converter->convert($data);
	}

	/**
	 * Prepare $this->inputData for inserting into DB, cleans data
	 * according to existing columns in table and flatten nested arrays
	 * @param \Nette\Database\Table\ActiveRow $row
	 */
	protected function harmonizeInputData($row = NULL)
	{
		if (!$row) {
			$res = $this->table->limit(1)->fetchAll();
			$row = reset($res);
		}
		$array = $row->toArray();

		foreach ($this->inputData as $key => &$value)
			if ($row && !array_key_exists($key, $array)) {
				unset($this->inputData[$key]);
			} else if (is_array($value)) {
				if ($this->isValidId($value['id'])) {
					$value = (int) $value['id'];
				} else {
					unset($this->inputData[$key]);
				}
			}
	}


	/**
	 * Returns valided and typecasted ID or FALSE if not valid
	 * @param mixed $id
	 * @return mixed
	 */
	protected final function isValidId($id)
	{
		$options = array('options' => array('min_range' => 1));

		return filter_var($id, FILTER_VALIDATE_INT, $options);
	}


}
