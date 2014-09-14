<?php
// source: C:\wamp\www\futra\app\FutraModule/templates/@layout.latte

// prolog Latte\Macros\CoreMacros
list($_l, $_g) = $template->initialize('8250248913', 'html')
;
// prolog Nette\Bridges\ApplicationLatte\UIMacros

// snippets support
if (empty($_l->extends) && !empty($_control->snippetMode)) {
	return Nette\Bridges\ApplicationLatte\UIMacros::renderSnippets($_control, $_l, get_defined_vars());
}

//
// main template
//
Latte\Macros\BlockMacros::callBlock($_l, 'content', $template->getParameters()) ;