<?php

namespace App\Presenters;

use Tracy\Debugger;

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

		Debugger::enable(Debugger::PRODUCTION);
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


	protected function createComponentBreweryAddForm()
	{
		$form = new \App\Components\AngularForm('breweryAdd.form', 'breweryAdd.brewery');

		$form->addField('text', 'name', 'Název pivovaru')
				->setValidation('required', 'Není zadaný název pivovaru.');

		return $form;
	}


	protected function createComponentCreditAddForm()
	{
		$object = 'creditAdd.';
		$form = new \App\Components\AngularForm($object.'form', $object.'credit');
		$form->class = 'wide';
		$form->init = $object.'init(user)';

		$form->addField('number', 'amount', 'Částka')
				->setAttribute('min', 1)
				->setAttribute('step', 0.01)
				->setValidation('required', 'Musíte uvést částku')
				->setValidation('number', 'Zadejte číslo větší než nula')
				->setAddons(NULL, 'Kč');

		$form->addField('text', 'note', 'Poznámka');
		
		$form->addButton('save', 'Zadat', $object.'save() && $hide()', 'success');

		return $form;
	}


}
