<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Security;

use Nette;

/**
 * Description of authenticator
 *
 * @author novot_000
 */
class Passwords extends Nette\Security\Passwords
{

	const PASSWORD_MIN_LENGTH = 4;


	public static function validateNew($password)
	{
		if (!preg_match('#^[\d\w\\/\*\-\+\,\(\)]*$#', $password))
			throw new Nette\UnexpectedValueException('Password shall contain only letters, '.
			'numbers, mathematic operators and special characters: /*-+,()_');

		if (strlen($password) < self::PASSWORD_MIN_LENGTH)
			throw new Nette\UnexpectedValueException('Password must be at least '.
			self::PASSWORD_MIN_LENGTH.' characters long.');
	}


}
