<?php

namespace App\Presenters;

use Nette,
	App\Model;


/**
 * Homepage presenter.
 */
class FutraPresenter extends BasePresenter
{
	
	public function __construct()
	{
		parent::__construct();
		$this->layout = FALSE;
	}
}
