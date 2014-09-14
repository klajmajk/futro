<?php
// source: C:\wamp\www\futra\app\FutraModule\templates\Partials\default.latte

// prolog Latte\Macros\CoreMacros
list($_l, $_g) = $template->initialize('8177356393', 'html')
;
// prolog Latte\Macros\BlockMacros
//
// block content
//
if (!function_exists($_l->blocks['content'][] = '_lb3570b99af9_content')) { function _lb3570b99af9_content($_l, $_args) { foreach ($_args as $__k => $__v) $$__k = $__v
?><!DOCTYPE html>
<html lang="cs" ng-app="futra">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title><?php if (isset($_l->blocks["title"])) { ob_start(); Latte\Macros\BlockMacros::callBlock($_l, 'title', $template->getParameters()); echo $template->striptags(ob_get_clean()) ?>
 | <?php } ?>Futra</title>
	
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
	<link rel="stylesheet"  href="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/css/turbine/css.php?files=mobile.cssp">
	<link rel="shortcut icon" href="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/favicon.ico">
</head>

<body>
<?php $iterations = 0; foreach ($flashes as $flash) { ?>	<div class="flash <?php echo Latte\Runtime\Filters::escapeHtml($flash->type, ENT_COMPAT) ?>
"><?php echo Latte\Runtime\Filters::escapeHtml($flash->message, ENT_NOQUOTES) ?></div>
<?php $iterations++; } ?>
	
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
</body>
</html>
<?php
}}

//
// end of blocks
//

// template extending

$_l->extends = empty($template->_extended) && isset($_control) && $_control instanceof Nette\Application\UI\Presenter ? $_control->findLayoutTemplateFile() : NULL; $template->_extended = $_extended = TRUE;

if ($_l->extends) { ob_start();}

// prolog Nette\Bridges\ApplicationLatte\UIMacros

// snippets support
if (empty($_l->extends) && !empty($_control->snippetMode)) {
	return Nette\Bridges\ApplicationLatte\UIMacros::renderSnippets($_control, $_l, get_defined_vars());
}

//
// main template
//
if ($_l->extends) { ob_end_clean(); return $template->renderChildTemplate($_l->extends, get_defined_vars()); }
call_user_func(reset($_l->blocks['content']), $_l, get_defined_vars()) ; 