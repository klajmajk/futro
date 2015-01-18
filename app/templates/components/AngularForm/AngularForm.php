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
	
	public $init;
	public $class;


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
		$field->control->class[] = 'form-control';

		return $this->formFields[$name] = $field;
	}
	
	public function addButton($type, $text, $ngClick, $context = 'default')
	{
		$button = Utils\Html::el('button', array(
			'type' => $type,
			'class' => array('btn', 'btn-'.$context),
			'ng-click' => $ngClick
			));
		$button->setText($text);
		
		return $this->formFields[$type] = $button;
	}
	

	public function renderHorizontal($gridType = 'sm', $labelCols = 4)
	{
		$grid = $this->template->grid = 'col-'.$gridType.'-';
		foreach ($this->formFields as $field)
			if ($field instanceof AngularFormField) {
				$field->label->class = array($grid.$labelCols, 'control-label');
				$field->cols = $field->cols ? : 12 - $labelCols;
			}
		$this->render('horizontal');
	}


	public function renderInline()
	{
		foreach ($this->formFields as $field)
			if ($field instanceof AngularFormField) {
				$field->label->class = array('sr-only');
				$field->control->placeholder = $field->label->getText();
			}

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
		$template->init = $this->init;
		$template->class= $this->class;

		$template->render();
	}


	public function createAddNewModal($title, $modalTemplate, $modalObject = TRUE)
	{
		$el = Utils\Html::el('span', array(
					'bs-modal' => $modalObject,
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

	public $control;
	public $validation;
	public $label;
	public $cols;
	public $addons;
	public $extra;


	public function __construct($type, $name, $label = NULL, $placeholder = NULL, array $attributes = array())
	{
		list($element, $type) = $this->isValidType($type);
		$this->control = Utils\Html::el($element, $attributes + array(
			'name' => $name,
			'type' => $type,
			'id' => 'id_'.$name,
			'placeholder' => $placeholder
		));
		$this->label = Utils\Html::el('label', array('for' => 'id_'.$name))
				->setText($label ? : $name);
		
		$this->validation = array();
		$this->extra = array();
	}
	
	public function getName()
	{
		return $this->control->getName();
	}
	
	public function getLabel()
	{
		return $this->label;
	}

	public function getControl($tabindex = NULL)
	{
		$control = $this->control;
		$control->tabindex = $tabindex;
		
		if ($this->addons) {
			$group = Utils\Html::el('span', array('class' => array('input-group')));
			if (!empty($this->addons[0]))
				$group->add($this->addons[0]);
			$group->add($control);
			if (!empty($this->addons[1]))
				$group->add($this->addons[1]);
			$control = $group;
		}
				
		return $control;
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
		$this->control->$attribute = $value;

		return $this;
	}


	public final function setValidation($problem, $message, $config = TRUE)
	{
		if (!isset($this->control->type) || strcasecmp($this->control->type, $problem) !== 0)
			$this->control->$problem = $config;

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
