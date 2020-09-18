module.exports = {
    name: "holo",
    description: "Gives you a holo!",
    category: "sfw",
    flags: ["sfw"]
}

module.exports.run = async (bot, msg) => {
    if(require('.\\functions\\sfw')(msg)){
        // SFW
        require('.\\functions\\img')('holo', msg)
    }else{
        // NSFW
        require('..\\nsfw\\functions\\img')(["holo","holoEro"], msg);
    }
}

