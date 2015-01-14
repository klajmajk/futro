<?php

/*
 * Created for fun by Junior Kumpan DUO
 * Upper Blackbird's Society
 */

/**
 * Description of AngularForm
 *
 * @author novot_000
 */

namespace App\Components;

use Nette\Application\UI\Control,
	Nette\Utils;

class AngularForm extends Control
{

	private $formObject;
	private $formModels;
	private $formFields;


	public function __construct($formObject, $formModels)
	{
		$this->formObject = $formObject;
		$this->formModels = $formModels;

		$this->formFields = array();

		parent::__construct(NULL, NULL);
	}


	public function addField($type, $name, $label = NULL, $placeholder = NULL, array $attributes = array())
	{
		$field = new AngularFormField($type, $name, $label, $placeholder, $attributes);
		$field->setAttribute('ng-model', $this->formModels.'.'.$name);
		$field->element->class[] = 'form-control';

		return $this->formFields[$name] = $field;
	}


	public function renderHorizontal()
	{
		$this->render('horizontal');
	}


	public function renderInline()
	{
		$this->render('inline');
	}


	public function render($formType = NULL)
	{
		$template = $this->template;
		$template->setFile(__DIR__.'/form.latte');

		$template->type = $formType;
		$template->form = $this->formObject;
		$template->fields = $this->formFields;
		$template->models = $this->formModels;

		$template->render();
	}


	public function createAddNewModal($title, $modalTemplate)
	{
		$el = Utils\Html::el('span', array(
					'bs-modal' => TRUE,
					'data-template' => $modalTemplate,
					'class' => array('anchor-like')
		));
		$el->setHtml('&nbsp;&nbsp;');
		$el->create('i', array('class' => array('glyphicon', 'glyphicon-plus')));
		$el->add(' '.$title);

		return $el;
	}


}

class AngularFormField
{

	public $element;
	public $validation;
	public $label;
	public $placeholder;
	public $cols;
	public $addons;
	public $extra;


	public function __construct($type, $name, $label = NULL, $placeholder = NULL, array $attributes = array())
	{
		list($element, $type) = $this->isValidType($type);
		$this->element = Utils\Html::el($element, $attributes);
		$this->element->name = $this->element->id = $name;
		$this->label = $label ? : $name;
		if ($type)
			$this->element->type = $type;
		if ($placeholder)
			$this->element->placeholder = $placeholder;

		$this->validation = array();
		$this->extra = array();
	}


	private function isValidType($type)
	{
		$type = Utils\Strings::lower($type);
		switch ($type) {
			case 'checkbox':
			case 'date':
			case 'datetime-local':
			case 'email':
			case 'month':
			case 'number':
			case 'radio':
			case 'text':
			case 'time':
			case 'url':
			case 'week':
				$element = 'input';
				break;
			case 'select':
			case 'textarea':
				$element = $type;
				$type = NULL;
				break;
			default:
				throw new \Nette\InvalidArgumentException('Unsupported field type "'.
				$type.'" in AngularForm->addField()');
		}

		return array($element, $type);
	}


	public final function setAttribute($attribute, $value = TRUE)
	{
		$this->element->$attribute = $value;

		return $this;
	}


	public final function setValidation($problem, $message, $config = TRUE)
	{
		if (!isset($this->element->type) || strcasecmp($this->element->type, $problem) !== 0)
			$this->element->$problem = $config;

		$this->validation[$problem] = $message;

		return $this;
	}


	public final function setCols($num)
	{
		$this->cols = (int) $num;

		return $this;
	}


	public final function setAddons($before, $after = NULL)
	{
		$el = Utils\Html::el('div', array(
					'class' => array('input-group-addon')
		));
		
		if ($before !== NULL) {
			$container = clone $el;
			$container->setHtml($before);
			$before = $container;
		}
		
		if ($after !== NULL) {
			$el->setHtml($after);
			$after = $el;
		}

		$this->addons = array($before, $after);

		return $this;
	}


	public final function setExtra(Utils\Html $html)
	{
		$this->extra[] = $html;

		return $this;
	}


}
