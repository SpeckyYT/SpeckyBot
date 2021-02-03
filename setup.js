const inquirer = require('inquirer');
const fs = require('fs');

const prompts = [
	{
		type: 'input',
		name: 'prefix',
		message: 'Please enter your bot Prefix',
	},
	{
		type: 'password',
		name: 'token',
		message: 'Please enter the bot token from the application page.',
	},
	{
		type: 'number',
		name: 'owner',
		message: 'Please enter the Bot Owner User ID. Only one ID is accepted currently, to avoid abuse',
	},
];

inquirer.prompt(prompts).then((answers) => {
	const replies = (JSON.stringify(answers, null, ' '));
	fs.appendFile('config.json', replies, function(err) {
		if (err) {
			throw err;
		}
		console.log('Created a config.json for you :)');
	});
});
