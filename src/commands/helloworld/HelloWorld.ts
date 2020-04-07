module.exports = {
    name: "hwts",
    description: "Hello World!",
    usage: '',
    category: 'helloworld',
    accessableby: "Members",
    aliases: [],
    run: async (bot:any, msg:any): Promise<void> => {
        msg.channel.send("`TypeScript`: Hello World!");
    }
}
