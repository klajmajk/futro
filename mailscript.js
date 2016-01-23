#!/usr/bin/env node

'use strict'

var _DB,
	_LOCAL_DOMAIN = 'kumpani.net'

var MailParser = require('mailparser').MailParser,
    mailparser = new MailParser(),
	nodemailer = require('nodemailer'),
	sendmailTransport = require('nodemailer-sendmail-transport'),
	transporter = nodemailer.createTransport(sendmailTransport({
		path: '/usr/sbin/sendmail -t'
	})),
	neon = require('neon-js'),
	mysql = require('mysql'),
	fs = require('fs'),
	toAscii = require('diacritics').remove,
	Promise = require('bluebird')



mailparser.on('end', function(mailObject){
	getUsersFromDb().then(function(users) {
		processEmail(mailObject, users.map(function(user) {
			return {
				name: user.name,
				term: toAscii(user.name).toLowerCase(),
				address: user.email
			}
		}))
	})
})

process.stdin.resume()
process.stdin.pipe(mailparser)

function getUsersFromDb() {
	return getDatabaseConnection().then(function(db) {
		_DB = db
		return new Promise(function(resolve, reject) {
			db.query('SELECT *, NULL as `password` FROM user', function(err, rows) {
				if (err) reject(err)
				resolve(rows)
			})
		})
	})
}

function getDatabaseConnection() {
	return getDatabaseConfiguration().then(
		function(dbConfig) {
			return mysql.createConnection(dbConfig)
		})
}

function getDatabaseConfiguration() {
	return new Promise(function(resolve, reject) {
		fs.readFile(__dirname + '/app/config/config.local.neon', 'utf8', function (err, data) {
			var rRemoved = data.replace(/\r?(\n)/g, '$1')
			var config = neon.decode(rRemoved).get('database')
			var pattern = /host=([^;]+).*dbname=([^;]+)/g
			var matches = pattern.exec(config.get('dsn'))

			resolve({
				host: matches[1],
				user: config.get('user'),
				password: config.get('password'),
				database: matches[2]
			})
		});
	})
}

function processEmail(incomingEmail, users) {
	function authorizeSender(senderEmail) {
		for (var i = 0, user; user = users[i]; i++)
			if (senderEmail === user.email)
				return true
		return false
	}

	var outgoingEmail, from, domain, to, pos, localpart, pattern

	try {
		from = incomingEmail.from[0].address
		if (!authorizeSender(from))
			throw new Error('Adresa odesílatele ' + from +
				' nebyla nalezena v databázi uživatelů a proto bylo zabráněno odeslání zprávy.')

		outgoingEmail = incoming2outgoing(incomingEmail)
		outgoingEmail.to = []
		domain = '@' + _LOCAL_DOMAIN

		recipients_loop:
		for(var j = 0, recipient; recipient = incomingEmail.to[j]; j++) {
			to = recipient.address.toLowerCase()
			pos = to.indexOf(domain)
			if (pos === -1)
				continue

			localpart = to.slice(0, pos)
			switch(localpart) {
				case 'verejne':
				case 'vsichni':
					outgoingEmail.to = users
					if (localpart === 'verejne')
						outgoingEmail.replyTo = users
					break recipients_loop
				case 'test':
          outgoingEmail.from = 'test' + domain
					outgoingEmail.to = 'novotnyw@gmail.com'
					outgoingEmail.html += '<h1>list of known users:</h1><ol>'
					outgoingEmail.text += '\n\nlist of known users:'
					for(var i = 0, user; user = users[i]; i++) {
						outgoingEmail.html += '<li>' + user.name + '</li>'
						outgoingEmail.text += '\n' + user.name
					}
					outgoingEmail.html += '</ol>'
					break recipients_loop
				default:
					pattern = new RegExp('\\b' + localpart + '\\b')
					for(var i = 0, user; user = users[i]; i++)
						if (user.term.match(pattern))
							outgoingEmail.to.push(user)
			}
		}

		if(outgoingEmail.to.length === 0)
			throw new Error('Email nebyl odeslán, protože se nepodařilo najít uživatele nebo cestu' +
				' odpovídající požadovanému výrazu ' + localPart)
	} catch(err) {
		outgoingEmail.from = 'noreply@' + _LOCAL_DOMAIN
		outgoingEmail.to = incomingEmail.from
		outgoingEmail.html = '<h1>' + err.message + '</h1><br />' + outgoingEmail.html
		outgoingEmail.text = err.message + '\n\n' + outgoingEmail.text
	} finally {
		transporter.sendMail(outgoingEmail)
		_DB.destroy()
	}
}

function incoming2outgoing(incomingEmail) {
	var outgoingEmail = {headers: {}},
		validProps = [
		'from', 'to', 'cc', 'bcc', 'subject', 'references',
		'inReplyTo', 'priority', 'text', 'html', 'date', 'attachments'
	]

	for (var i = 0, prop; prop = validProps[i]; i++)
		if (incomingEmail[prop]) {
			outgoingEmail[prop] = incomingEmail[prop]
			if (incomingEmail.headers[prop])
				incomingEmail.headers[prop] = null
		}

	for (var key in incomingEmail.headers)
		if (incomingEmail.headers[key] && incomingEmail.headers.hasOwnProperty(key))
			outgoingEmail.headers[key] = incomingEmail.headers[key]

	return outgoingEmail
}

function logFile(data) {
	fs.writeFile(__dirname + '/log.txt', JSON.stringify(data, null, 4))
}
