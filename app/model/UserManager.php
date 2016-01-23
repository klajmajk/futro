<?php

namespace App\Model;

use Nette,
	Nette\Security,
	Nette\Database,
	App\Security\Passwords;


/**
 * Users management.
 */
class UserManager extends Nette\Object implements Nette\Security\IAuthenticator
{
	const
		TABLE_NAME = 'user',
		COLUMN_ID = 'id',
		COLUMN_NAME = 'name',
		COLUMN_PASSWORD_HASH = 'password',
		COLUMN_EMAIL = 'email',
		COLUMN_ROLE = 'role';
	
	/** @var Nette\Database\Context */
	private $db;
	
	/** @var Nette\Security\Permission */
	private $acl;
	
	public function __construct(Database\Context $database, Security\Permission $acl)
	{
		$this->db = $database;
		$this->acl = $acl;
	}
	
	/**
	 * Performs an authentication.
	 * @return Nette\Security\Identity
	 * @throws Nette\Security\AuthenticationException
	 */
	public function authenticate(array $credentials)
	{
		list($username, $password) = $credentials;
		$row = $this->db->table(static::TABLE_NAME)->where(static::COLUMN_EMAIL, $username)->fetch();
		
		if (!$row)
			throw new Security\AuthenticationException('User not found.', self::IDENTITY_NOT_FOUND);
		
		if (!Passwords::verify($password, $row[static::COLUMN_PASSWORD_HASH]))
			throw new Security\AuthenticationException('Invalid password.', self::INVALID_CREDENTIAL);
		
		if (Passwords::needsRehash($row[static::COLUMN_PASSWORD_HASH]))
			$row->update(array(
				static::COLUMN_PASSWORD_HASH => Passwords::hash($password),
			));
		
		$arr = $row->toArray();
		unset($arr[static::COLUMN_ID],
				$arr[static::COLUMN_PASSWORD_HASH],
				$arr[static::COLUMN_ROLE]);
		
		return new Security\Identity($row[static::COLUMN_ID],
				$this->getEffectiveRoles($row[static::COLUMN_ROLE]),
				$arr);
	}
	
	/**
	 * Recursivelly returns current and all parent roles
	 * @param type $role
	 * @return type
	 */
	public function getEffectiveRoles($role)
	{
		$roles = array($role => TRUE);
		foreach($this->acl->getRoleParents($role) as $parent)
			$roles += array_flip($this->getEffectiveRoles($parent));
						
		return array_keys($roles);
	}
	
	/**
	 * Adds new user.
	 * @param  string
	 * @param  string
	 * @return void
	 */
	public function add($username, $email, $password)
	{
		Passwords::validateNew($password);
		try {
			$this->db->table(static::TABLE_NAME)->insert(array(
				static::COLUMN_NAME => $username,
				static::COLUMN_EMAIL => $email,
				static::COLUMN_PASSWORD_HASH => Security\Passwords::hash($password),
			));
		} catch (Database\UniqueConstraintViolationException $e) {
			throw new DuplicateNameException;
		}
	}
}

class DuplicateNameException extends \Exception
{}