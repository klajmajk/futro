<?php

namespace App\ApiModule\Presenters;

use Nette,	
	Nette\Mail\Message,
	Nette\Mail\SendmailMailer,
	Nette\Utils\DateTime,
	Drahak\Restful\Validation\IValidator;

/**
 * CRUD resource presenter
 * @package ResourcesModule
 * @author Václav Novotný
 */
class NewsPresenter extends BasePresenter
{
	
	public function validateCreate()
	{
		$this->input->field('title')->addRule(IValidator::REQUIRED, 'Missing news title.');
		$this->input->field('body')->addRule(IValidator::REQUIRED, 'Missing news body.');
	}


	public function actionCreate()
	{
		$this->inputData['user'] = $this->user->getId();
		if (!empty($this->inputData['date_end']))
			$this->encapsulateInDateTime($this->inputData['date_end']);
		
		if (!empty($this->inputData['send_mail'])) {
			unset($this->inputData['send_mail']);
			$this->sendMail();			
		}		
		
		parent::actionCreate();
	}
	
	public function actionUpdate($id)
	{
		if (!empty($this->inputData['date_end']))
			$this->encapsulateInDateTime($this->inputData['date_end']);
		
		parent::actionUpdate($id);
	}
	
	
	public function actionRead($id)
	{
		if ($id === NULL)
			$this->table->where('date_end IS NULL OR date_end > SUBTIME(NOW(), "24:00:00")');
		
		parent::actionRead($id);
	}
	
	
	private function sendMail()
	{
		$users = $this->db->table('user')->fetchAll();
		$sender = $users[$this->user->getId()];
		$subject = $this->inputData['title'];
		if ($this->inputData['date_end'] instanceof DateTime)
			$subject .= ' ['.$this->inputData['date_end']->format('d.m.Y H:i:s').']';
		
		$mail = new Message;
		$mail->setFrom($sender['email'], $sender['name'])
				->setSubject($subject)
				->setHTMLBody($this->inputData['body']);
		/* foreach ($users as $user)
		  $mail->addTo($user['email'], $user['name']); */
		$mail->addTo('novotnyw@gmail.com', 'Václav Novotný');

		$mailer = new SendmailMailer;
		$mailer->send($mail);
	}


}
