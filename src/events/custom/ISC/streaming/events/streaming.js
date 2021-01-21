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
    if(isStreaming && !bot.cache.streaming.includes(presence.userID)){
        bot.cache.streaming.push(presence.userID);
        bot.emit('streamingStart',presence);
    }
    if(!isStreaming && bot.cache.streaming.includes(presence.userID)){
        bot.cache.streaming = bot.cache.streaming.filter(id => id != presence.userID);
        bot.emit('streamingStop',presence);
    }
}
