module.exports = {
    name: "neko",
	description: "Gives you a neko!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: ["nya","nyan"]
}

module.exports.run = async (bot, msg) => {
    if(require('./functions/nsfw')(msg)){
        //SFW
        require('./functions/img')(["neko","nekoGif"].pick(), msg);
    }else{
        //NSFW
        require('../nsfw/functions/img')(["neko","nekoGif","eroNeko"].pick(), msg);
    }
}
