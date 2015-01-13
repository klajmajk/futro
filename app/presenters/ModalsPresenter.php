<?php

namespace App\Presenters;

use Tracy;

/**
 * Description of PagePresenter
 *
 * @author novot_000
 */
class ModalsPresenter extends BasePresenter
{
	public function startup()
	{
		parent::startup();
		
		Tracy\Debugger::$productionMode = true;
	}

	protected function createComponentBeerAddForm()
	{
		$form = new \App\Components\AngularForm('beerAdd.form', 'beerAdd.beer');
		
		$form->addField('text', 'name', 'Název')
				->setValidation('required', 'Není zadaný název piva.');
		
		return $form;
	}


}
