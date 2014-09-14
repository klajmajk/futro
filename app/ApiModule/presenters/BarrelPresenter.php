<?php

namespace App\ApiModule\Presenters;

use Nette,
	Drahak\Restful\IResource;

/**
 * CRUD resource presenter
 * @package ResourcesModule
 * @author Václav Novotný
 */
class BarrelPresenter extends BasePresenter
{


	public function actionRead()
	{
		$this->resource->action = 'Read';
		$result = array();
		foreach ($this->table->where('barrel_state != "FINISHED"') as $barrel) {
			$reference = $barrel->ref('barrel_kind')->toArray();
			$barrel = $barrel->toArray();
			$barrel['barrel_kind'] = $reference;
			$result[] = $barrel;
		}
		$this->resource = $result;

		$this->sendResource(IResource::JSON);
	}


	public function actionCreate()
	{
		$test = \Drahak\Restful\Utils\Strings::toSnakeCase('idBarrelState');
		var_dump($test);  // $this->resource->action = 'Create';
		$input = $this->getInputData();
		if ($input['barrel_state'] !== 'STOCK') {
			$exception = new \Exception('Not allowed', 403);
			$this->sendErrorResource($exception);
		} else {
			$this->table->insert($input);
		}
	}


	public function actionUpdate($id = null)
	{
		// $this->resource->action = 'Update';
		$input = $this->getInputData();
		if ($id === null)
			$id = $input['id_'.$this->table->getName()];
		$currentBarrel = $this->table->get($id);
		$current = $currentBarrel->toArray();

		try {
			$this->isValidInput($current, $input);
			switch ($current['barrel_state']) {
				case 'FINISHED':
					throw new \Exception('Cannot change state of finished barrel.', 403);
				case 'STOCK':
					if ($input['barrel_state'] === 'FINISHED')
						throw new \Exception('Cannot finish untapped barrel.', 403);
			}

			unset($input['id_'.$this->table->getName()]);
			$currentBarrel->update($input);

			if ($input['barrel_state'] === 'FINISHED')
				$this->countAndFinishBarrel($currentBarrel);
		} catch (\Exception $ex) {
			$this->sendErrorResource($ex);
		}
	}


	private function isValidInput(array $current, array $new)
	{
		$current['bought'] = $current['bought']->format(Nette\Utils\DateTime::ISO8601);
		// TODO nevyhodí problém při odlišném datu
		unset($current['taped'], $new['taped']);

		$diff = array_diff($current, $new);
		if (count($diff) !== 1 || !isset($diff['barrel_state']))
			throw new \Exception('Can change only barrel state or no change received.', 403);
	}


	private function countAndFinishBarrel(\Nette\Database\Table\IRow $barrel)
	{
		$drink_records = $this->db->table('drink_record')->where('barrel', $barrel->id_barrel);
		$total_consumption = $drink_records->sum('volume');
		$price_per_ml = $barrel->price / $total_consumption;
		foreach ($drink_records as $record) {
			$price = $record->volume * $price_per_ml;
			$record->update(array('price' => $price));
			// TODO opravit aby bylo hezčí
			$this->db->query('UPDATE consumer SET credit = credit - '
					.$price.' WHERE id_consumer = '.$record->consumer)->dump();
		}
	}


	public function actionDelete($id)
	{
		$currentBarrel = $this->table->get($id);
		$this->countAndFinishBarrel($currentBarrel);
	}


}
