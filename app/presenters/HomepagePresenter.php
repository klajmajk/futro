<?php

namespace App\Presenters;

use Nette,
	App\Model;


/**
 * Homepage presenter.
 */
class HomepagePresenter extends BasePresenter
{

	private $database;
	
	public function __construct (Nette\Database\Context $database)
	{
		$this->database = $database;
		parent::__construct();
		}

	public function renderDefault()
	{
		$this->template->kumpani = $this->database->table('consumer')
			->order('name');
		$this->template->piva = $this->database->table('drink_record');
		$this->template->sudy = $this->database->table('barrel');
	}
}
