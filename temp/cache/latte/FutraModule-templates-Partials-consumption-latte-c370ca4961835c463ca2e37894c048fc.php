<?php
// source: C:\wamp\www\futra\app\FutraModule\templates\Partials\consumption.latte

// prolog Latte\Macros\CoreMacros
list($_l, $_g) = $template->initialize('5570964760', 'html')
;
// prolog Latte\Macros\BlockMacros
//
// block content
//
if (!function_exists($_l->blocks['content'][] = '_lb684cf1377e_content')) { function _lb684cf1377e_content($_l, $_args) { foreach ($_args as $__k => $__v) $$__k = $__v
?><div id="vytoc">
	<div class="navbar navbar-fixed-top">
		<div class="navbar-header">
			<a class="navbar-brand" href="#">Futra</a>
		</div>
		<ul class="nav navbar-nav navbar-right">
			<li ng-repeat="keg in kegs">
				<a href bs-popover title="{{ popover.title }}" data-content="{{ popover.content }}"
				   data-template="<?php echo Latte\Runtime\Filters::escapeHtml($basePath, ENT_COMPAT) ?>/partials/popover/kegDetail.html" data-placement="bottom">
					{{ keg.name }}
				</a>
			</li>
		</ul>
		<div class="navbar-right">
			<button type="button" class="btn btn-primary navbar-btn">Další sud</button>
		</div>
	</div>
	<table class="table table-striped table-hover">
		<tbody>
			<tr ng-repeat="consumer in consumers">
				<th>
					<h2>{{ consumer.alias }}</h2>
				</th>
				<td ng-repeat="keg in kegs">
					<button class="btn btn-lg btn-success">0,3</button>
					<button class="btn btn-lg btn-danger">0,5</button>
				</td>
			</tr>
		</tbody>
	</table>
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