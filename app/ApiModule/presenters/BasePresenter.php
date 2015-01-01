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
class BasePresenter extends ResourcePresenter
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


	public function __construct(Database\Context $database)
	{
		parent::__construct();

		$this->db = $database;
		$tableName = $this->getTableByPresenterName();
		$this->table = $this->db->table($tableName);
	}
	
	
	public function startup()
	{
		try {
			$id = $this->getParameter('id');
			if ($id !== NULL && $this->isValidId($id) === FALSE)
				throw BadRequestException::methodNotSupported(
						'Url must follow convention /presenter/id/relation/relationId.'.
						' Valid ID is only positive, non zero integer.');
			
			$id = $this->isValidId($id);			
			$input = $this->input->getData();
			if (isset($input['id']) && $this->isValidId($input['id']) !== $id)
				throw BadRequestException::unprocessableEntity(
						array('ID in request body not match to ID in url'));
			
			if ($this->getAction() === 'create' && $id !== FALSE)
				$this->changeAction('update');

			parent::startup();

			if ($this->getAction() !== 'read')
				$this->inputData = $this->inputData ?: $this->getInputData();

			$relation = $this->getParameter('relation');			
			if ($relation !== NULL) {				
				$this->table = $this->db->table($relation)
						->where($this->table->getName(), $id);
				$this->deepListing = NULL;
				$this->queryFilter = NULL;
			}
		} catch (BadRequestException $ex) {
			$this->sendErrorResource($ex);
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

		return Restful\Utils\Strings::toSnakeCase($tableName);
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
			}  else {
				$row = $this->table->get($id);
				if ($row === FALSE)
					throw BadRequestException::notFound('No record for ID: '.$id);
				$this->resource = $row->toArray();
				if ($this->deepListing)
					$this->getDeepData($this->resource, $row, $this->deepListing);
			}
		} catch (BadRequestException $ex) {
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
			if (empty($this->inputData['date_add']))
				$this->inputData['date_add'] = new \Nette\Utils\DateTime();
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


	protected function normalizeDate(array &$input)
	{
		foreach ($input as &$value)
			if (strtotime($value))
				$value = new Nette\Utils\DateTime($value);
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
		
		foreach ($this->inputData as $key => &$value)
			if ($row && !$row->offsetExists($key)) {
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
		$options = array(
			'options' => array(
				'min_range' => 1
			)
		);
		
		return filter_var($id, FILTER_VALIDATE_INT, $options);
	}


}
