module.exports = {
    event: "message"
}

module.exports.call = async (bot, msg) => {
    if(bot.config.prefix.match(/^[a-zA-Z0-9]*$/g)) return;
    if(!msg.content.startsWith(bot.config.prefix)){
        const length = bot.config.prefix.length + [...bot.config.prefix].filter(v => v.match(/\[^0-9a-zA-Z]/g)).length;
        const regex = /(?<![^\\]\\)\\(?=[^\da-zA-Z\\])|(?<!\\)\\(?=\\)/g;
        const content = msg.content.slice(0,length+1);
        if(content.replace(regex,'') == bot.config.prefix){
            const emoji = ['clownglasses','fratm','stress1','stress2'].pick();
            const id = bot.emotes[emoji].id();
            if(!id) return;
            return msg.react(id).catch(()=>{});
        }
    }
}
