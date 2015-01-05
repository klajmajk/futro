<?php

namespace App\ApiModule\Presenters;

use Nette,
	Drahak\Restful\Application\BadRequestException;

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
	
	public function actionRead($id)
	{
		$this->table = $this->table->select('tap.*, SUM(keg:consumption.volume) AS poured');
		
		parent::actionRead($id);
	}

	public function actionCreate()
	{
		$e = BadRequestException::methodNotSupported('Tap cannot be created');
		$this->sendErrorResource($e);
	}


	public function actionUpdate($id)
	{
		$e = BadRequestException::methodNotSupported('Tap cannot be modified');
		$this->sendErrorResource($e);
	}


	public function actionDelete($id)
	{
		$e = BadRequestException::methodNotSupported('Tap cannot be deleted');
		$this->sendErrorResource($e);
	}


}
