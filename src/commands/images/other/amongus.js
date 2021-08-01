module.exports = {
    name: 'amongus',
    description: "Gives a random amongus!",
    category: "images",
    aliases: ['amogus','mogus','mongus']
}

const amongsprite = require('amongsprite');
const random = obj => Object.values(obj).pick();

module.exports.run = async (bot, msg) => {
    while(true){
        try {
            const amongus = await amongsprite.create(
                600,
                random(amongsprite.Types.COLORS),
                random(amongsprite.Types.BG),
                random(amongsprite.Types.HATS),
                random(amongsprite.Types.OUTFITS),
                random(amongsprite.Types.PETS),
            )
            return msg.channel.send(amongus.toBuffer().toAttachment('amongus.png'));
        } catch (err) {}
    }
}
