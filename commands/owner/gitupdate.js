const git = require('nodegit')

module.exports.run = async () => {
    git.clone("https://github.com/SpeckyYT/SpeckyBot", "../../")
	
	
}

module.exports.config = {
    name: "gitupdate",
	description: "The bot will update itself to the newest stand!",
    usage: ``,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["gu"]
}
