module.exports = {
    event: "guildMemberUpdate"
}


//users limiter
const limited = ["412286501528010764"]

module.exports.call = async (bot, memberold, membernew) => {
    //users limiter
    if(!limited.includes(membernew.id)) return;

    let onick = membernew.nickname;
    let nick = membernew.nickname.toLowerCase();

    if(nick.includes('owner') && !nick.includes('co-owner')){
        membernew.setNickname(onick.replace(/owner/ig,"Co-Owner")).catch()
    }
}
