//channel limiter
const limited = ["643548931007184906"]

module.exports = async (bot, msg) => {
    //channel limiter
    if(!limited.includes(msg.channel.id)) return;

    if(msg.author.bot && msg.author.id != bot.user.id) return msg.delete();

    let regex = /\d{7,10}/g

    if(msg.content.match(regex)){
        if(msg.content.length > 100){
            msg.channel.send("You exceed the massage length of 100 letters.\nYour message will be deleted in 15 seconds.")
            .then(ms => {
                try{
                    ms.delete(15000)
                }catch{}
            })
            try{
                msg.delete(15000)
            }catch{}
        }else{
            return;
        }
    }else{
        try{
            msg.delete()
        }catch{}
    }
}

module.exports.config = {
    event: "message"
}
