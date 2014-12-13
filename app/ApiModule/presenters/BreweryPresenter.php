<?php

namespace App\ApiModule\Presenters;

use Nette,
	Drahak\Restful\IResource;

/**
 * CRUD resource presenter
 * @package ResourcesModule
 * @author Václav Novotný
 */
class BreweryPresenter extends BasePresenter
{

	/**
	 * Action read (GET) with relation to Brewery:Beer[:idBeer]
	 * @param int $id
	 * @param int $relationId
	 */
	public function actionReadBeer($id, $relationId)
	{
		parent::actionRead($relationId);
	}


}
