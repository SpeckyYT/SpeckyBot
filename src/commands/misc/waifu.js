module.exports = {
    name: "waifu",
    description: "Gives you a waifu!",
    category: 'misc',
    aliases: ['w']
}

module.exports.run = async (bot, msg) => {
    const session = await (new (await import('waifusocket')).default()).login();
    const waifu = [];
    for(let i=0;i<16;i++) waifu.push(Math.floor(Math.random()*2**32));
    waifu.push(0,[0,0,0]);
    const waifuBig = (await session.genBig(waifu)).image;
    return msg.channel.send(waifuBig.toAttachment('waifu.png'));
}
