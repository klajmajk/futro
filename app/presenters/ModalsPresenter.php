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
		
		
		$form->addField('select', 'brewery', 'Pivovar', 'Zvolte pivovar...')
				->setAttribute('bs-select')
				->setAttribute('ng-options', 'brewery.id as brewery.name for brewery in breweries')
				->setValidation('required', 'Zadejte pivovar pro nové pivo');
		
		$form->addField('text', 'name', 'Název')
				->setValidation('required', 'Není zadaný název piva.');
		
		return $form;
	}


}
