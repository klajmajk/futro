<?php

namespace App\FutroModule\Presenters;

use App\Security,
	Drahak\Restful\Validation\IValidator,
	Drahak\Restful\Application\BadRequestException;

/**
 * CRUD resource presenter
 * @package ResourcesModule
 * @author Václav Novotný
 */
class UserPresenter extends BasePresenter
{

	const PHONE_PATTERN = '#^[\+\d\s]{9,}$#';

	public static $roles = array('guest', 'kumpan', 'beer_manager', 'super_admin');
	
	
	public static function normalizePhone(&$phoneNr)
	{
		$phoneNr = '+'.substr('420'.preg_replace('#\D#', '', $phoneNr), -12);
	}


	public function validateCreate()
	{
		$this->input->field('name')->addRule(IValidator::REQUIRED, 'Missing required field: name.');
		$this->input->field('email')->addRule(IValidator::REQUIRED, 'Missing required field: email.');
		$this->input->field('password')->addRule(array($this, 'validateNewPassword'), 'Bad format of new password.');
	}


	public function validateUpdate()
	{
		$this->input->field('email')->addRule(IValidator::EMAIL, 'Invalid email address.');
		$this->input->field('phone')->addRule(IValidator::PATTERN, 'Invalid phone number.', self::PHONE_PATTERN);
	}
	
	
	public function validateCreateCredit()
	{
		if (!$this->getUser()->isInRole('beer_manager'))
			throw BadRequestException::forbidden ('Only beer manager can add credit to user'); 
	}

	private function validatePasswordUpdate($id)
	{
		$password = $this->inputData['password'];
		$entries = array('old', 'new1', 'new2');
		$errors = [];

		try {
			if (!is_array($password))
				$errors[] = 'New password must be sent as JSON object,';
			foreach ($entries as $entry)
				if (!isset($password[$entry]))
					$errors[] = 'Missing '.$entry.' password needed to change password.';
			if (count($errors) > 0)
				throw BadRequestException::unprocessableEntity($errors, 'Insufficient entry.');

			if ($password[$entries[1]] !== $password[$entries[2]])
				$errors[] = 'Entries for newPassword1 not equal to newPassword2.';
			/*$user = $this->table->get($id);
			if (!Security\Passwords::verify($password[$entries[0]], $user->password))
				$errors[] = 'Actual password different from the given one.';*/
			if (count($errors) > 0)
				throw BadRequestException::unprocessableEntity($errors, 'Probably typing error.');

			$this->validateNewPassword($password[$entries[1]]);
			$this->inputData['password'] = Security\Passwords::hash($password[$entries[1]]);
		} catch (BadRequestException $ex) {
			$this->sendErrorResource($ex);
		}
	}


	private function validateNewPassword($password)
	{
		try {
			Security\Passwords::validateNew($password);
			return true;
		} catch (Nette\UnexpectedValueException $ex) {
			throw BadRequestException::unprocessableEntity(
					array($ex->getMessage), 'Bad format of new password.');
		}
	}
	

	public function actionCreate()
	{
		$this->inputData['password'] = Security\Passwords::hash($this->inputData['password']);
		$this->inputData['role'] = self::$roles[0];
		if (isset($this->inputData['phone']))
			self::normalizePhone ($this->inputData['phone']);	

		parent::actionCreate();
	}


	public function actionUpdate($id)
	{
		unset($this->inputData['balance'], $this->inputData['role']);
		if (isset($this->inputData['phone']))
			self::normalizePhone ($this->inputData['phone']);
		if (!empty($this->inputData['password'])) {
			$this->validatePasswordUpdate($id);
		} else {
			unset($this->inputData['password']);
		}		

		parent::actionUpdate($id);
	}



	public function actionRead($id)
	{
		if ($id === NULL)
			$this->table
					->select('user.*, NULL AS password, MAX(:consumption.date_add) AS last_tap')
					->group('user.name');

		parent::actionRead($id);
	}


	public function actionReadCredit($relationId)
	{
		$localTable = clone $this->table;
		$this->metadata['total_plus'] = $localTable->where('amount > 0')->sum('amount');
		$localTable = clone $this->table;
		$this->metadata['total_minus'] = $localTable->where('amount < 0')->sum('amount');

		$this->table->order('id DESC');
		$this->deepListing = array('keg' => array('beer' => array('brewery')));

		parent::actionRead($relationId);
	}


	public function actionReadConsumption($relationId)
	{
		$this->metadata['total_overall'] = $this->table->sum('volume');
		$thisYear = date('Y').'-01-01T00:00:00';
		$localTable = clone $this->table;
		$this->metadata['total_this_year'] = $localTable
				->where('date_add >= ?', $thisYear)
				->sum('volume');

		$this->table->order('id DESC');
		$this->deepListing = array('keg' => array('beer' => array('brewery')));

		parent::actionRead($relationId);
	}


	public function actionCreateCredit($id)
	{
		$this->inputData['user'] = $id;
		try {
			$this->db->beginTransaction();
			$updateQuery = 'UPDATE `user` SET `balance` = `balance` + ? WHERE `id` = ?';
			$this->db->query($updateQuery, $this->inputData['amount'], $id);
			parent::actionCreate();
		} catch (\Nette\Application\AbortException $ex) {
			$this->db->commit();
			throw $ex;
		} catch (\Exception $ex) {
			$this->db->rollback();
		}
	}
}
