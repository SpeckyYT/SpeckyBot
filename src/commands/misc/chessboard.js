module.exports = {
    name: "chessboard",
    description: "Gives you a Chess Board!",
    usage: ``,
    category: `misc`,
    accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    let posx=0,posy=0,cb="";
    while(posy<8){
        while(posx<8*2+1){
            cb+=(posx%2?(((posx+1)/2+posy)%2?' ':'#'):'|');posx++;
        }
        posx=0;cb+='\n';posy++;
    }
    return msg.channel.send("```\n"+cb+"\n```");
}
