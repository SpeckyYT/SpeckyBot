module.exports = 
    event: "globalMessageDelete"
    call: (bot, msg) ->
        am = bot.cache.globalchat.get msg.id
        Promise.all (ms.delete().catch(=>) for ms in am)
        bot.cache.globalchat.delete msg.id

