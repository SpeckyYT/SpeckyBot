module.exports = {
    name: "hwjs",
    description: "Hello World!",
    usage: '',
    category: 'helloworld',
    aliases: [],
    run: async (bot, msg) => {
        await msg.channel.send("`JavaScript`: Hello World!");
    }
}
