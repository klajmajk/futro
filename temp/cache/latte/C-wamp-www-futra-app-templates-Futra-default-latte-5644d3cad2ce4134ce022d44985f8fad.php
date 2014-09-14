<?php
// source: C:\wamp\www\futra\app\templates\Futra\default.latte

// prolog Latte\Macros\CoreMacros
list($_l, $_g) = $template->initialize('7932915060', 'html')
;
// prolog Nette\Bridges\ApplicationLatte\UIMacros

// snippets support
if (empty($_l->extends) && !empty($_control->snippetMode)) {
	return Nette\Bridges\ApplicationLatte\UIMacros::renderSnippets($_control, $_l, get_defined_vars());
}

//
// main template
//
?>
<!DOCTYPE html>
<html lang="cs" ng-app="futra">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>Futra</title>

	<link rel="stylesheet" href="//mgcrea.github.io/angular-strap/styles/angular-motion.min.css">
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
	<link rel="stylesheet"  href="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/css/turbine/css.php?files=mobile.cssp">
	<link rel="shortcut icon" href="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/favicon.ico">
</head>

<body>
	<div ng-view class="container-fluid"></div>

	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.22/angular.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.22/angular-route.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.22/angular-animate.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.22/angular-resource.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.22/angular-sanitize.min.js"></script>
	<script src="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/js/vendor/angular-strap.min.js"></script>
	<script src="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/js/vendor/angular-strap.tpl.min.js"></script>
	<script src="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/js/app/app.js"></script>
	<script src="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/js/app/controllers.js"></script>
	<script src="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/js/app/filters.js"></script>
	<script src="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/js/app/services.js"></script>
	<script src="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/js/app/directives.js"></script>
</body>
</html>