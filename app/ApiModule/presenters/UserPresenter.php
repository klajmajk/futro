<?php

namespace App\ApiModule\Presenters;

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
	
	public function validateCreate()
	{
		$this->input->field('name')->addRule(IValidator::REQUIRED, 'Missing required field: name.');
		$this->input->field('email')->addRule(IValidator::REQUIRED, 'Missing required field: email.');
		$this->input->field('password')->addRUle(array($this, 'validateNewPassword'), 'Bad format of new password.');
	}
	
	public function validateUpdate()
	{
		$this->input->field('email')->addRule(IValidator::EMAIL, 'Invalid email address.');
		$this->input->field('phone')->addRule(IValidator::PATTERN, 'Invalid phone number.', self::PHONE_PATTERN);
	}

	public function actionRead($id)
	{
		if ($id === NULL)
			$this->table = $this->table
					->select('user.*, NULL AS password, MAX(:consumption.date_add) AS last_tap')
					->group('user.name');

		parent::actionRead($id);
	}
	
	public function actionUpdate($id)
	{		
		unset($this->inputData['balance'],
				$this->inputData['role']);
		if (!empty($this->inputData['password'])) {
			$this->validatePasswordUpdate($id);
		} else {
			unset($this->inputData['password']);
		}

		parent::actionUpdate($id);
	}
	
	public function actionCreate()
	{
		$this->inputData['password'] = $this->generatePasswordHash($this->inputData['password']);
		$this->inputData['role'] = self::$roles[0];
		
		parent::actionCreate();
	}

	public function actionReadCredit($id)
	{
		$this->table = $this->table->get($id)->related('credit.user');
		
		parent::actionRead(null);
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
				throw BadRequestException::unprocessableEntity ($errors, 'Insufficient entry.');

			if ($password[$entries[1]] !== $password[$entries[2]])
				$errors[] = 'Entries for newPassword1 not equal to newPassword2.';
			$user = $this->table->get($id);
			if (!Security\Passwords::verify($password[$entries[0]], $user->password))
				$errors[] = 'Actual password different from the given one.';
			if (count($errors) > 0)
				throw BadRequestException::unprocessableEntity ($errors, 'Probably typing error.');
			
			$this->validateNewPassword($password[$entries[1]]);
			$this->inputData['password'] = $this->generatePasswordHash($password[$entries[1]]);
		} catch (BadRequestException $ex) {
			$this->sendErrorResource($ex);
		}
	}
	
	private function validateNewPassword($password) {
		try {
			Security\Passwords::validateNew($password);
			return true;
		} catch (Nette\UnexpectedValueException $ex) {
			throw BadRequestException::unprocessableEntity(
					array($ex->getMessage), 'Bad format of new password.');
		}
	}


	private function generatePasswordHash($password) {
		return Security\Passwords::hash($password);
	}
}
