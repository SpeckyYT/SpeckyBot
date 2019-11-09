const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg, args, owner, prefix) => {
    if(!(msg.author.id === owner)){
        msg.channel.send("You aren't my owner.");
        return;
    }
    switch(args[0]){
        case "gdi":
        case "gdas":
        let vgdimsg = '642040799722340380';
        msg.channel.fetchMessage(vgdimsg).then(ms => {
            let embed = new RichEmbed()
                .setColor('#8800ff')
                .setAuthor(`Roles Selection Menu!`)
                .setThumbnail(msg.guild.imageURL)
                .setDescription(":flag_gb: Click the reaction if you speak English!\n:flag_it: Premi sulla reazione se parli Italiano!\n:flag_de: Klick auf die Reaktion wenn du Deutsch sprichst!\n:flag_es: Premios en la reacción si hablas Español!\n:flag_fr: Cliquez sur la réaction si vous parlez Français!")
                .addBlankField()
                .setTimestamp()
                .setFooter(`${msg.guild.name}`, msg.guild.iconURL);
            ms.edit(embed);
        })
        break
        case "rp":
            let vrpmsg = '642077484254232579';
            msg.channel.fetchMessage(vrpmsg).then(ms => {
                let embed = new RichEmbed()
                    .setColor('#00ff00')
                    .setAuthor(`Roles Menu!`)
                    .setThumbnail(msg.guild.imageURL)
                    .setDescription("Click <:rp:642076851606388756> to get \"Casual Player\" role!\nClick <:rpcla:642076774368542753> to get \"Speedrunner\" role!")
                    .addBlankField()
                    .setTimestamp()
                    .setFooter(`${msg.guild.name}`, msg.guild.iconURL);
                ms.edit(embed);
            })
            break
    }
    msg.delete();
}

module.exports.config = {
    name: "embed",
	description: "What about an embed?",
    usage: ``,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["emb"]
}