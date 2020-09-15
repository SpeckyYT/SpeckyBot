module.exports = {
    name: "hwjs",
    description: "Hello World!",
    category: 'helloworld',
    run: async (bot, msg) => {
        await msg.channel.send("`JavaScript`: Hello World!");
    }
}
