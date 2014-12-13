<?php

namespace App;

use Nette,
	Nette\Application\Routers\RouteList,
	Nette\Application\Routers\Route,
	Nette\Application\Routers\SimpleRouter,
	Drahak\Restful\Application\Routes\CrudRoute;


/**
 * Router factory.
 */
class RouterFactory
{

	/**
	 * @return \Nette\Application\IRouter
	 */
	public function createRouter()
	{
		$router = new RouteList();	
		$router[] = new CrudRoute('futro/<presenter>/[<id>/[<relation>[/<relationId>]]]', array(
		    'module' => 'Api'
		));
		$router[] = new Route('<presenter>/<action>[/<id>]', 'Main:default');
		return $router;
	}

}
