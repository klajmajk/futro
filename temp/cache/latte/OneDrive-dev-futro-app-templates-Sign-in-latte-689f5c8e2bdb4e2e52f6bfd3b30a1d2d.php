<?php
// source: C:\Users\novot_000\OneDrive\dev\futro\app/templates/Sign/in.latte

// prolog Latte\Macros\CoreMacros
list($_b, $_g, $_l) = $template->initialize('1284301250', 'html')
;
// prolog Latte\Macros\BlockMacros
//
// block cssp
//
if (!function_exists($_b->blocks['cssp'][] = '_lb2a6f657a1a_cssp')) { function _lb2a6f657a1a_cssp($_b, $_args) { foreach ($_args as $__k => $__v) $$__k = $__v
?>login.cssp<?php
}}

//
// block content
//
if (!function_exists($_b->blocks['content'][] = '_lb57dd03d109_content')) { function _lb57dd03d109_content($_b, $_args) { foreach ($_args as $__k => $__v) $$__k = $__v
?><div class="container">
	<div id="signin_container">
		<div id="title">
			<object type="image/svg+xml" data="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/images/hbs.svg" width="100%">Your browser does not support SVG</object>
		</div>
		<div class="row blackbirds" id="blackbird_upper">
			<div class="col-xs-2 col-xs-offset-1">
				<object type="image/svg+xml" data="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/images/kos.svg" width="100%">Your browser does not support SVG</object>
			</div>
			<div class="col-xs-2">
				<object type="image/svg+xml" data="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/images/kos.svg" width="100%">Your browser does not support SVG</object>
			</div>
			<div class="col-xs-2">
				<object type="image/svg+xml" data="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/images/kos.svg" width="100%">Your browser does not support SVG</object>
			</div>
			<div class="col-xs-2 flipped">
				<object type="image/svg+xml" data="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/images/kos.svg" width="100%">Your browser does not support SVG</object>
			</div>
			<div class="col-xs-2 flipped">
				<object type="image/svg+xml" data="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/images/kos.svg" width="100%">Your browser does not support SVG</object>
			</div>
		</div>
		<div id="table_black_border">
			<div id="table_white_border">
				<form class="form-inline" role="form"<?php Nette\Bridges\FormsLatte\FormMacros::renderFormBegin($form = $_form = $_control["signInForm"], array (
  'class' => NULL,
  'role' => NULL,
), FALSE) ?>>
					<div class="form-group">
						<div class="input-group">
							<div class="input-group-addon">@</div>
							<input class="form-control" placeholder="Email..."<?php $_input = $_form["username"]; echo $_input->{method_exists($_input, 'getControlPart')?'getControlPart':'getControl'}()->addAttributes(array (
  'class' => NULL,
  'placeholder' => NULL,
))->attributes() ?>>
						</div>
					</div>
					<div class="form-group">
						<div class="input-group">
							<div class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></div>
							<input class="form-control" placeholder="Heslo..."<?php $_input = $_form["password"]; echo $_input->{method_exists($_input, 'getControlPart')?'getControlPart':'getControl'}()->addAttributes(array (
  'class' => NULL,
  'placeholder' => NULL,
))->attributes() ?>>
						</div>
					</div>
					<button class="btn btn-success"<?php $_input = $_form["enter"]; echo $_input->{method_exists($_input, 'getControlPart')?'getControlPart':'getControl'}()->addAttributes(array (
  'class' => NULL,
))->attributes() ?>>Přihlásit</button>
				<?php Nette\Bridges\FormsLatte\FormMacros::renderFormEnd($_form, FALSE) ?></form>
			</div>		
		</div>
		<div class="row blackbirds" id="blackbird_bottom">
			<div class="col-xs-2 col-xs-offset-1">
				<object type="image/svg+xml" data="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/images/zakos.svg" width="100%">Your browser does not support SVG</object>
			</div>
			<div class="col-xs-2">
				<object type="image/svg+xml" data="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/images/zakos.svg" width="100%">Your browser does not support SVG</object>
			</div>
			<div class="col-xs-2 flipped">
				<object type="image/svg+xml" data="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/images/zakos.svg" width="100%">Your browser does not support SVG</object>
			</div>
			<div class="col-xs-2">
				<object type="image/svg+xml" data="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/images/zakos.svg" width="100%">Your browser does not support SVG</object>
			</div>
			<div class="col-xs-2 flipped">
				<object type="image/svg+xml" data="<?php echo Latte\Runtime\Filters::escapeHtml(Latte\Runtime\Filters::safeUrl($basePath), ENT_COMPAT) ?>/images/zakos.svg" width="100%">Your browser does not support SVG</object>
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
call_user_func(reset($_b->blocks['cssp']), $_b, get_defined_vars())  ?>


<?php call_user_func(reset($_b->blocks['content']), $_b, get_defined_vars()) ; 