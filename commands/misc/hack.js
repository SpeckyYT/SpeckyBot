module.exports = {
    name: "hack",
	description: "Hacks your server!",
    usage: ``,
    category: `misc`,
	accessableby: "Members",
    aliases: ["hacked"]
}

const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg) => {
    let randomWords = ["Hacking","Status","Server","Guild","Name","Work","To-Do","Hacks","Completation","Messages","DMs","Obama's last name","We are Number One","ő̶̞ṛ̵̀a̵̭̓j̷͚̎ ̵̖͠p̸͎͊o̸͙̍l̶̖̽ȅ̷̲","Italy","Russia","USA","Jesus Christ","My mum","Corridor","Room","Hot","Girls","Boys"]
    let randomStats = ["Fulfilled","Success","Tree","Failed","Completed","Stupid","Nothing","Pending","Waiting","Completed","Created","Stopped","Satisfied","Closed","Done","Finished","Perhaps","Loaded","Linked","Returned","Rejected","Lifted","Deleted"]

    function rand(){
        return `"${randomWords[Math.floor(Math.random()*randomWords.length)]}":\t\t"${randomStats[Math.floor(Math.random()*randomStats.length)]}",`
    }

    await msg.channel.send(`\`\`\`json\n{\n\t${rand()}\n\t${rand()}\n\t${rand()}\n\t${rand()}\n\t${rand()}\n}\`\`\``)
    .then(async ms => {
        for(let i = 0; i < 4; i++){
            await bot.delay(1500);
            ms.edit(`\`\`\`json\n{\n\t${rand()}\n\t${rand()}\n\t${rand()}\n\t${rand()}\n\t${rand()}\n}\`\`\``);
        }
        await bot.delay(2500);
        await ms.delete();
    }).then(() => {
        msg.channel.send(new RichEmbed().setTitle("YOU HAVE BEEN HACKED!").setColor("#FF0000"))
    })
}
