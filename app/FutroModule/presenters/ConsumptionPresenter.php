<?php

namespace App\FutroModule\Presenters;

use Nette,
	Drahak\Restful\IResource,
	Drahak\Restful\Validation\IValidator;

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
		if (array_values($this->inputData) !== $this->inputData)
			parent::actionCreate();

		// this code cannot be reached if validateCreate is used
		$data = $this->inputData;
		$i = count($data);
		try {
			while ($i--) {
				$this->inputData = $data[$i];
				unset($this->inputData['id']);
				$this->inputData['date_add'] = new Nette\Utils\DateTime(
						empty($this->inputData['date_add']) ? NULL : $this->inputData['date_add']);
				$this->harmonizeInputData(isset($row) ? $row : NULL);
				$row = $this->table->insert($this->inputData);
			}
			$this->resource = $row->toArray();
		} catch (\Exception $ex) {
			$this->sendErrorResource($ex);
		}
		$this->sendResource(IResource::JSON);
	}
	
}
