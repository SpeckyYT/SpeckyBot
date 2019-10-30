const { Client, Collection } = require("discord.js");
const bot = new Client();
["commands","aliases"].forEach(x => bot[x] = new Collection());
["console", "commands", "events"].forEach(x => require(`./handlers/${x}`)(bot));
const { token, prefix, owner } = require("../config.json"); 		//remove one dot if you h
try{bot.login(token)}catch(e){console.log("Error occourred on logging in");process.exit()}
console.log(prefix);