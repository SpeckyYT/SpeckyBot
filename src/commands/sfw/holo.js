module.exports = {
    name: "holo",
    description: "Gives you a holo!",
    category: "sfw",
    flags: ["sfw"]
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    if(require('.\\functions\\sfw')(msg)){
        // SFW
        require(join(__dirname,'functions','img'))('holo', msg)
    }else{
        // NSFW
        require(join(process.cwd(),'commands','nsfw','functions','img'))(["holo","holoEro"], msg);
    }
}

