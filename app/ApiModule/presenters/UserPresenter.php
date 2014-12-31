<?php

namespace App\ApiModule\Presenters;

use Nette,
	Drahak\Restful\IResource;

/**
 * CRUD resource presenter
 * @package ResourcesModule
 * @author Václav Novotný
 */
class UserPresenter extends BasePresenter
{

	public function actionRead($id)
	{
		if (!(int) $id)
			$this->table = $this->table
					->select('user.*, NULL AS password, MAX(:consumption.date_add) AS last_soup')
					->group('user.name');

		parent::actionRead($id);
	}
	
	public function actionUpdate($id)
	{
		unset($this->inputData['password'],
				$this->inputData['balance'],
				$this->inputData['role'],
				$this->inputData['last_soup']);
		parent::actionUpdate($id);
	}

	public function actionReadCredit($id)
	{
		$this->table = $this->table->get($id)->related('credit.user');
		
		parent::actionRead(null);
	}
}
