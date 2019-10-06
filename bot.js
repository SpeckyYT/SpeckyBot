const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require('fs');
const util = require('util');

const config = require("../config.json"); //remove one dot if you h
const prefix = config.prefix;

console.log(prefix);
/*
fs.readdir("./cmds/", (err, files) => {
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js")
	if(jsfiles.lenght <= 0){
		console.log("No commands to load!");
		return;
	}
	console.log(`Loading ${jsfiles.lenght} commands!`)

	jsfiles.forEach((f,i) => {
		let props = require(`./cmds/${f}`)
		console.log(`${i+1}: ${f} loaded!`)
//		bot.commands.set(props.help.name,props);
	});
});
*/

bot.login(config.token);

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async msg => {
	if(msg.author.bot) return;
	if(msg.channel.type === "dm") return;

	let args = msg.content.split(" ");
	let command = args[0];
	args = args.slice(1);

	if(!msg.content.startsWith(prefix)) return;
/*
	let cmd = bot.commands.get(command.slice(prefix.lenght))
	if(cmd) cmd.run(bot, message, args)
*/
	if(command === `${prefix}help`){
		console.log(`Help: actived by ${msg.author.username} (${msg.author.id})`);
		let embed = new Discord.RichEmbed()
			.setAuthor(msg.author.username)
			.setDescription("This is the help page!")
			.setColor("#000000")
			.addField("Commands", `userinfo | serverinfo | ban`);
		msg.channel.send(embed);
	}

	if(command === `${prefix}userinfo`){
		console.log(`Userinfo: actived by ${msg.author.username} (${msg.author.id})`);
		let embed = new Discord.RichEmbed()
			.setAuthor(msg.author.username)
			.setDescription("This is your user profile!")
			.setColor("#284890")
			.addField("Full Username", `${msg.author.username}#${msg.author.discriminator}`)
			.addField("ID", `${msg.author.id}`)
			.addField("Created at", `${msg.author.createdAt}`);
		msg.channel.send(embed);

		return;
	}

	if(command === `${prefix}serverinfo`){
		console.log(`Server: actived by ${msg.author.username} (${msg.author.id})`);
		let embed = new Discord.RichEmbed()
			.setAuthor(msg.author.username)
			.setDescription("These are the informations about the server you're in!")
			.setColor("#420FF")
			.addField("Server name", `${msg.guild.name}`)
			.addField("Owner", `${msg.guild.owner} (${msg.guild.ownerID})`)
			.addField("Created at", `${msg.guild.createdAt}`);
		msg.channel.send(embed);

		return;
	}

	if(command === `${prefix}ban`){
		console.log(`Ban: actived by ${msg.author.username} (${msg.author.id})`);

		msg.channel.send("ok :(");
		msg.guild.leave();
		console.log(`Left ${msg.guild.name} (${msg.guild.id})`)
		
		return;
	}

});