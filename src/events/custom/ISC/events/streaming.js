module.exports = {
    event: ['presenceUpdate','* * * * *']
}

module.exports.run = (bot,oldPresence,newPresence) => {
    if(newPresence){
        checkStreaming(bot,newPresence);
    }else{
        bot.users.cache.forEach(user => checkStreaming(bot,user.presence))
    }
}

const checkStreaming = (bot,presence) => {
    const isStreaming = presence.activities.some(act => act.type == 'STREAMING');
    let { streaming } = bot.cache;
    if(isStreaming && !streaming.includes(presence.userID)){
        streaming.push(presence.userID);
        bot.emit('streamingStart',presence);
    }
    if(!isStreaming && streaming.includes(presence.userID)){
        streaming = streaming.filter(id => id == presence.userID);
        bot.emit('streamingStop',presence);
    }
}
