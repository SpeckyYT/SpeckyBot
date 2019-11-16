const { writeFile } = require("fs");
const dir = '../../../users.json'

module.exports.run = async (bot, msg, args, config) => {
    bot.users.forEach(user => {
        var users = require(dir);
        
        users[user.id] = {
            username: user.username,
            discriminator: user.discriminator
        }
        users.sort()

        writeFile('../users.json', JSON.stringify(users, null, 4), err => {
            if(err) console.log(err);
        });
    });
    console.log('users.json got updated!')
}

module.exports.config = {
    name: "checkusers",
	description: "Saves every user in a JSON file!",
    usage: ``,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["checkuser"]
}