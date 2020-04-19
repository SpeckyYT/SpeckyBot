module.exports = {
    name: "thigh",
    description: "Gives you a thigh image!",
    usage: ``,
    category: `nsfw`,
    accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')(["thigh","hthigh"],msg);
}
