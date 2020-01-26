//users limiter
const limited = ["412286501528010764"]

module.exports = async (bot, memberold, membernew) => {
    //users limiter
    if(!limited.includes(membernew.id)) return;

    let nick = membernew.nickname.toLowerCase();

    if(nick.includes('owner') && !nick.includes('co-owner')){
        membernew.setNickname("[Co-Owner] JaKlaro").catch()
    }
}

module.exports.config = {
    event: "guildMemberUpdate"
}

