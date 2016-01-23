<?php

namespace App\FutroModule\Presenters;

use Nette,
	Drahak\Restful\Application\BadRequestException;

/**
 * CRUD resource presenter
 * @package ResourcesModule
 * @author Václav Novotný
 */
class SyncPresenter extends BasePresenter
{
	
	const MODIFIED_COLS_KEY = "cols";
    const MODIFIED_ROWS_KEY = "rows";
    const RECORDS_MODIFIED = "changed";
    const RECORDS_REMOVED = "removed"; 
	

	public function __construct(Nette\Database\Context $database)
	{
		parent::__construct($database);

	}
	
	public function actionRead($id)
	{
		$tables = [
			"beer",
			"brewery",
			"consumption",
			"credit",
			"keg",
			"news",
			"tap",
			"user"
		];
		
		parent::actionRead($id);
	}

	public function actionCreate()
	{
		$e = BadRequestException::methodNotSupported('Currently not supported');
		$this->sendErrorResource($e);
	}


	public function actionUpdate($id)
	{
		$commaJoin = function ($array) { return join(',', $array); };
		if (isset($this->inputData[self::RECORDS_MODIFIED])) {
			$modTables = $this->inputData[self::RECORDS_MODIFIED];
			$updtValues = function ($colName) {
				return sprintf('%s = VALUES(%1$s)', $colName);				
			};
			
			foreach ($modTables as $tblName => $tblChanges) {
				$tblCols = $tblChanges[self::MODIFIED_COLS_KEY];
				$tblRows = $tblChanges[self::MODIFIED_ROWS_KEY];
				$this->db->query(sprintf(
						'INSERT INTO %s (%s) VALUES (%s) ON DUPLICATE KEY UPDATE %s',
						$tblName,
						$commaJoin($tblName),
						join('),(', array_map($commaJoin, $tblRows)),
						$commaJoin(array_map($updtValues, $tblCols))));
			}
		}
		
		if (isset($this->inputData[self::RECORDS_REMOVED])) {
			$remTables = $this->inputData[self::RECORDS_REMOVED];
		}
		
		
		
		
		$e = BadRequestException::methodNotSupported('Currently not supported');
		$this->sendErrorResource($e);
	}


	public function actionDelete($id)
	{
		$e = BadRequestException::methodNotSupported('Currently not supported');
		$this->sendErrorResource($e);
	}


}
