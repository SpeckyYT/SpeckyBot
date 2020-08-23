module.exports = {
    name: "kemonomimi",
    description: "Gives you a kemonomimi!",
    usage: "",
    category: `sfw`,
    aliases: ['kemo','kemono','kemonomi'],
    flags: ["sfw"]
}

module.exports.run = async (bot, msg) => {
    if(require('.\\functions\\sfw')(msg)){
        // SFW
        require('.\\functions\\img')('kemonomimi', msg);
    }else{
        // NSFW
        require('..\\nsfw\\functions\\img')(["kemonomimi","eroKemonomimi"], msg);
    }
}
