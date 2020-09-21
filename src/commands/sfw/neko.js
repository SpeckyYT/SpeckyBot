module.exports = {
    name: "neko",
    description: "Gives you a neko!",
    category: "sfw",
    aliases: ["nya","nyan"],
    flags: ["sfw"]
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    if(require(join(__dirname,'functions','sfw'))(msg)){
        // SFW
        require(join(__dirname,'functions','img'))(["neko","nekoGif"], msg);
    }else{
        // NSFW
        require(join(process.cwd(),'commands','nsfw','functions','img'))(["neko","nekoGif","eroNeko"], msg);
    }
}
