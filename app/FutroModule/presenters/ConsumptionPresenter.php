<?php

namespace App\FutroModule\Presenters;

use Nette,
	Drahak\Restful\IResource,
	Drahak\Restful\Validation\IValidator,
	Nette\Database\UniqueConstraintViolationException;

/**
 * CRUD resource presenter
 * @package ResourcesModule
 * @author Václav Novotný
 */
class ConsumptionPresenter extends BasePresenter
{

	public function validateCreate()
	{

		$users = array_keys($this->db->table('user')->fetchAll());

		$this->input->field('volume')->addRule(IValidator::INTEGER, 'Volume must be integer representing mililiters.');
		$this->input->field('user')->addRule(IValidator::IS_IN, 'Given user not exists.', $users);
	}

	public function actionCreate()
	{
		$store = function($data, $row = NULL) {
			try {
				unset($data['id']);
				if (!isset($data['date_add']))
					$data['date_add'] = NULL;
				$this->encapsulateInDateTime($data['date_add']);
				$this->harmonizeInputData($row);
				return $this->table->insert($data);
			} catch (UniqueConstraintViolationException $ex) {
				$record = $this->table
						->where('date_add', $data['date_add'])
						->where('keg', $data['keg'])
						->limit(1)
						->fetchAll();
				return reset($record);
			} catch (\Exception $ex) {
				$this->sendErrorResource($ex);
			}
		};
		
		if (array_values($this->inputData) !== $this->inputData) { // is assoc_array == not multiple records per single request
			$row = $store($this->inputData);
			$this->resource = $row->toArray();
		} else {
			$row = NULL;
			$i = count($this->inputData);
			while ($i--) {
				$row = $store($this->inputData[$i], $row);
				if (!$i)
					$this->resource = $row->toArray();
			}
		}
		
		$this->sendResource(IResource::JSON);
	}
	
}
