<?php

namespace App\FutroModule\Presenters;


/**
 * CRUD resource presenter
 * @package ResourcesModule
 * @author Václav Novotný
 */
class BreweryPresenter extends BasePresenter
{

	public function actionRead($id)
	{
		if ($id === NULL)
			$this->table->order('name ASC');
		parent::actionRead($id);
	}

	/**
	 * Action read (GET) with relation to Brewery:Beer[:idBeer]
	 * @param int $id
	 * @param int $relationId
	 */
	public function actionReadBeer($id, $relationId)
	{
		$this->deepListing = array('brewery');
		
		parent::actionRead($relationId);
	}


}
