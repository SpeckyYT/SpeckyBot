module.exports = async (bot, msg) => {
    msg.channel.fetchWebhooks()
    .then(hooks => {
        hooks.forEach(hook => {
            if(hook.name.includes('SpeckyBot')){
                sendMSG()
            }
        })
    }).catch(() => {return})

    function sendMSG(){
        bot.channels.forEach(channel => {
            if(msg.channel != channel){
                channel.fetchWebhooks()
                .then(hooks => {
                    hooks.forEach(hook => {
                        if(hook.name.includes('SpeckyBot')){
                            hook.send(msg.content, {
                                username: msg.username,
                                avatarURL: msg.author.avatarURL,
                            })
                        }
                    })
                }).catch(() => {return})
            }
        })
    }
}

module.exports.config = {
    event: "message"
}
