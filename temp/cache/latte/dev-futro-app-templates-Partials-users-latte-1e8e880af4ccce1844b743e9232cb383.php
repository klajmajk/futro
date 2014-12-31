<?php
// source: C:\Users\novot_000\OneDrive\dev\futro\app/templates/Partials/users.latte

// prolog Latte\Macros\CoreMacros
list($_b, $_g, $_l) = $template->initialize('6572949096', 'html')
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
	<div class="panel-body">
		<table class="table table-striped table-hover">
			<thead>
				<tr>
					<th>Jméno</th>
					<th>Status</th>
					<th>Naposledy čepoval</th>
					<th>Bilance</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="user in users">
					<td>{{ user.name }}</td>
					<td>
						<span class="label label-{{ user.getRole().context }}"
							  ng-bind-html="user.getRole().name"></span>
					</td>
					<td>
						<a bs-modal data-title="Spotřeba {{ user.name }}"
						   data-content-template="userConsumptionModal"
						   data-animation="am-fade-and-scale"
						   data-placement="center">
							{{ user.lastSoup|date:'EEEE, d. M. y' }}
						</a>
					</td>
					<td ng-class="{ 'text-danger': user.balance < 0 }">
						{{ user.balance|currency:'Kč ':2 }}
					</td>
					<td>
						<a ng-href="mailto:{{ user.email }}">
							<i class="glyphicon glyphicon-envelope"
							   data-placement="top" data-type="info"
							   data-animation="am-fade-and-scale"
							   bs-tooltip="user.email"></i>
						</a>
						<a ng-href="tel:{{ user.phone }}">
							<i class="glyphicon glyphicon-earphone"
							   data-placement="top" data-type="info"
							   data-animation="am-fade-and-scale"
							   bs-tooltip="user.phone"></i>
						</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<!-- fragments to use as template -->
<div cache-template="userConsumptionModal">

</div>
<div cache-template="userCreditModal">
	<table class="table">
		<tr>
			<th>Celkem zaplaceno</th>
			<td></td>
		</tr>
		<tr>
			<th>Celkem zaplaceno</th>
			<td></td>
		</tr>
		<tr>
			<th>Celkem zaplaceno</th>
			<td></td>
		</tr>
	</table>

	<table class="table table-condensed">
		<thead>
			<tr>
				<th>Datum</th>
				<th>Částka</th>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="record in User.getCreditHistory(user.id) as history">
				<td></td>
				<td></td>
			</tr>
		</tbody>
	</table>
</div>
