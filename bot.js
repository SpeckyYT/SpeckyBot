require('./handlers/generalhandler')(bot);

const { token, prefix } = require("./config.json");

bot.login(token).catch(() => {for(var i = 0; i < 100; i++)console.log(`PLEASE EDIT THE CONFIG.JSON FILE (token is incorrect or can't login to discord)`)})

console.log(`Bot prefix: ${prefix}`);
