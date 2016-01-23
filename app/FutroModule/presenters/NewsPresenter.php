<?php

namespace App\FutroModule\Presenters;

use Nette,	
	App\Model\Email,
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
		
		if (!empty($this->inputData['send_mail'])) {
			unset($this->inputData['send_mail']);
			$this->sendMail(TRUE);		
		}
		
		parent::actionUpdate($id);
	}
	
	
	public function actionRead($id)
	{
		if ($id === NULL)
			$this->table->where('date_end IS NULL OR date_end > SUBTIME(NOW(), "24:00:00")');
		
		parent::actionRead($id);
	}
	
	
	private function sendMail($update = FALSE)
	{
		$users = $this->db->table('user')->fetchAll();
		$signature = "\n\n<em>&mdash; ".$users[$this->user->getId()]['name'].'</em>';
		$subject = ($update ? 'AKTUALIZACE: ' : '').$this->inputData['title'];
		if ($this->inputData['date_end'] instanceof DateTime)
			$subject .= ' [konání '.$this->inputData['date_end']->format('d.m.Y H:i:s').']';

		$mail = new Email;
		$mail->setSubject($subject)
				->setFrom(Email::LOCAL_ADDRESS)
				->setHTMLBody($this->inputData['body'].$signature);
		foreach ($users as $user) {
			$mail->addReplyTo($user['email'], $user['name']);
			/* $mail->addTo($user['email'], $user['name']); */
		}
		$mail->addTo('novotnyw@gmail.com');
		$mail->send();
	}


}
