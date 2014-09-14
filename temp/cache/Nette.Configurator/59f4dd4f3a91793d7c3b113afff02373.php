<?php
// source: C:\wamp\www\futra\app/config/config.neon 
// source: C:\wamp\www\futra\app/config/config.local.neon 

/**
 * @property Nette\Application\Application $application
 * @property Nette\Caching\Storages\FileStorage $cacheStorage
 * @property Nette\DI\Container $container
 * @property Nette\Http\Request $httpRequest
 * @property Drahak\Restful\Http\ResponseProxy $httpResponse
 * @property Nette\Bridges\Framework\NetteAccessor $nette
 * @property Nette\Application\IRouter $router
 * @property Nette\Http\Session $session
 * @property Nette\Security\User $user
 */
class SystemContainer extends Nette\DI\Container
{

	protected $meta = array(
		'types' => array(
			'nette\\object' => array(
				'nette',
				'nette.cacheJournal',
				'cacheStorage',
				'nette.cache',
				'nette.httpRequestFactory',
				'httpRequest',
				'httpResponse',
				'nette.httpContext',
				'session',
				'nette.userStorage',
				'user',
				'application',
				'nette.presenterFactory',
				'nette.mailer',
				'nette.templateFactory',
				'nette.database.default',
				'nette.database.default.context',
				'restful.responseFactory',
				'restful.resourceFactory',
				'restful.methodOptions',
				'restful.xmlMapper',
				'restful.jsonMapper',
				'restful.queryMapper',
				'restful.dataUrlMapper',
				'restful.nullMapper',
				'restful.mapperContext',
				'restful.inputFactory',
				'restful.httpResponseFactory',
				'restful.requestFilter',
				'restful.methodHandler',
				'restful.validator',
				'restful.validationScopeFactory',
				'restful.validationScope',
				'restful.objectConverter',
				'restful.dateTimeConverter',
				'restful.camelCaseConverter',
				'restful.pascalCaseConverter',
				'restful.snakeCaseConverter',
				'restful.resourceConverter',
				'restful.security.hashCalculator',
				'restful.security.hashAuthenticator',
				'restful.security.timeoutAuthenticator',
				'restful.security.nullAuthentication',
				'restful.security.securedAuthentication',
				'restful.security.basicAuthentication',
				'restful.security.authentication',
				'restful.routeAnnotation',
				'restful.routeListFactory',
				'restful.cachedRouteListFactory',
				'restful.panel',
				'container',
			),
			'nette\\bridges\\framework\\netteaccessor' => array('nette'),
			'nette\\caching\\storages\\ijournal' => array('nette.cacheJournal'),
			'nette\\caching\\storages\\filejournal' => array('nette.cacheJournal'),
			'nette\\caching\\istorage' => array('cacheStorage'),
			'nette\\caching\\storages\\filestorage' => array('cacheStorage'),
			'arrayaccess' => array('nette.cache'),
			'nette\\caching\\cache' => array('nette.cache'),
			'nette\\http\\requestfactory' => array('nette.httpRequestFactory'),
			'nette\\http\\irequest' => array('httpRequest'),
			'nette\\http\\request' => array('httpRequest'),
			'nette\\http\\iresponse' => array('httpResponse'),
			'drahak\\restful\\http\\responseproxy' => array('httpResponse'),
			'nette\\http\\context' => array('nette.httpContext'),
			'nette\\http\\session' => array('session'),
			'nette\\security\\iuserstorage' => array('nette.userStorage'),
			'nette\\http\\userstorage' => array('nette.userStorage'),
			'nette\\security\\user' => array('user'),
			'nette\\application\\application' => array('application'),
			'nette\\application\\ipresenterfactory' => array('nette.presenterFactory'),
			'nette\\application\\presenterfactory' => array('nette.presenterFactory'),
			'nette\\application\\irouter' => array('router'),
			'nette\\mail\\imailer' => array('nette.mailer'),
			'nette\\mail\\sendmailmailer' => array('nette.mailer'),
			'nette\\bridges\\applicationlatte\\ilattefactory' => array('nette.latteFactory'),
			'nette\\application\\ui\\itemplatefactory' => array('nette.templateFactory'),
			'nette\\bridges\\applicationlatte\\templatefactory' => array('nette.templateFactory'),
			'nette\\database\\connection' => array('nette.database.default'),
			'nette\\database\\context' => array('nette.database.default.context'),
			'drahak\\restful\\application\\iresponsefactory' => array('restful.responseFactory'),
			'drahak\\restful\\application\\responsefactory' => array('restful.responseFactory'),
			'drahak\\restful\\iresourcefactory' => array('restful.resourceFactory'),
			'drahak\\restful\\resourcefactory' => array('restful.resourceFactory'),
			'drahak\\restful\\iresource' => array('restful.resource'),
			'drahak\\restful\\application\\methodoptions' => array('restful.methodOptions'),
			'drahak\\restful\\mapping\\imapper' => array(
				'restful.xmlMapper',
				'restful.jsonMapper',
				'restful.queryMapper',
				'restful.dataUrlMapper',
				'restful.nullMapper',
			),
			'drahak\\restful\\mapping\\xmlmapper' => array('restful.xmlMapper'),
			'drahak\\restful\\mapping\\jsonmapper' => array('restful.jsonMapper'),
			'drahak\\restful\\mapping\\querymapper' => array('restful.queryMapper'),
			'drahak\\restful\\mapping\\dataurlmapper' => array('restful.dataUrlMapper'),
			'drahak\\restful\\mapping\\nullmapper' => array('restful.nullMapper'),
			'drahak\\restful\\mapping\\mappercontext' => array('restful.mapperContext'),
			'drahak\\restful\\http\\inputfactory' => array('restful.inputFactory'),
			'drahak\\restful\\http\\responsefactory' => array('restful.httpResponseFactory'),
			'drahak\\restful\\http\\apirequestfactory' => array('restful.httpRequestFactory'),
			'drahak\\restful\\utils\\requestfilter' => array('restful.requestFilter'),
			'drahak\\restful\\application\\events\\methodhandler' => array('restful.methodHandler'),
			'drahak\\restful\\validation\\ivalidator' => array('restful.validator'),
			'drahak\\restful\\validation\\validator' => array('restful.validator'),
			'drahak\\restful\\validation\\ivalidationscopefactory' => array('restful.validationScopeFactory'),
			'drahak\\restful\\validation\\validationscopefactory' => array('restful.validationScopeFactory'),
			'drahak\\restful\\validation\\ivalidationscope' => array('restful.validationScope'),
			'drahak\\restful\\validation\\validationscope' => array('restful.validationScope'),
			'drahak\\restful\\converters\\iconverter' => array(
				'restful.objectConverter',
				'restful.dateTimeConverter',
				'restful.camelCaseConverter',
				'restful.pascalCaseConverter',
				'restful.snakeCaseConverter',
			),
			'drahak\\restful\\converters\\objectconverter' => array('restful.objectConverter'),
			'drahak\\restful\\converters\\datetimeconverter' => array('restful.dateTimeConverter'),
			'drahak\\restful\\converters\\camelcaseconverter' => array('restful.camelCaseConverter'),
			'drahak\\restful\\converters\\pascalcaseconverter' => array('restful.pascalCaseConverter'),
			'drahak\\restful\\converters\\snakecaseconverter' => array('restful.snakeCaseConverter'),
			'drahak\\restful\\converters\\resourceconverter' => array('restful.resourceConverter'),
			'drahak\\restful\\security\\iauthtokencalculator' => array('restful.security.hashCalculator'),
			'drahak\\restful\\security\\hashcalculator' => array('restful.security.hashCalculator'),
			'drahak\\restful\\security\\authentication\\irequestauthenticator' => array(
				'restful.security.hashAuthenticator',
				'restful.security.timeoutAuthenticator',
			),
			'drahak\\restful\\security\\authentication\\hashauthenticator' => array('restful.security.hashAuthenticator'),
			'drahak\\restful\\security\\authentication\\timeoutauthenticator' => array('restful.security.timeoutAuthenticator'),
			'drahak\\restful\\security\\process\\authenticationprocess' => array(
				'restful.security.nullAuthentication',
				'restful.security.securedAuthentication',
				'restful.security.basicAuthentication',
			),
			'drahak\\restful\\security\\process\\nullauthentication' => array('restful.security.nullAuthentication'),
			'drahak\\restful\\security\\process\\securedauthentication' => array(
				'restful.security.securedAuthentication',
			),
			'drahak\\restful\\security\\process\\basicauthentication' => array('restful.security.basicAuthentication'),
			'drahak\\restful\\security\\authenticationcontext' => array('restful.security.authentication'),
			'drahak\\restful\\application\\iannotationparser' => array('restful.routeAnnotation'),
			'drahak\\restful\\application\\routeannotation' => array('restful.routeAnnotation'),
			'drahak\\restful\\application\\iroutelistfactory' => array(
				'restful.routeListFactory',
				'restful.cachedRouteListFactory',
			),
			'drahak\\restful\\application\\routelistfactory' => array('restful.routeListFactory'),
			'drahak\\restful\\application\\cachedroutelistfactory' => array('restful.cachedRouteListFactory'),
			'nette\\diagnostics\\ibarpanel' => array('restful.panel'),
			'tracy\\ibarpanel' => array('restful.panel'),
			'drahak\\restful\\diagnostics\\resourcerouterpanel' => array('restful.panel'),
			'app\\routerfactory' => array('57_App_RouterFactory'),
			'nette\\di\\container' => array('container'),
		),
		'tags' => array(
			'restful.converter' => array(
				'restful.camelCaseConverter' => TRUE,
				'restful.dateTimeConverter' => TRUE,
				'restful.objectConverter' => TRUE,
			),
		),
	);


	public function __construct()
	{
		parent::__construct(array(
			'appDir' => 'C:\\wamp\\www\\futra\\app',
			'wwwDir' => 'C:\\wamp\\www\\futra\\www',
			'debugMode' => TRUE,
			'productionMode' => FALSE,
			'environment' => 'development',
			'consoleMode' => FALSE,
			'container' => array(
				'class' => 'SystemContainer',
				'parent' => 'Nette\\DI\\Container',
				'accessors' => TRUE,
			),
			'tempDir' => 'C:\\wamp\\www\\futra\\app/../temp',
		));
	}


	/**
	 * @return App\RouterFactory
	 */
	public function createService__57_App_RouterFactory()
	{
		$service = new App\RouterFactory;
		return $service;
	}


	/**
	 * @return Nette\Application\Application
	 */
	public function createServiceApplication()
	{
		$service = new Nette\Application\Application($this->getService('nette.presenterFactory'), $this->getService('router'), $this->getService('httpRequest'), $this->getService('httpResponse'));
		$service->catchExceptions = FALSE;
		$service->errorPresenter = 'Error';
		Nette\Bridges\ApplicationTracy\RoutingPanel::initializePanel($service);
		Tracy\Debugger::getBar()->addPanel(new Nette\Bridges\ApplicationTracy\RoutingPanel($this->getService('router'), $this->getService('httpRequest'), $this->getService('nette.presenterFactory')));
		$service->onStartup[] = array(
			$this->getService('restful.methodHandler'),
			'run',
		);
		$service->onError[] = array(
			$this->getService('restful.methodHandler'),
			'error',
		);
		$service->onStartup[] = array(
			$this->getService('restful.panel'),
			'getTab',
		);
		return $service;
	}


	/**
	 * @return Nette\Caching\Storages\FileStorage
	 */
	public function createServiceCacheStorage()
	{
		$service = new Nette\Caching\Storages\FileStorage('C:\\wamp\\www\\futra\\app/../temp/cache', $this->getService('nette.cacheJournal'));
		return $service;
	}


	/**
	 * @return Nette\DI\Container
	 */
	public function createServiceContainer()
	{
		return $this;
	}


	/**
	 * @return Nette\Http\Request
	 */
	public function createServiceHttpRequest()
	{
		$service = $this->getService('restful.httpRequestFactory')->createHttpRequest();
		if (!$service instanceof Nette\Http\Request) {
			throw new Nette\UnexpectedValueException('Unable to create service \'httpRequest\', value returned by factory is not Nette\\Http\\Request type.');
		}
		return $service;
	}


	/**
	 * @return Drahak\Restful\Http\ResponseProxy
	 */
	public function createServiceHttpResponse()
	{
		$service = $this->getService('restful.httpResponseFactory')->createHttpResponse();
		if (!$service instanceof Drahak\Restful\Http\ResponseProxy) {
			throw new Nette\UnexpectedValueException('Unable to create service \'httpResponse\', value returned by factory is not Drahak\\Restful\\Http\\ResponseProxy type.');
		}
		return $service;
	}


	/**
	 * @return Nette\Bridges\Framework\NetteAccessor
	 */
	public function createServiceNette()
	{
		$service = new Nette\Bridges\Framework\NetteAccessor($this);
		return $service;
	}


	/**
	 * @return Nette\Caching\Cache
	 */
	public function createServiceNette__cache($namespace = NULL)
	{
		$service = new Nette\Caching\Cache($this->getService('cacheStorage'), $namespace);
		trigger_error('Service cache is deprecated.', 16384);
		return $service;
	}


	/**
	 * @return Nette\Caching\Storages\FileJournal
	 */
	public function createServiceNette__cacheJournal()
	{
		$service = new Nette\Caching\Storages\FileJournal('C:\\wamp\\www\\futra\\app/../temp');
		return $service;
	}


	/**
	 * @return Nette\Database\Connection
	 */
	public function createServiceNette__database__default()
	{
		$service = new Nette\Database\Connection('mysql:host=127.0.0.1;dbname=futra', 'root', NULL, array('lazy' => TRUE));
		Tracy\Debugger::getBlueScreen()->addPanel('Nette\\Bridges\\DatabaseTracy\\ConnectionPanel::renderException');
		Nette\Database\Helpers::createDebugPanel($service, TRUE, 'default');
		return $service;
	}


	/**
	 * @return Nette\Database\Context
	 */
	public function createServiceNette__database__default__context()
	{
		$service = new Nette\Database\Context($this->getService('nette.database.default'), new Nette\Database\Reflection\DiscoveredReflection($this->getService('nette.database.default'), $this->getService('cacheStorage')), $this->getService('cacheStorage'));
		return $service;
	}


	/**
	 * @return Nette\Http\Context
	 */
	public function createServiceNette__httpContext()
	{
		$service = new Nette\Http\Context($this->getService('httpRequest'), $this->getService('httpResponse'));
		return $service;
	}


	/**
	 * @return Nette\Http\RequestFactory
	 */
	public function createServiceNette__httpRequestFactory()
	{
		$service = new Nette\Http\RequestFactory;
		$service->setProxy(array());
		return $service;
	}


	/**
	 * @return Latte\Engine
	 */
	public function createServiceNette__latte()
	{
		$service = new Latte\Engine;
		$service->setTempDirectory('C:\\wamp\\www\\futra\\app/../temp/cache/latte');
		$service->setAutoRefresh(TRUE);
		$service->setContentType('html');
		return $service;
	}


	/**
	 * @return Nette\Bridges\ApplicationLatte\ILatteFactory
	 */
	public function createServiceNette__latteFactory()
	{
		return new SystemContainer_Nette_Bridges_ApplicationLatte_ILatteFactoryImpl_nette_latteFactory($this);
	}


	/**
	 * @return Nette\Mail\SendmailMailer
	 */
	public function createServiceNette__mailer()
	{
		$service = new Nette\Mail\SendmailMailer;
		return $service;
	}


	/**
	 * @return Nette\Application\PresenterFactory
	 */
	public function createServiceNette__presenterFactory()
	{
		$service = new Nette\Application\PresenterFactory('C:\\wamp\\www\\futra\\app', $this);
		$service->setMapping(array(
			'*' => 'App\\*Module\\Presenters\\*Presenter',
		));
		return $service;
	}


	/**
	 * @return Nette\Templating\FileTemplate
	 */
	public function createServiceNette__template()
	{
		$service = new Nette\Templating\FileTemplate;
		$service->registerFilter($this->getService('nette.latteFactory')->create());
		$service->registerHelperLoader('Nette\\Templating\\Helpers::loader');
		return $service;
	}


	/**
	 * @return Nette\Caching\Storages\PhpFileStorage
	 */
	public function createServiceNette__templateCacheStorage()
	{
		$service = new Nette\Caching\Storages\PhpFileStorage('C:\\wamp\\www\\futra\\app/../temp/cache', $this->getService('nette.cacheJournal'));
		trigger_error('Service templateCacheStorage is deprecated.', 16384);
		return $service;
	}


	/**
	 * @return Nette\Bridges\ApplicationLatte\TemplateFactory
	 */
	public function createServiceNette__templateFactory()
	{
		$service = new Nette\Bridges\ApplicationLatte\TemplateFactory($this->getService('nette.latteFactory'), $this->getService('httpRequest'), $this->getService('httpResponse'), $this->getService('user'), $this->getService('cacheStorage'));
		return $service;
	}


	/**
	 * @return Nette\Http\UserStorage
	 */
	public function createServiceNette__userStorage()
	{
		$service = new Nette\Http\UserStorage($this->getService('session'));
		return $service;
	}


	/**
	 * @return Drahak\Restful\Application\CachedRouteListFactory
	 */
	public function createServiceRestful__cachedRouteListFactory()
	{
		$service = new Drahak\Restful\Application\CachedRouteListFactory('C:\\wamp\\www\\futra\\app', $this->getService('restful.routeListFactory'), $this->getService('cacheStorage'));
		return $service;
	}


	/**
	 * @return Drahak\Restful\Converters\CamelCaseConverter
	 */
	public function createServiceRestful__camelCaseConverter()
	{
		$service = new Drahak\Restful\Converters\CamelCaseConverter;
		return $service;
	}


	/**
	 * @return Drahak\Restful\Mapping\DataUrlMapper
	 */
	public function createServiceRestful__dataUrlMapper()
	{
		$service = new Drahak\Restful\Mapping\DataUrlMapper;
		return $service;
	}


	/**
	 * @return Drahak\Restful\Converters\DateTimeConverter
	 */
	public function createServiceRestful__dateTimeConverter()
	{
		$service = new Drahak\Restful\Converters\DateTimeConverter('c');
		return $service;
	}


	/**
	 * @return Drahak\Restful\Http\ApiRequestFactory
	 */
	public function createServiceRestful__httpRequestFactory()
	{
		$service = new Drahak\Restful\Http\ApiRequestFactory($this->getService('nette.httpRequestFactory'));
		return $service;
	}


	/**
	 * @return Drahak\Restful\Http\ResponseFactory
	 */
	public function createServiceRestful__httpResponseFactory()
	{
		$service = new Drahak\Restful\Http\ResponseFactory($this->getService('httpRequest'), $this->getService('restful.requestFilter'));
		return $service;
	}


	/**
	 * @return Drahak\Restful\Http\InputFactory
	 */
	public function createServiceRestful__inputFactory()
	{
		$service = new Drahak\Restful\Http\InputFactory($this->getService('httpRequest'), $this->getService('restful.mapperContext'), $this->getService('restful.validationScopeFactory'));
		return $service;
	}


	/**
	 * @return Drahak\Restful\Mapping\JsonMapper
	 */
	public function createServiceRestful__jsonMapper()
	{
		$service = new Drahak\Restful\Mapping\JsonMapper;
		return $service;
	}


	/**
	 * @return Drahak\Restful\Mapping\MapperContext
	 */
	public function createServiceRestful__mapperContext()
	{
		$service = new Drahak\Restful\Mapping\MapperContext;
		$service->addMapper('application/xml', $this->getService('restful.xmlMapper'));
		$service->addMapper('application/json', $this->getService('restful.jsonMapper'));
		$service->addMapper('application/javascript', $this->getService('restful.jsonMapper'));
		$service->addMapper('application/x-www-form-urlencoded', $this->getService('restful.queryMapper'));
		$service->addMapper('application/x-data-url', $this->getService('restful.dataUrlMapper'));
		$service->addMapper('application/octet-stream', $this->getService('restful.nullMapper'));
		$service->addMapper('NULL', $this->getService('restful.nullMapper'));
		return $service;
	}


	/**
	 * @return Drahak\Restful\Application\Events\MethodHandler
	 */
	public function createServiceRestful__methodHandler()
	{
		$service = new Drahak\Restful\Application\Events\MethodHandler($this->getService('httpRequest'), $this->getService('httpResponse'), $this->getService('restful.methodOptions'));
		return $service;
	}


	/**
	 * @return Drahak\Restful\Application\MethodOptions
	 */
	public function createServiceRestful__methodOptions()
	{
		$service = new Drahak\Restful\Application\MethodOptions($this->getService('router'));
		return $service;
	}


	/**
	 * @return Drahak\Restful\Mapping\NullMapper
	 */
	public function createServiceRestful__nullMapper()
	{
		$service = new Drahak\Restful\Mapping\NullMapper;
		return $service;
	}


	/**
	 * @return Drahak\Restful\Converters\ObjectConverter
	 */
	public function createServiceRestful__objectConverter()
	{
		$service = new Drahak\Restful\Converters\ObjectConverter;
		return $service;
	}


	/**
	 * @return Drahak\Restful\Diagnostics\ResourceRouterPanel
	 */
	public function createServiceRestful__panel()
	{
		$service = new Drahak\Restful\Diagnostics\ResourceRouterPanel('my-secret-api-key', 'timestamp', $this->getService('router'));
		Nette\Diagnostics\Debugger::getBar()->addPanel($service);
		return $service;
	}


	/**
	 * @return Drahak\Restful\Converters\PascalCaseConverter
	 */
	public function createServiceRestful__pascalCaseConverter()
	{
		$service = new Drahak\Restful\Converters\PascalCaseConverter;
		return $service;
	}


	/**
	 * @return Drahak\Restful\Mapping\QueryMapper
	 */
	public function createServiceRestful__queryMapper()
	{
		$service = new Drahak\Restful\Mapping\QueryMapper;
		return $service;
	}


	/**
	 * @return Drahak\Restful\Utils\RequestFilter
	 */
	public function createServiceRestful__requestFilter()
	{
		$service = new Drahak\Restful\Utils\RequestFilter($this->getService('httpRequest'), array('jsonp', 'pretty'));
		return $service;
	}


	/**
	 * @return Drahak\Restful\IResource
	 */
	public function createServiceRestful__resource()
	{
		$service = $this->getService('restful.resourceFactory')->create();
		if (!$service instanceof Drahak\Restful\IResource) {
			throw new Nette\UnexpectedValueException('Unable to create service \'restful.resource\', value returned by factory is not Drahak\\Restful\\IResource type.');
		}
		return $service;
	}


	/**
	 * @return Drahak\Restful\Converters\ResourceConverter
	 */
	public function createServiceRestful__resourceConverter()
	{
		$service = new Drahak\Restful\Converters\ResourceConverter;
		$service->addConverter($this->getService('restful.objectConverter'));
		$service->addConverter($this->getService('restful.dateTimeConverter'));
		$service->addConverter($this->getService('restful.camelCaseConverter'));
		return $service;
	}


	/**
	 * @return Drahak\Restful\ResourceFactory
	 */
	public function createServiceRestful__resourceFactory()
	{
		$service = new Drahak\Restful\ResourceFactory($this->getService('httpRequest'), $this->getService('restful.resourceConverter'));
		return $service;
	}


	/**
	 * @return Drahak\Restful\Application\ResponseFactory
	 */
	public function createServiceRestful__responseFactory()
	{
		$service = new Drahak\Restful\Application\ResponseFactory($this->getService('httpResponse'), $this->getService('httpRequest'), $this->getService('restful.mapperContext'));
		$service->setJsonp('jsonp');
		$service->setPrettyPrint('pretty');
		return $service;
	}


	/**
	 * @return Drahak\Restful\Application\RouteAnnotation
	 */
	public function createServiceRestful__routeAnnotation()
	{
		$service = new Drahak\Restful\Application\RouteAnnotation;
		return $service;
	}


	/**
	 * @return Drahak\Restful\Application\RouteListFactory
	 */
	public function createServiceRestful__routeListFactory()
	{
		$service = new Drahak\Restful\Application\RouteListFactory('C:\\wamp\\www\\futra\\app', $this->getService('cacheStorage'), $this->getService('restful.routeAnnotation'));
		$service->setModule('RestApi');
		$service->setPrefix('resources');
		return $service;
	}


	/**
	 * @return Drahak\Restful\Security\AuthenticationContext
	 */
	public function createServiceRestful__security__authentication()
	{
		$service = new Drahak\Restful\Security\AuthenticationContext;
		$service->setAuthProcess($this->getService('restful.security.nullAuthentication'));
		return $service;
	}


	/**
	 * @return Drahak\Restful\Security\Process\BasicAuthentication
	 */
	public function createServiceRestful__security__basicAuthentication()
	{
		$service = new Drahak\Restful\Security\Process\BasicAuthentication($this->getService('user'));
		return $service;
	}


	/**
	 * @return Drahak\Restful\Security\Authentication\HashAuthenticator
	 */
	public function createServiceRestful__security__hashAuthenticator()
	{
		$service = new Drahak\Restful\Security\Authentication\HashAuthenticator('my-secret-api-key', $this->getService('httpRequest'), $this->getService('restful.security.hashCalculator'));
		return $service;
	}


	/**
	 * @return Drahak\Restful\Security\HashCalculator
	 */
	public function createServiceRestful__security__hashCalculator()
	{
		$service = new Drahak\Restful\Security\HashCalculator($this->getService('restful.mapperContext'), $this->getService('httpRequest'));
		$service->setPrivateKey('my-secret-api-key');
		return $service;
	}


	/**
	 * @return Drahak\Restful\Security\Process\NullAuthentication
	 */
	public function createServiceRestful__security__nullAuthentication()
	{
		$service = new Drahak\Restful\Security\Process\NullAuthentication;
		return $service;
	}


	/**
	 * @return Drahak\Restful\Security\Process\SecuredAuthentication
	 */
	public function createServiceRestful__security__securedAuthentication()
	{
		$service = new Drahak\Restful\Security\Process\SecuredAuthentication($this->getService('restful.security.hashAuthenticator'), $this->getService('restful.security.timeoutAuthenticator'));
		return $service;
	}


	/**
	 * @return Drahak\Restful\Security\Authentication\TimeoutAuthenticator
	 */
	public function createServiceRestful__security__timeoutAuthenticator()
	{
		$service = new Drahak\Restful\Security\Authentication\TimeoutAuthenticator('timestamp', 300);
		return $service;
	}


	/**
	 * @return Drahak\Restful\Converters\SnakeCaseConverter
	 */
	public function createServiceRestful__snakeCaseConverter()
	{
		$service = new Drahak\Restful\Converters\SnakeCaseConverter;
		return $service;
	}


	/**
	 * @return Drahak\Restful\Validation\ValidationScope
	 */
	public function createServiceRestful__validationScope()
	{
		$service = $this->getService('restful.validationScopeFactory')->create();
		if (!$service instanceof Drahak\Restful\Validation\ValidationScope) {
			throw new Nette\UnexpectedValueException('Unable to create service \'restful.validationScope\', value returned by factory is not Drahak\\Restful\\Validation\\ValidationScope type.');
		}
		return $service;
	}


	/**
	 * @return Drahak\Restful\Validation\ValidationScopeFactory
	 */
	public function createServiceRestful__validationScopeFactory()
	{
		$service = new Drahak\Restful\Validation\ValidationScopeFactory($this->getService('restful.validator'));
		return $service;
	}


	/**
	 * @return Drahak\Restful\Validation\Validator
	 */
	public function createServiceRestful__validator()
	{
		$service = new Drahak\Restful\Validation\Validator;
		return $service;
	}


	/**
	 * @return Drahak\Restful\Mapping\XmlMapper
	 */
	public function createServiceRestful__xmlMapper()
	{
		$service = new Drahak\Restful\Mapping\XmlMapper;
		return $service;
	}


	/**
	 * @return Nette\Application\IRouter
	 */
	public function createServiceRouter()
	{
		$service = $this->getService('57_App_RouterFactory')->createRouter();
		if (!$service instanceof Nette\Application\IRouter) {
			throw new Nette\UnexpectedValueException('Unable to create service \'router\', value returned by factory is not Nette\\Application\\IRouter type.');
		}
		$service->offsetSet(NULL, $this->getService('restful.cachedRouteListFactory')->create());
		return $service;
	}


	/**
	 * @return Nette\Http\Session
	 */
	public function createServiceSession()
	{
		$service = new Nette\Http\Session($this->getService('httpRequest'), $this->getService('httpResponse'));
		$service->setExpiration('14 days');
		return $service;
	}


	/**
	 * @return Nette\Security\User
	 */
	public function createServiceUser()
	{
		$service = new Nette\Security\User($this->getService('nette.userStorage'));
		Tracy\Debugger::getBar()->addPanel(new Nette\Bridges\SecurityTracy\UserPanel($service));
		return $service;
	}


	public function initialize()
	{
		date_default_timezone_set('Europe/Prague');
		ini_set('zlib.output_compression', TRUE);
		Nette\Bridges\Framework\TracyBridge::initialize();
		Nette\Caching\Storages\FileStorage::$useDirectories = TRUE;
		$this->getByType("Nette\Http\Session")->exists() && $this->getByType("Nette\Http\Session")->start();
		header('X-Frame-Options: SAMEORIGIN');
		header('X-Powered-By: Nette Framework');
		header('Content-Type: text/html; charset=utf-8');
		Nette\Utils\SafeStream::register();
		Nette\Reflection\AnnotationsParser::setCacheStorage($this->getByType("Nette\Caching\IStorage"));
		Nette\Reflection\AnnotationsParser::$autoRefresh = TRUE;
	}

}



final class SystemContainer_Nette_Bridges_ApplicationLatte_ILatteFactoryImpl_nette_latteFactory implements Nette\Bridges\ApplicationLatte\ILatteFactory
{

	private $container;


	public function __construct(Nette\DI\Container $container)
	{
		$this->container = $container;
	}


	public function create()
	{
		$service = new Latte\Engine;
		$service->setTempDirectory('C:\\wamp\\www\\futra\\app/../temp/cache/latte');
		$service->setAutoRefresh(TRUE);
		$service->setContentType('html');
		return $service;
	}

}
