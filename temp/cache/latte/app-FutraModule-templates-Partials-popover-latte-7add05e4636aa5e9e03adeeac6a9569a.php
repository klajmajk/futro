<?php
// source: C:\wamp\www\futra\app\FutraModule\templates\Partials\popover.latte

// prolog Latte\Macros\CoreMacros
list($_l, $_g) = $template->initialize('5227090137', 'html')
;
// prolog Latte\Macros\BlockMacros
//
// block content
//
if (!function_exists($_l->blocks['content'][] = '_lb0719e614f8_content')) { function _lb0719e614f8_content($_l, $_args) { foreach ($_args as $__k => $__v) $$__k = $__v
?><div class="popover" tabindex="-1" ng-show="content">
	<div class="arrow"></div>
	<h3 class="popover-title" ng-bind-html="title" ng-show="title"></h3>
	<div class="popover-content">
		<form name="popoverForm">
			<p ng-bind-html="content" style="min-width:300px;"></p>
			<pre>2 + 3 = <span ng-cloak>{{ 2 + 3 }}</span></pre>
			<div class="form-actions">
				<button type="button" class="btn btn-danger" ng-click="$hide()">Close</button>
				<button type="button" class="btn btn-primary" ng-click="popover.saved=true;$hide()">Save changes</button>
			</div>
		</form>
	</div>
</div><?php
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