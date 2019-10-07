//Discord.js stuff
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

//other stuff
const util = require('util');
const ytdl = require('ytdl-core');
const ytdlDiscord = require('ytdl-core-discord');
fs          = require('fs');
request     = require('request');
path        = require('path')

const config = require("../config.json"); //remove one dot if you h
const prefix = config.prefix;

console.log(prefix);


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
		bot.commands.set(props.help.name,props);
	});
});


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

	let cmd = bot.commands.get(command.slice(prefix.lenght));
	cmd.run(bot, message, args);

/*
	if(command === `${prefix}help`){
		console.log(`Help: actived by ${msg.author.username} (${msg.author.id})`);
		let embed = new Discord.RichEmbed()
			.setAuthor(msg.author.username)
			.setDescription("This is the help page!")
			.setColor("#000000")
			.addField("Information commands", `userinfo | serverinfo`)
			.addField("Voice channels commands", `join | leave | play`);
		msg.channel.send(embed);
	}

	if(command === `${prefix}userinfo`){
		console.log(`Userinfo: actived by ${msg.author.username} (${msg.author.id})`);
		let embed = new Discord.RichEmbed()
			.setAuthor(msg.author.username)
			.setDescription("This is your user profile!")
			.setColor("#284890")
			.addField("Full Username", `${msg.author.tag}`)
			.addField("ID", `${msg.author.id}`)
			.addField("Is he/she a bot?", `${msg.author.bot}`)
			.addField("Avatar", `${msg.author.displayAvatarURL}`)
			.addField("Last message", `${msg.author.lastMessage}`)
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
			.addField("Server ID", `${msg.guild.id}`)
			.addField("Server region", `${msg.guild.region}`)
			.addField("Entering channel", `${msg.guild.systemChannel}`)
			.addField("Verification level", `${msg.guild.verificationLevel}`)
			.addField("Owner", `${msg.guild.owner} (${msg.guild.ownerID})`)
			.addField("Member count", `${msg.guild.memberCount}`)
			.addField("Is the server large?", `${msg.guild.large}`)
			.addField("Created at", `${msg.guild.createdAt}`);
		msg.channel.send(embed);

		return;
	}
	
*/
/* //MUSIC
	if(command === `${prefix}join`){
		console.log(`Join: actived by ${msg.author.username} (${msg.author.id})`);
		var voiceChannel = msg.member.voiceChannel;
		var connection = await voiceChannel.join();
		voiceChannel.join()
  		.then(connection => console.log('Connected!'))
		return;
	}

	if(command === `${prefix}leave`){
		console.log(`Leave: actived by ${msg.author.username} (${msg.author.id})`);
		msg.member.voiceChannel.leave();
		return;
	}

	if(command === `${prefix}play`){
		console.log(`Play: actived by ${msg.author.username} (${msg.author.id})`);
		var voiceChannel = msg.member.voiceChannel;
		var connection = await voiceChannel.join();
		const dispatcher = connection.playFile(`./mp3/${args[0]}.mp3`)
			.on('end', () => {
				msg.channel.send("Song finished! Did you like it?");
			})
		return;
	}

	if(command === `${prefix}stop`){
		console.log(`Stop: actived by ${msg.author.username} (${msg.author.id})`);
		var voiceChannel = msg.member.voiceChannel;
		var connection = await voiceChannel.join();
		const dispatcher = connection.playFile(`./mp3/${args[0]}.mp3`);

		return;
	}

	if(command === `${prefix}earrape`){
		console.log(`Earrape: actived by ${msg.author.username} (${msg.author.id})`);
		var voiceChannel = msg.member.voiceChannel;
		var connection = await voiceChannel.join();
		const dispatcher = connection.playFile(`./mp3/${args[0]}.mp3`);
		dispatcher.setVolume(500000);
		return;
	}
*/
/*
	if(command === `${prefix}ban`){
		console.log(`Ban: actived by ${msg.author.username} (${msg.author.id})`);
		msg.channel.send("ok :(");
		msg.guild.leave();
		console.log(`Ban: Left ${msg.guild.name} (${msg.guild.id})`)

//		msg.channel.send("You don't have ban members permission.")
		return;
	}
*/
});