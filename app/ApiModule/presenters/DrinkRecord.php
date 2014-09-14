<?php

namespace App\ApiModule\Presenters;

use Nette,
	Drahak\Restful\IResource;

/**
 * CRUD resource presenter
 * @package ResourcesModule
 * @author Václav Novotný
 */
class DrinkRecordPresenter extends BasePresenter
{


	public function actionCreate()
	{
		$this->resource->action = 'Create';
		$input = $this->getInputData();
		$this->table->insert($input);
		$this->resource->message = 'good';
	}

}
