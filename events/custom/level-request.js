//channel limiter
const limited = ["643548931007184906"]

module.exports = async (bot, msg) => {
    //channel limiter
    if(!limited.includes(msg.channel.id)) return;

    if(msg.author.bot) return msg.delete();

    let min = 7;
    let max = 10;

    let regex = /\d{min,max}/g

    if(msg.content.matches(regex)){
        if(msg.content.length > 100){
            msg.channel.send("You exceed the massage length of 100 letters.\nYour message will be deleted in 15 seconds")
            .then(ms => {
                ms.delete(15000)
            })
            msg.delete(15000)
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
