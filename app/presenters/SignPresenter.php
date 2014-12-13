<?php

namespace App\Presenters;

use Nette,
	App\Model,
	Nette\Application\UI\Form;

/**
 * Sign in/out presenters.
 */
class SignPresenter extends BasePresenter
{

	/**
	 * Sign-in form factory.
	 * @return Nette\Application\UI\Form
	 */
	protected function createComponentSignInForm()
	{
		$form = new Form;
		$form->addText('username')
				->setType('email')
				->addRule(Form::EMAIL, 'Zadaný email není platná emailová adresa.')
				->setRequired('Políčko email není vyplněné.');

		$form->addPassword('password')
				->setRequired('Políčko heslo není vyplněné');

		$form->addSubmit('enter');

		// call method signInFormSucceeded() on success
		$form->onSuccess[] = $this->signInFormSucceeded;
		return $form;
	}


	public function signInFormSucceeded($form, $values)
	{
		$this->getUser()->setExpiration('14 days', FALSE);

		try {
			$this->getUser()->login($values->username, $values->password);
			$this->redirect('Main:');
		} catch (Nette\Security\AuthenticationException $e) {
			$form->addError($e->getMessage());
		}
	}


	public function actionOut()
	{
		$this->getUser()->logout();
		$this->flashMessage('You have been signed out.');
		$this->redirect('in');
	}


}
