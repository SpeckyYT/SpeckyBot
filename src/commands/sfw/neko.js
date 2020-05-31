module.exports = {
    name: "neko",
    description: "Gives you a neko!",
    usage: ``,
    category: `sfw`,
    accessableby: "Members",
    aliases: ["nya","nyan"],
    flags: ["sfw"]
}

module.exports.run = async (bot, msg) => {
    if(require('./functions/sfw')(msg)){
        //SFW
        require('./functions/img')(["neko","nekoGif"], msg);
    }else{
        //NSFW
        require('../nsfw/functions/img')(["neko","nekoGif","eroNeko"], msg);
    }
}
