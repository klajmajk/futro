<?php

namespace App\Model;

use Nette,
	Nette\Mail\Message,
	Nette\Mail\SendmailMailer;

/*
 * Created for fun by Junior Kumpan DUO
 * Upper Blackbird's Society
 */

/**
 * Description of Mailer
 *
 * @author Václav Novotný <novotny.v@clav.cz>
 */
class Email extends Message
{
	
	const LOCAL_ADDRESS = 'vsichni@kumpani.net';
	
	public function send()
	{
		$mailer = new SendmailMailer;
		$mailer->send($this);
	}

}
