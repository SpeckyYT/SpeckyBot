module.exports = {
    name: "hwts",
    description: "Hello World!",
    usage: '',
    category: 'helloworld',
    accessableby: "Members",
    aliases: [],
    run: async (bot, msg) => {
        msg.channel.send("`TypeScript`: Hello World!");
    }
};
