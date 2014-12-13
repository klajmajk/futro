<?php
// source: C:\Users\novot_000\OneDrive\dev\futro\app/templates/Partials/stock.latte

// prolog Latte\Macros\CoreMacros
list($_b, $_g, $_l) = $template->initialize('9263410550', 'html')
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
		<table class="table table-striped">
			<thead>
				<tr>
					<th>#</th>
					<th>Pivo</th>
					<th>Objem</th>
					<th>Naskladněno</th>
					<th>Cena</th>
					<th>Stav</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="keg in kegs|orderBy:'-state'">
					<td>{{ keg.id }}</td>
					<td>{{ keg.beer.brewery.name + ' ' + keg.beer.name}}</td>
					<td>{{ keg.volume|liters}}</td>
					<td>{{ keg.dateAdd|date:'d. M. yyyy'}}</td>
					<td>{{ keg.price|currency:'Kč ':2}}</td>
					<td>
						<span ng-bind-html="keg.getStateLabel()"></span>
						<i class="glyphicon glyphicon-refresh"
						   data-animation="am-flip-x" bs-dropdown="keg.getAllowedStates()"
						   data-placement="bottom-right" data-html="true"
						   ></i>
					</td>
					<td><i class="glyphicon glyphicon-search" bs-modal
						   data-title="Detail sudu # {{ keg.idKeg}} –
						   {{ keg.beer.brewery.name + ' ' + keg.beer.name}}"
						   data-content-template="stockModal"
						   data-animation="am-fade-and-scale"
						   data-placement="center"></i></td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th></th>
					<th>{{ kegs|total}} ks</th>
					<th>{{ kegs|total:'volume'|liters}}</th>
					<th></th>
					<th>{{ kegs|total:'price'|currency:'Kč ':2}}</th>
					<th></th>
					<th></th>
				</tr>
			</tfoot>
		</table>
	</div>
</div>

<div class="panel panel-default">
	<div class="panel-heading">Přidat sudy na sklad</div>
	<div class="panel-body">
		<form class="form-horizontal" role="form">
			<div class="form-group">
				<label for="quantity" class="col-sm-4 control-label">Počet sudů:</label>
				<div class="col-sm-2">
					<input type="number" min="1" step="1" tabindex="5"
						   class="form-control" id="quantity" ng-model="newStock.quantity">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-4 control-label">Kubatura:</label>
				<div class="col-sm-2">
					<button type="button" class="btn" bs-select
							ng-model="newStock.volume" 
							ng-options="volume as volume|liters for volume in newStock.volumes"
							placeholder="Objem litrů...">
						Action <span class="caret"></span>
					</button>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-4 control-label">Pivo:</label>
				<div class="col-sm-8">
					<div class="btn-group">
						<button type="button" class="btn" bs-select
								ng-model="newStock.brewery" ng-change="assignBeers()"
								ng-options="brewery.id as brewery.name for brewery in breweries"
								placeholder="Pivovar...">
							Action <span class="caret"></span>
						</button>
						<button type="button" class="btn" bs-select ng-change="formBeerSelected()"
								ng-model="newStock.beer" ng-disabled="!newStock.brewery"
								ng-options="beer.id as beer.name for beer in beers"
								placeholder="Pivo...">
							Action <span class="caret"></span>
						</button>
					</div>
					<p class="help-block">Přidat
						<a href="#">nový pivovar</a>
						nebo
						<a href="#">nové pivo</a>
					</p>
				</div>
			</div>
			<div class="form-group">
				<label for="price" class="col-sm-4 control-label">Cena:</label>
				<div class="col-sm-4">
					<div class="input-group">
						<div class="input-group-addon">Kč</div>
						<input type="number" min="0" step=".01" 
							   class="form-control" id="price" ng-model="newStock.price">
					</div>
				</div>
			</div>
		</form>
		<div id="new_stock_alert_container"></div>
	</div>
	<div class="panel-footer">
		<button type="button" class="btn btn-danger" ng-click="formTruncate()">Vyprázdnit formulář</button>
		<button type="button" class="btn btn-success pull-right"
				ng-click="formSave()" ng-disabled="newStock.volume < 1 || !newStock.isValid()"
				>Zapsat změny</button>
	</div>
</div>

<!-- fragments to use as template -->	
<div cache-template="stockModal">
	<div class="keg-info" ng-init="keg.getConsumption()">
		<div class="row">
			<div class="col-xs-3 text-right"><strong>Stav</strong></div>
			<div class="col-xs-3" ng-bind-html="keg.state|kegState"></div>
			<div class="col-xs-3 text-right"><strong>Cena za sud</strong></div>
			<div class="col-xs-3">{{ keg.price | currency:'Kč ':2}}</div>
		</div>
		<div class="row">
			<div class="col-xs-3 text-right"><strong>Naskladněno</strong></div>
			<div class="col-xs-3">{{ keg.dateAdd | date:'d. M. yyyy'}}</div>
			<div class="col-xs-3 text-right"><strong>Zbývá objem</strong></div>
			<div class="col-xs-3">
				{{ ((keg.volume - (keg.consumption | total:'volume')) / 1000) | number:2}}
				/ {{ keg.volume | liters}}
			</div>		
		</div>
		<div class="row" ng-if="keg.dateTap">
			<div class="col-xs-3 text-right"><strong>Naraženo</strong></div>
			<div class="col-xs-3">{{ keg.dateTap | date:'d. M. yyyy'}}</div>
			<div class="col-xs-6">
				<div class="progress">
					<div class="progress-bar progress-bar-success progress-bar-striped"
						 role="progressbar" aria-valuemin="0" aria-valuemax="{{ keg.volume}}"
						 aria-valuenow="{{ keg.volume - (keg.consumption | total:'volume')}}"
						 style="width: {{ (1 - (keg.consumption | total:'volume') / keg.volume) | percent}};"
						 >{{ (1 - (keg.consumption | total:'volume') / keg.volume) | percent}}</div>
				</div>
			</div>
		</div>
		<div class="row" ng-if="keg.dateEnd">
			<div class="col-xs-3 text-right"><strong>Dopito</strong></div>
			<div class="col-xs-3">{{ keg.dateEnd | date:'d. M. yyyy'}}</div>
			<div class="col-xs-3 text-right"><strong>Cena za 1 pivo</strong></div>
			<div class="col-xs-3">
				{{ (keg.price / (keg.consumption|total:'volume') * 500)|currency:'Kč ':2 }}
			</div>
		</div>
		<br>
		<br>
		<div class="panel panel-danger" ng-if="keg.consumption.length"
			 ng-init="editable = isManager && !keg.dateEnd">
			<div class="panel-heading">
				Pivní deník
			</div>
			<table class="consumption_table table table-condensed table-striped" data-toggle="table"  data-height="150">
				<thead>
					<tr>
						<th ng-if="editable" >
							<input type="checkbox" ng-model="checkAllToggle"
								   ng-change="checkAll(keg.consumption, checkAllToggle)">
						</th>
						<th>Konzument</th>
						<th>Okamžik čepování</th>
						<th>Objem</th>
					</tr>
				</thead>
				<tbody>
					<tr ng-repeat="cons in keg.consumption">
						<td ng-if="editable" >
							<input type="checkbox" ng-model="cons.checked">
						</td>
						<td>{{ usersById[cons.user].name }}</td>
						<td>{{ cons.dateAdd | date:'EEEE, d. M. y, HH:mm:ss'}}</td>
						<td>{{ cons.volume + ' ml'}}</td>
					</tr>
				</tbody>
			</table>
			<div class="panel-footer" ng-if="editable">
				<button class="btn btn-danger" ng-click="keg.removeConsumptions()"
						ng-disabled="(keg.consumption|filter:{ checked: true }).length === 0"
						>Smazat označené</button>
				<button class="btn btn-primary pull-right" bs-popover data-auto-close="0"
						data-placement="left" title="Nový pivní záznam"
						data-container="body" data-animation="am-fade consumption-popover"
						data-content-template="stockNewConsumptionPopover"
						>Přidat pivní záznam</button>
			</div>
		</div>
	</div>
</div>

<div cache-template="stockNewConsumptionPopover">
	<form class="form-inline" ng-init="additional = {}">
		<div class="form-group">
			<button type="button" class="btn btn-default" ng-model="additional.user"
					ng-options="user.id as user.name for user in users" bs-select
					placeholder="Osoba...">
				Action <span class="caret"></span>
			</button>
		</div>
		<div class="form-group">
			<div class="input-group">
				<input type="text" class="form-control" placeholder="Spotřeba piv"
					   ng-model="additional.volume">
				<div class="input-group-addon">
					{{ additional.volume|beerTranslate|calculate|number:0 }} ml
				</div>
			</div>
		</div>
		<button class="btn btn-success"
				ng-disabled="!(additional.user > 0 && additional.volume)"
				ng-click="keg.saveConsumption(additional).$promise.then($hide())"
				>Uložit</button>
	</form>
</div>