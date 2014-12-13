<?php
// source: C:\Users\novot_000\OneDrive\dev\futro\app/templates/Partials/stats.latte

// prolog Latte\Macros\CoreMacros
list($_b, $_g, $_l) = $template->initialize('9187508149', 'html')
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
<div class="panel panel-default">
	<div ng-model="tabs.activeTab" bs-tabs>
		<div ng-repeat="tab in tabs" bs-pane
			 title="{{ tab.title }}"
			 compile="tab.content"
			 ng-controller="tab.controller"></div>
	</div>
</div>


