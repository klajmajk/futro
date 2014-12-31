<?php
// source: C:\Users\novot_000\OneDrive\dev\futro\app/templates/Main/default.latte

// prolog Latte\Macros\CoreMacros
list($_b, $_g, $_l) = $template->initialize('7359701753', 'html')
;
// prolog Latte\Macros\BlockMacros
//
// block app
//
if (!function_exists($_b->blocks['app'][] = '_lbf9c1b86b3d_app')) { function _lbf9c1b86b3d_app($_b, $_args) { foreach ($_args as $__k => $__v) $$__k = $__v
?>kumpanium<?php
}}

//
// block cssp
//
if (!function_exists($_b->blocks['cssp'][] = '_lb2cf2d8514d_cssp')) { function _lb2cf2d8514d_cssp($_b, $_args) { foreach ($_args as $__k => $__v) $$__k = $__v
?>main.cssp<?php
}}

//
// block head
//
if (!function_exists($_b->blocks['head'][] = '_lbb1718c16ff_head')) { function _lbb1718c16ff_head($_b, $_args) { foreach ($_args as $__k => $__v) $$__k = $__v
?><link rel="stylesheet" href="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>
/css/angular-chart.css"><?php
}}

//
// block scripts
//
if (!function_exists($_b->blocks['scripts'][] = '_lb43bb3c42d3_scripts')) { function _lb43bb3c42d3_scripts($_b, $_args) { foreach ($_args as $__k => $__v) $$__k = $__v
?><script>var isManager = <?php echo Latte\Runtime\Filters::escapeJs($isManager) ?>
; var currentUserId = <?php echo Latte\Runtime\Filters::escapeJs($userId) ?>;</script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular-route.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular-animate.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular-resource.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular-sanitize.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/angular-strap/2.1.3/angular-strap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/angular-strap/2.1.3/angular-strap.tpl.min.js"></script>
<script src="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/js/vendor/chart/chart.min.js"></script>
<script src="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/js/vendor/chart/angular-chart.js"></script>
<script src="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/js/app/app.js"></script>
<script src="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/js/app/controllers.js"></script>
<script src="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/js/app/filters.js"></script>
<script src="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/js/app/services.js"></script>
<script src="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/js/app/directives.js"></script>
<?php
}}

//
// block content
//
if (!function_exists($_b->blocks['content'][] = '_lb20ba4e7eac_content')) { function _lb20ba4e7eac_content($_b, $_args) { foreach ($_args as $__k => $__v) $$__k = $__v
?><div class="site-wrapper">
	<a id="exit" href="<?php echo Latte\Runtime\Filters::escapeHtml($_control->link("Sign:out"), ENT_COMPAT) ?>
">
		<img src="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/images/exit.png" alt="EXIT" width="100%">
	</a>
	<div class="site-wrapper-inner">
		<div class="cover-container">

			<div class="masthead clearfix">
				<div class="inner text-center">
					<h3 class="masthead-brand">Kumpánium</h3>
					<ul class="nav masthead-nav" bs-navbar>
						<li data-match-route="/novinky"><a href="#/">Novinky</a></li>
						<li data-match-route="/statistiky"><a href="#/statistiky">Statistiky</a></li>
						<li data-match-route="/konzumenti"><a href="#/konzumenti">Konzumenti</a></li>
						<li data-match-route="/zasoby"><a href="#/zasoby">Zásoby</a></li>
					</ul>
				</div>
			</div>

			<div class="cover">
				<div ng-view></div>				
			</div>

		</div>
	</div>
</div>
<?php
}}

//
// end of blocks
//

// template extending

$_l->extends = empty($_g->extended) && isset($_control) && $_control instanceof Nette\Application\UI\Presenter ? $_control->findLayoutTemplateFile() : NULL; $_g->extended = TRUE;

if ($_l->extends) { ob_start();}

// prolog Nette\Bridges\ApplicationLatte\UIMacros

// snippets support
if (empty($_l->extends) && !empty($_control->snippetMode)) {
	return Nette\Bridges\ApplicationLatte\UIMacros::renderSnippets($_control, $_b, get_defined_vars());
}

//
// main template
//
if ($_l->extends) { ob_end_clean(); return $template->renderChildTemplate($_l->extends, get_defined_vars()); }
call_user_func(reset($_b->blocks['app']), $_b, get_defined_vars())  ?>


<?php call_user_func(reset($_b->blocks['cssp']), $_b, get_defined_vars())  ?>


<?php call_user_func(reset($_b->blocks['head']), $_b, get_defined_vars())  ?>



<?php call_user_func(reset($_b->blocks['scripts']), $_b, get_defined_vars())  ?>

<?php call_user_func(reset($_b->blocks['content']), $_b, get_defined_vars()) ; 