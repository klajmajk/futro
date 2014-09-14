<?php
// source: C:\wamp\www\futro\app\templates\Homepage\default.latte

// prolog Latte\Macros\CoreMacros
list($_l, $_g) = $template->initialize('7829814789', 'html')
;
// prolog Latte\Macros\BlockMacros
//
// block css
//
if (!function_exists($_l->blocks['css'][] = '_lbcda2e76c45_css')) { function _lbcda2e76c45_css($_l, $_args) { foreach ($_args as $__k => $__v) $$__k = $__v
?>mobile.cssp<?php
}}

//
// block content
//
if (!function_exists($_l->blocks['content'][] = '_lb4f82488b6e_content')) { function _lb4f82488b6e_content($_l, $_args) { foreach ($_args as $__k => $__v) $$__k = $__v
?><div class="container-fluid">
	<div class="navbar navbar-fixed-top">
		<table class="table">
			<tbody>
				<tr>
					<th>Kumpán</th>
					<th colspan="2" class="center">Pivo: {{ 'Pilsner' + ' Urquell' }}</th>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="content">
		<table class="table table-striped table-hover">
			<tbody>
<?php $iterations = 0; foreach ($kumpani as $kumpan) { ?>				<tr>
					<th>
						<h2><?php echo Latte\Runtime\Filters::escapeHtml($kumpan->name, ENT_NOQUOTES) ?></h2>
					</th>
					<td class="center">
						<h2>&minus;</h2>
					</td>
					<td class="center">
						<h2>&plus;</h2>
					</td>
				</tr>
<?php $iterations++; } ?>
			</tbody>
		</table>
		<ul>
			<li ng-repeat="consumer in consumers">{{ consumer.alias }}
		</ul>
	</div>
</div>
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
call_user_func(reset($_l->blocks['css']), $_l, get_defined_vars())  ?>


<?php call_user_func(reset($_l->blocks['content']), $_l, get_defined_vars()) ; 