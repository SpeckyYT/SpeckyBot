//Discord.js stuff
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

//other stuff
const util = require('util');
const ytdl = require('ytdl-core');
const ytdlDiscord = require('ytdl-core-discord');
const dominantcolorsJs = require("dominantcolors.js");

fs          = require('fs');
request     = require('request');
path        = require('path');
fetch		= require('node-fetch');
url 		= require('url');
http 		= require('http');

http.createServer(onRequest).listen(8888);

const config = require("../config.json"); 		//remove one dot if you h
const emb = require("../msgtoembed.json");		//remove one dot if you h
const mcservers = require("../mcservers.json"); //remove one dot if you h
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

const folders = ["utilities", "music", "misc", "games", "admin","owner"];
folders.forEach(fold => {loadCommands(fold)});

function onRequest(request, response){
	response.writeHead(200, {'Content-Type': 'text/plain'});
	commandslog.forEach((cmd,status,username,user,channel,server)=>{
		response.write(`${cmd[0]} ${status} ${username} ${user} ${channel} ${server}\n`);
	});
	response.end();
}

bot.login(config.token);

bot.on('ready', () => {
  	console.log(`Logged in as ${bot.user.tag}!`);
});

try{
	var interval = setInterval(function(){
			try{
				var link = `https://mcapi.us/server/status?ip=${mcservers[msg.guild.id]}&port=25565`;
				const response = fetch(link);
				const data = response.json();
				const {status, online, motd, error, players} = data;
			}catch(e){
			}
	}, 1 * 1000);
}catch(e){

}

bot.on('message', async msg => {
	if (msg.author.bot || msg.channel.type === "dm") return;
	if(msg.channel.id == emb[msg.guild.id].channel){
		try{
			color = dominantcolorsJs(`${url(msg.author.avatarURL)}`, {
				count: 2,
				colorFormat: "hex" // hex or rgb
			});
		}catch(e){
//			console.log(e);
		}
		try{
			const embed = new Discord.RichEmbed()
				.setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
				.setDescription(`${msg.content}`)
				.setColor('#000000');
			msg.channel.send(embed);
		}catch(e){
			return;
		}
		msg.delete();
	}
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

/*
bot.on('guildDelete', guild => {
	guild.systemChannel.id.send("Bye bye members of this server!")
});
*/