module.exports = {
    event: ['presenceUpdate','* * * * *']
}

module.exports.run = async (bot,oldPresence,newPresence) => {
    if(newPresence){
        checkStreaming(bot,newPresence);
    }else{
        for(const user of bot.users.cache.array()){
            await bot.async();
            if(user.presence) checkStreaming(bot,user.presence)
        }
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
