<?php

namespace App\Presenters;

use Nette,
	App\Model;


/**
 * Homepage presenter.
 */
class MainPresenter extends BasePresenter
{
	
	public function startup()
	{
		parent::startup();
		
		if (!$this->getUser()->isLoggedIn())
			$this->redirect('Sign:in', array('backlink' => $this->storeRequest()));
	}

	private $database;
	
	public function __construct (Nette\Database\Context $database)
	{
		$this->database = $database;
		parent::__construct();
		}

	public function renderDefault()
	{
		$this->template->isManager = $this->getUser()->isInRole('beer_manager');
	}
}
