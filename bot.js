//Discord.js stuff
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

//other stuff
const util = require('util');
const ytdl = require('ytdl-core');
const ytdlDiscord = require('ytdl-core-discord');
fs          = require('fs');
request     = require('request');
path        = require('path')

const config = require("../config.json"); //remove one dot if you h
const prefix = config.prefix;
const owner  = config.owner;

console.log(prefix);

bot.login(config.token);

function loadCommands(folder){
	fs.readdir(`./cmds/${folder}/`, (err, files) => {
		if(err) console.error(err);
		let jsfiles = files.filter(f => f.split(".").pop() === "js")
		if(jsfiles.length <= 0){
			console.log("No commands to load!");
			return;
		}
		console.log(``)
		console.log(`Loading ${jsfiles.length} ${folder.toUpperCase()} commands!`)
		jsfiles.forEach((f,i) => {
			let props = require(`./cmds/${folder}/${f}`)
			console.log(`${i+1}: ${f} loaded!`)
			bot.commands.set(props.config.name, props);
			props.config.aliases.forEach((alias) =>{
				bot.aliases.set(alias, props.config.name);
			});
		});
	});
}

bot.on('ready', () => {
  	console.log(`Logged in as ${bot.user.tag}!`);
	const folders = ["utilities", "music", "misc", "games", "admin","owner"];
	folders.forEach(fold => {loadCommands(fold)});
});

bot.on('message', async msg => {
	if (!msg.content.toLowerCase().startsWith(prefix) || msg.author.bot || msg.channel.type === "dm") return;

	let args = msg.content.toLowerCase().split(" ");
	let command = args[0];
	args = args.slice(1);

	let cmd = bot.commands.get(command.slice(prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(prefix.length)));
	if(cmd){
		console.log(`${command.toUpperCase().slice(prefix.length)}: actived by ${msg.author.username} (${msg.author.id})`);
		cmd.run(bot, msg, args, owner, prefix);
		return;
	}else{
	msg.reply("we didn't find the commad you were looking for. Sowwy UwU");
	}
});
