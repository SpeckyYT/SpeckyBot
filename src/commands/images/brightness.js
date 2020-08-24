module.exports = {
    name: "brightness",
    description: "Changes the brightness of the image!",
    usage: `[Amount (-100 - 100)]`,
    category: `images`,
    aliases: []
}

module.exports.run = async (bot, msg) => {
    if(msg.Args) msg.Args[0] = Number(msg.Args[0]) / 100;
    return require('.\\functions\\methods')(bot, msg,'brightness',false,[0.5,-1,1],"png");
}
