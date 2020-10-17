module.exports = {
    event: "message",
    call: (bot, msg) => msg.content.includes("😎") ? msg.react(bot.emotes.songlosses.id()).catch(()=>{}) : null
}
