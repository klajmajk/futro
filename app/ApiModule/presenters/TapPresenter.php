<?php

namespace App\ApiModule\Presenters;

use Nette,
	Drahak\Restful\IResource;

/**
 * CRUD resource presenter
 * @package ResourcesModule
 * @author Václav Novotný
 */
class TapPresenter extends BasePresenter
{

	public function __construct(Nette\Database\Context $database)
	{
		parent::__construct($database);

		$this->deepListing = array('keg' => array('beer' => array('brewery')));
	}

	public function actionCreate()
	{
		$e = new \Exception('Tap cannot be created', 403);
		$this->sendErrorResource($e);
	}


	public function actionUpdate($id)
	{
		$e = new \Exception('Tap cannot be modified', 403);
		$this->sendErrorResource($e);
	}


	public function actionDelete($id)
	{
		$e = new \Exception('Tap cannot be deleted', 403);
		$this->sendErrorResource($e);
	}


}
