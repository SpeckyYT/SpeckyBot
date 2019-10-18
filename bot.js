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
path        = require('path');
http = require('http');

http.createServer(onRequest).listen(8888);

const config = require("../config.json"); //remove one dot if you h
const prefix = config.prefix;
const owner  = config.owner;

var commandslog = [[]];

console.log(prefix);

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

function onRequest(request, response){
	response.writeHead(200, {'Content-Type': 'text/plain'});
	commandslog.forEach((cmd,status,username,user,channel,server)=>{
		response.write(`${cmd[0]} ${status} ${username} ${user} ${channel} ${server}\n`);
	});
	response.end();
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
		console.log(`${command.toUpperCase().slice(prefix.length)}: actived by ${msg.author.username} (${msg.author.id}, ${msg.channel.id}, ${msg.guild.id})`);
//		var pushcmd = {"command": cmd, "status": "acceptet", "username": msg.author.tag, "user": msg.author.id, "channel": msg.channel.id, "server": msg.guild.id};
		cmd.run(bot, msg, args, owner, prefix);
	}else{
	console.log(`${command.toUpperCase().slice(prefix.length)}: (REJECTED) actived by ${msg.author.username} (${msg.author.id})`);
//	var pushcmd = {"command": command, "status": "rejected", "username": msg.author.tag, "user": msg.author.id, "channel": msg.channel.id, "server": msg.guild.id};
	msg.reply("we didn't find the commad you were looking for. Sowwy UwU");
	}
//	commandslog.push(pushcmd.parse());
});

let prompt = process.openStdin();
prompt.addListener("data", res => {
	channel = fs.readFileSync("../cnscnl.txt");
	let result = res.toString().trim().split(/ +/g);
	bot.channels.get(`${channel}`).send(result.join(" "));
});

bot.login(config.token);