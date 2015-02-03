<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use Nette\Security;

/**
 * Description of authenticator
 *
 * @author novot_000
 */
class Authenticator extends Nette\Object implements Security\IAuthenticator
{	
	public $db;
	public $acl;
	
	public function __construct(Nette\Database\Context $db, Security\Permission $acl)
	{
		$this->db = $db;
		$this->acl = $acl;
	}
	
	public function authenticate(array $credentials)
	{
		list($username, $password) = $credentials;
		$user = $this->db->table('user')->where('email', $username)->fetch();
		
		if (!$user)
			throw new Security\AuthenticationException('User not found.', self::IDENTITY_NOT_FOUND);
		
		if (!Security\Passwords::verify($password, $user->password))
			throw new Nette\Security\AuthenticationException('Invalid password.', self::INVALID_CREDENTIAL);
		
		$roles = $this->getEffectiveRoles($user->role);
		
		return new Security\Identity($user->id, $roles);
	}
	
	public function getEffectiveRoles($role)
	{
		$roles = array($role => TRUE);
		foreach($this->acl->getRoleParents($role) as $parent)
			$roles += array_flip($this->getEffectiveRoles($parent));
						
		return array_keys($roles);
	}
}
