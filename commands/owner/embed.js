const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg, args, owner, prefix) => {
    msg.delete();
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
                .setTimestamp()
                .setFooter(`${msg.guild.name}`, msg.guild.iconURL);
            ms.edit(embed);
        })
        break
        case "gdv":
            let vgdvmsg = '643187248111812620';
            msg.channel.fetchMessage(vgdvmsg).then(ms => {
                let embed = new RichEmbed()
                    .setColor('#8800ff')
                    .setTitle(`How to verify yourself!`)
                    .setThumbnail(msg.guild.imageURL)
                    .setDescription(":flag_gb: Click on the reaction below!\n:flag_it: Premi sulla reazione qui sotto!\n:flag_de: Klick auf die Reaktion hier unter!\n:flag_es: Premios en la reacción de abajo!\n:flag_fr: Cliquez sur la réaction ci-dessous!")
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