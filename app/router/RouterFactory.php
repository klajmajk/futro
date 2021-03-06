<?php

namespace App;

use Nette,
	Nette\Application\Routers\RouteList,
	Nette\Application\Routers\Route,
	Drahak\Restful\Application\Routes\CrudRoute;


/**
 * Router factory.
 */
class RouterFactory
{

	/**
	 * @return \Nette\Application\IRouter
	 */
	public static function createRouter()
	{
		$router = new RouteList();	
		$router[] = new CrudRoute('futro/<presenter>/[<id [0-9]+>/[<relation>[/<relationId [0-9]+>]]]', array(
		    'module' => 'Futro'
		));
		$router[] = new Route('<presenter>/<action>[/<id>]', 'Main:default');
		return $router;
	}

}
