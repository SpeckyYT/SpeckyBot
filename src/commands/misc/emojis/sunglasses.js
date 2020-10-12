const emoji = "😎";

module.exports = {
    name: "sunglasses",
    description: emoji,
    category: "misc",
    aliases: [emoji]
}

const { join } = require('path');
const emojiImage = require(join(__dirname,'modules','image'));

module.exports.run = async (bot,msg) => {
    const image = await emojiImage(emoji);
    return msg.channel.send(image.toAttachment('emoji.png'));
}
