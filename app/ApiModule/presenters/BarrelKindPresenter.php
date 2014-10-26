<?php

namespace App\ApiModule\Presenters;

use Nette,
    Drahak\Restful\IResource;

/**
 * CRUD resource presenter
 * @package ResourcesModule
 * @author Václav Novotný
 */
class BarrelKindPresenter extends BasePresenter
{
	  public function actionRead()
	  {
            $this->resource->action = 'Read';
            $this->resource = iterator_to_array($this->table, false);
            $this->sendResource(IResource::JSON);
	  }
	
}
