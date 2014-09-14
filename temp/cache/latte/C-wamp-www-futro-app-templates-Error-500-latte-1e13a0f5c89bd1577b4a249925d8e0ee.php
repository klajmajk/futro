<?php
// source: C:\wamp\www\futro\app\templates\Error\500.latte

// prolog Latte\Macros\CoreMacros
list($_l, $_g) = $template->initialize('0798375404', 'html')
;
// prolog Latte\Macros\BlockMacros
// template extending

$_l->extends = FALSE; $template->_extended = $_extended = TRUE;

if ($_l->extends) { return $template->renderChildTemplate($_l->extends, get_defined_vars());}

// prolog Nette\Bridges\ApplicationLatte\UIMacros

// snippets support
if (empty($_l->extends) && !empty($_control->snippetMode)) {
	return Nette\Bridges\ApplicationLatte\UIMacros::renderSnippets($_control, $_l, get_defined_vars());
}

//
// main template
// ?>
<!DOCTYPE html>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<script>document.body.innerHTML = ''</script>
<style>
	body { color: #333; background: white; width: 500px; margin: 100px auto }
	h1 { font: bold 47px/1.5 sans-serif; margin: .6em 0 }
	p { font: 21px/1.5 Georgia,serif; margin: 1.5em 0 }
	small { font-size: 70%; color: gray }
</style>

<title>Server Error</title>

<h1>Server Error</h1>

<p>We're sorry! The server encountered an internal error and
was unable to complete your request. Please try again later.</p>

<p><small>error 500</small></p>
