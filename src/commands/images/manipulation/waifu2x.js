module.exports = {
    name: "waifu2x",
    description: "Doubles the resolution of the image using AI!",
    category: "images"
}

const { MessageAttachment } = require('discord.js');

module.exports.run = async (bot, msg) => {
    const image = bot.cache.lastImage[msg.channel.id];
    if(image == undefined) return bot.cmdError("No image found");

    const deepai = require('deepai');
    deepai.setApiKey('quickstart-QUdJIGlzIGNvbWluZy4uLi4K');

    const mg = msg.channel.send('Generating your image...');

    const resp = await deepai.callStandardApi("waifu2x",{image});

    return msg.channel.send(
        new MessageAttachment(resp.output_url)
    )
    .then(async m => (await mg).delete().catch(()=>{}));
}
