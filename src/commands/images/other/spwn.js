module.exports = {
    name: 'spwn',
    description: "Adds a SPWNsexual flag around your avatar!",
    category: "images",
    type: 'send',
    aliases: [],
}

const spwnCircle = "https://media.discordapp.net/attachments/791323294796087308/922853410825461800/Untitled_2.png"
global.modules.saveAsset(spwnCircle, 'spwncircle.png');

const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (bot, msg) => {
    const userID = await bot.users.fetch(
        msg.ids.length > 0 ?
            msg.ids[0] :
            msg.author.id
    ).catch(() => null);

    if(!userID) return "Couldn't find that user!";

    const avatarURL = userID.displayAvatarURL({
        dynamic: false,
        format: 'png',
        size: 4096,
    })

    const avatar = await Canvas.loadImage(avatarURL);

    const canvas = Canvas.createCanvas(avatar.width, avatar.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(avatar, 0, 0) // avatar
    ctx.drawImage(
        await canvas.loadImage(global.assets.spwncircle, {}),
        0, 0,
        avatar.width, avatar.height
    )

    return new MessageAttachment(canvas.toBuffer('image/png'), `${userID}.png`);
}
