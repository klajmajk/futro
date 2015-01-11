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
		
		Tracy\Debugger::$productionMode = true;
		$this->layout = FALSE;
	}

}
