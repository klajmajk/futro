<?php
namespace Drahak\Restful\Http;

use Nette\Http\RequestFactory;
use Nette\Http\Request;
use Nette\Http\IRequest;

/**
 * Api request factory
 * @author Drahomír Hanák
 */
class ApiRequestFactory 
{

	const OVERRIDE_HEADER = 'X-HTTP-Method-Override';
	const OVERRIDE_PARAM = '__method';

	/**
	 * @var RequestFactory
	 */
	private $factory;

	/**
	 * @param RequestFactory $factory 
	 */
	public function __construct(RequestFactory $factory)
	{
		$this->factory = $factory;
	}

	/**
	 * Create API HTTP request 
	 * @return Nette\Http\IRequest 
	 */
	public function createHttpRequest()
	{
		return $this->factory->createHttpRequest();
	}

}