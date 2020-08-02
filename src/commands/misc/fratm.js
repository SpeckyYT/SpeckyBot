module.exports = {
    name: "fratm",
    description: "Man 🐴",
    category: "misc",
    type: "template"
}

module.exports.run = async (bot, msg) => `${bot.emojis.find(e=>e.name=="fratm")}🤝🐴`
