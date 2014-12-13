<?php
// source: C:\Users\novot_000\OneDrive\dev\futro\app/templates/Partials/news.latte

// prolog Latte\Macros\CoreMacros
list($_b, $_g, $_l) = $template->initialize('5238457036', 'html')
;
// prolog Nette\Bridges\ApplicationLatte\UIMacros

// snippets support
if (empty($_l->extends) && !empty($_control->snippetMode)) {
	return Nette\Bridges\ApplicationLatte\UIMacros::renderSnippets($_control, $_b, get_defined_vars());
}

//
// main template
//
?>
<div class="panel-group" bs-collapse>
	<div ng-repeat="message in news"
		 class="panel panel-{{ message.user.context }}">
		<div class="panel-heading" bs-collapse-toggle>
			<h2 class="panel-title">{{ message.title }}	</h2>
		</div>
		<div class="panel-collapse" bs-collapse-target>
			<div class="panel-body">
				<p>{{ message.body }}</p>
				<p class="text-right">&mdash;
					{{ message.user.name }}</p>
			</div>
		</div>
	</div>
</div>