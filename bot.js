const { Client } = require("discord.js");

const bot = new Client({autoReconnect:true}); bot.music = require("discord.js-musicbot-addon");

const mf = require('./handlers/missingfiles');
mf().then(prom => {if(prom)return});

const hh = require('./handlers/handleshandler')
hh(bot)

const { token, prefix } = require("./config.json");

bot.login(token).catch(() => {for(var i = 0; i < 100; i++)console.log(`PLEASE EDIT THE CONFIG.JSON FILE (token is incorrect or can't login to discord)`)})

console.log(`Bot prefix: ${prefix}`);