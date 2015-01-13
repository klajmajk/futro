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
	Nette\Utils\Strings;

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


	public function addField($type, $name, $label = NULL, $placeholder = NULL)
	{
		$this->formFields[$name] = new AngularFormField($type, $name, $label, $placeholder);
		return $this->formFields[$name];
	}


	public function render($formType = 'horizontal')
	{
		$template = $this->template;
		$template->setFile(__DIR__.'/angularform.latte');

		$template->form = $this->formObject;
		$template->fields = $this->formFields;
		$template->models = $this->formModels;

		$template->render();
	}


}

class AngularFormField
{

	public $element;
	public $type;
	public $attributes;
	public $validation;
	public $label;
	public $placeholder;
	
	public $cols;
	public $addons;


	public function __construct($type, $name, $label = NULL, $placeholder = NULL)
	{
		list($this->element, $this->type) = $this->isValidType($type);
		$this->name = $name;
		$this->label = $label ?: $name;
		$this->placeholder = $placeholder;
		$this->attributes = array();
		$this->validation = array();
	}


	private function isValidType($type)
	{
		$type = Strings::lower($type);
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


	public final function setAttribute($attribute, $value = NULL)
	{
		$this->attributes[$attribute] = $value;
		return $this;
	}


	public final function setValidation($problem, $message, $config = NULL)
	{
		$this->validation[$problem] = array(
			'message' => $message,
			'config' => $config
		);
		return $this;
	}
	
	public final function setCols($num)
	{
		$this->cols = (int) $num;
		return $this;
	}
	
	public final function setAddons($before, $after)
	{
		$this->addons = array($before, $after);
		return $this;
	}


}
