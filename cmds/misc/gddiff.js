let {getDiffImg} = require('gdprofiles');
const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
    const bmsg = msg.channel.send("Generating difficulty image...");
/*
    if(!args[0]) return console.log("0");;
    console.log("1");
    if(!args[0].isInteger) return;
    console.log("2");
    if(!args[1]) return;
    console.log("3");
    if(!args[2]) return;
    console.log("4");
*/

    const diffNum = args[0];
    const featured = args[1];
    const epic = args[2];
    //https://gdicon.net/icons/difficulty_09_featured.png

    const rate = 'didnt work'; 
    const link = 'bruh';

    if(featured = true){
        rate = '_featured';
    }else if(epic = true){
        rate = '_epic';
    }else{
        rate = '';
    }

    link = `gdicon.net/icons/difficulty_${diffNum.padStart(2, "0")}`

    console.log(attachment);
    msg.channel.send("hewwo UwU");
    msg.channel.send();
    msg.channel.send(attachment);
    bmsg.delete();
}

module.exports.help = {
    name: "gddiff"
}
