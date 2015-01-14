<?php

namespace App\Presenters;

use Tracy;

/**
 * Description of PagePresenter
 *
 * @author novot_000
 */
class PartialsPresenter extends BasePresenter
{
	public function startup()
	{
		parent::startup();
		
		//Tracy\Debugger::$productionMode = true;
		$this->layout = FALSE;
	}
	

	protected function createComponentKegAddForm()
	{
		$form = new \App\Components\AngularForm('kegAdd.form', 'kegAdd.keg');
		
		$form->addField('number', 'quantity', 'Počet sudů')
				->setCols(2)
				->setAttribute('min', 1)
				->setAttribute('step', 1)
				->setValidation('required', 'Musíte zadat množství sudů, které chcete přidat.')
				->setValidation('number', 'Množství musí být zadané jako celé číslo.');

		$form->addField('select', 'volume', 'Kubatura', 'Objem litrů...')
				->setAttribute('bs-select')
				->setAttribute('ng-options', 'volume as volume|liters for volume in ::kegAdd.keg.volumes')
				->setValidation('required', 'Musíte zvolit objem přidávaných sudů.');
		
		$form->addField('select', 'brewery', 'Pivovar', 'Pivovar...')
				->setAttribute('bs-select')
				->setAttribute('ng-options', 'brewery.id as brewery.name for brewery in breweries')
				->setAttribute('ng-change', 'kegAdd.eventBrewerySelected()')
				->setValidation('required', 'Prosím, zvolte pivovar pro nové zásoby.')
				->setExtra($form->createAddNewModal('Přidat nový pivovar', 'modals/breweryadd'));
		
		$form->addField('select', 'beer', 'Pivo', 'Pivo...')
				->setAttribute('bs-select')
				->setAttribute('ng-options', 'beer.id as beer.name for beer in kegAdd.beers')
				->setAttribute('ng-change', 'kegAdd.eventBeerSelected()')
				->setValidation('required', 'Nezapomeňte zadat druh piva k naskladnění.')
				->setExtra($form->createAddNewModal('Přidat nové pivo', 'modals/beeradd'));;
		
		$form->addField('number', 'price', 'Cena')
				->setCols(4)
				->setAddons(NULL, 'Kč / sud')
				->setAttribute('min', 0)
				->setAttribute('step', 0.01)
				->setValidation('required', 'Prosím, zadejte cenu v Kč za 1 sud nových zásob.')
				->setValidation('number', 'Jako cenu, prosím, uvádějte pouze cifry.');

		return $form;
	}
	
	

}
