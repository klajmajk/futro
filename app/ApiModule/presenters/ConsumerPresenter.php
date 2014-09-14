<?php

namespace App\ApiModule\Presenters;

use Nette,
	Drahak\Restful\IResource;

/**
 * CRUD resource presenter
 * @package ResourcesModule
 * @author Václav Novotný
 */
class ConsumerPresenter extends BasePresenter
{


	public function actionRead($id)
	{
		if (!$id) {
			$exception = new \Exception('List of consumers is not supported', 405);
			$this->sendErrorResource($exception);
		} else {
			$this->resource->action = 'Read';
			$this->resource = $this->table->get($id)->toArray();
			$this->sendResource(IResource::JSON);
		}
	}


}
