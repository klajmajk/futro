<?php

namespace App\Presenters;

use Nette,
	App\Model;

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
	}

}
