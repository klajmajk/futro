<?php

namespace App\Presenters;

use Tracy\Debugger,
	Nette\Utils\Html;

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

		$this->layout = FALSE;
		
		Debugger::enable(Debugger::PRODUCTION);
	}
	

	protected function createComponentKegAddForm()
	{
		$form = new \App\Components\AngularForm('kegAdd.form', 'kegAdd.keg');
		$extra = Html::el('span');
		$extra->class = ('anchor-like');
		$extra->setHtml('&nbsp;&nbsp;')
				->create('i', array('class' => array('glyphicon', 'glyphicon-plus')));

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

		$addNew = clone $extra;
		$addNew->add(' Přidat nový pivovar')
				->addAttributes(array('ng-click' => 'breweryAdd.show()'));
		$form->addField('select', 'brewery', 'Pivovar', 'Pivovar...')
				->setAttribute('bs-select')
				->setAttribute('ng-options', 'brewery.id as brewery.name for brewery in breweries')
				->setAttribute('ng-change', 'kegAdd.eventBrewerySelected()')
				->setValidation('required', 'Prosím, zvolte pivovar pro nové zásoby.')
				->setExtra($addNew);

		$form->addField('select', 'beer', 'Pivo', 'Pivo...')
				->setAttribute('bs-select')
				->setAttribute('ng-options', 'beer.id as beer.name for beer in kegAdd.beers')
				->setAttribute('ng-change', 'kegAdd.eventBeerSelected()')
				->setValidation('required', 'Nezapomeňte zadat druh piva k naskladnění.')
				->setExtra($form->createAddNewModal('Přidat nové pivo', 'modals/beeradd'));

		$form->addField('number', 'price', 'Cena')
				->setCols(4)
				->setAddons(NULL, 'Kč / sud')
				->setAttribute('min', 0)
				->setAttribute('step', 0.01)
				->setValidation('required', 'Prosím, zadejte cenu v Kč za 1 sud nových zásob.')
				->setValidation('number', 'Jako cenu, prosím, uvádějte pouze cifry.');

		return $form;
	}
	
	protected function createComponentChartControlForm()
	{
		$object = 'chartControl.';
		$form = new \App\Components\AngularForm($object.'form', $object.'chart');
		
		$form->addField('select', 'data', 'Zobrazit', 'údaje...')
				->setAttribute('bs-select')
				->setAttribute('ng-options', 'item.value as item.label for item in chartControl.data');
		
		$form->addField('select', 'series', 'podle', 'srovnání...')
				->setAttribute('bs-select')
				->setAttribute('ng-options', 'item.value as item.label for item in chartControl.series');
		
		$form->addField('text', 'dateBegin', 'od', 'nevidím')
				->setAttribute('bs-datepicker')
				->setAttribute('size', 6);
		
		$form->addField('text', 'dateEnd', 'do', 'nevidím')
				->setAttribute('bs-datepicker')
				->setAttribute('size', 6);
		
		$form->addButton('button', 'Vykresli', $object.'load()', 'success');
		
		return $form;
	}

}
