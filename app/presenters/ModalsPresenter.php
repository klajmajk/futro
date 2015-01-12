<?php

namespace App\Presenters;

use Tracy;

/**
 * Description of PagePresenter
 *
 * @author novot_000
 */
class ModalsPresenter extends BasePresenter
{
	public function startup()
	{
		parent::startup();
		
		Tracy\Debugger::$productionMode = true;
	}

}
