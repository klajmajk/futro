<?php

namespace App\ApiModule\Presenters;

use Nette,
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
		$tappedKegs = array_keys($this->db->table('keg')->where('state', KegPresenter::$states[1])->fetchAll());
		$users = array_keys($this->db->table('user')->fetchAll());
		
		$this->input->field('volume')->addRule(IValidator::INTEGER, 'Volume must be integer representing mililiters.');
		$this->input->field('keg')->addRule(IValidator::IS_IN, 'Given keg is not tapped or does not exist.', $tappedKegs);
		$this->input->field('user')->addRule(IValidator::IS_IN, 'Given user not exists.', $users);
	}

}
