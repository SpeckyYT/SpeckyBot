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


fs.readdir("./cmds/utilities/", (err, files) => {
	console.log("Utilities loading");
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js")
	if(jsfiles.lenght <= 0){
		console.log("No commands to load!");
		return;
	}
	console.log(`Loading ${jsfiles.lenght} commands!`)

	jsfiles.forEach((f,i) => {
		let props = require(`./cmds/utilities/${f}`)
		console.log(`${i+1}: ${f} loaded!`)
		bot.commands.set(props.help.name,props);
	});
});

fs.readdir("./cmds/music/", (err, files) => {
	console.log("Music loading");
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js")
	if(jsfiles.lenght <= 0){
		console.log("No commands to load!");
		return;
	}
	console.log(`Loading ${jsfiles.lenght} commands!`)

	jsfiles.forEach((f,i) => {
		let props = require(`./cmds/music/${f}`)
		console.log(`${i+1}: ${f} loaded!`)
		bot.commands.set(props.help.name,props);
	});
});

fs.readdir("./cmds/misc/", (err, files) => {
	console.log("Misc loading");
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js")
	if(jsfiles.lenght <= 0){
		console.log("No commands to load!");
		return;
	}
	console.log(`Loading ${jsfiles.lenght} commands!`)

	jsfiles.forEach((f,i) => {
		let props = require(`./cmds/misc/${f}`)
		console.log(`${i+1}: ${f} loaded!`)
		bot.commands.set(props.help.name,props);
	});
});

fs.readdir("./cmds/games/", (err, files) => {
	console.log("Games loading");
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js")
	if(jsfiles.lenght <= 0){
		console.log("No commands to load!");
		return;
	}
	console.log(`Loading ${jsfiles.lenght} commands!`)

	jsfiles.forEach((f,i) => {
		let props = require(`./cmds/games/${f}`)
		console.log(`${i+1}: ${f} loaded!`)
		bot.commands.set(props.help.name,props);
	});
});

bot.login(config.token);

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async msg => {
	if (!msg.content.startsWith(prefix) || msg.author.bot || msg.channel.type === "dm") return;

	let args = msg.content.toLowerCase().split(" ");
	let command = args[0];
	args = args.slice(1);

	let cmd = bot.commands.get(command.slice(prefix.length));
	if(cmd){
		console.log(`${command.toUpperCase().slice(prefix.length)}: actived by ${msg.author.username} (${msg.author.id})`);
		cmd.run(bot, msg, args);
		return;
	}else{
	msg.reply("we didn't find the commad you were looking for. Sowwy UwU");
	}

	//MUSIC
	if(command === `${prefix}play`){
		console.log(`Play: actived by ${msg.author.username} (${msg.author.id})`);
		var voiceChannel = msg.member.voiceChannel;
		var connection = voiceChannel.join();
		const dispatcher = await connection.playFile(`./mp3/${args[0]}.mp3`)
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

/*
	if(command === `${prefix}ban`){
		console.log(`Ban: actived by ${msg.author.username} (${msg.author.id})`);
		msg.channel.send("ok :(");
		msg.guild.leave();
		console.log(`Ban: Left ${msg.guild.name} (${msg.guild.id})`)

		msg.channel.send("You don't have ban members permission.")
		return;
	}
*/
});
