module.exports = {
    event: "message"
}

module.exports.call = async (bot, msg) => {
    /*
    msg.channel.fetchWebhooks()
    .then(hooks => {
        hooks.forEach(hook => {
            if(hook.name.includes('SpeckyBot')){
                sendMSG()
                return;
            }
        })
    }).catch(() => {return})

    function sendMSG(){
        bot.guilds.forEach(guild => {
            console.log(`checking ${guild.name}`)
            guild.channels.forEach(channel => {
                if(msg.channel != channel){
                    channel.fetchWebhooks()
                    .then(hooks => {
                        console.log('hooks found')
                        hooks.forEach(hook => {
                            if(hook.name.includes('SpeckyBot')){
                                console.log('hook found')
                                hook.send(msg.content, {
                                    username: msg.username,
                                    avatarURL: msg.author.avatarURL,
                                })
                            }
                        })
                    }).catch(() => {})
                }
            })
        })
    }
    */
}
