<?php

namespace App\ApiModule\Presenters;

use Nette\Security,
	Drahak\Restful\Application\BadRequestException;

/**
 * CRUD resource presenter
 * @package ResourcesModule
 * @author Václav Novotný
 */
class UserPresenter extends BasePresenter
{

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
		if (!empty($this->inputData['password'])) {
			$this->validatePasswordUpdate($id);
		} else {
			unset($this->inputData['password']);
		}
		unset($this->inputData['balance'],
				$this->inputData['role']);

		parent::actionUpdate($id);
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
			
			Security\Passwords::validateNew($password[$entries[1]]);
			$this->inputData['password'] = $this->generatePasswordHash($password[$entries[1]]);
		} catch (BadRequestException $ex) {
			$this->sendErrorResource($ex);
		} catch (Nette\UnexpectedValueException $ex) {
			$this->sendErrorResource(BadRequestException::unprocessableEntity(
					array($ex->getMessage(), 'Bad format for new password.')));
		}
	}


	private function generatePasswordHash($password) {
		return Security\Passwords::hash($password);
	}
}
