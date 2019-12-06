module.exports = async (bot, msg) => {
    if(msg.author.id == bot.user.id) return;
    let s = 0;
    ["538028973058424832"
    ,"334362123293425676"
    ,"592412978138054688"]
    .forEach(server => {
        if(msg.guild.id == server){
            s++
        }
    })
    if(s > 0){
        return true;
    }else{
        return false;
    }
}