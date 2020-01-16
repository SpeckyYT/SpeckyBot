const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg) => {
    let timestamp = Number((Number(msg.Args[0]) / 4194304) + 1420070400000);
    let timenow = new Date();

    if(isNaN(timestamp)){
        return bot.cmdError("Snowflake is not a number")
    }

    let {sec, min, hrs, day, month, year} = bot.msToVars(timestamp-timenow)

    let embed = new RichEmbed()
    .setTitle("Snowflake Timestamp")
    .setFooter("Date of the snowflake")
    .setColor("#FF00AA")
    .addField(`${timestamp < timenow ? "How long ago the snowflake was created" : "Time left for that snowflake"}`,`${bot.singPlur(year,"year")} ${bot.singPlur(month,"month")} ${bot.singPlur(day,"day")} ${bot.singPlur(hrs,"hour")} ${bot.singPlur(min,"minute")} and ${bot.singPlur(sec,"second")}`)
    .setTimestamp(timestamp);

   msg.channel.send(embed)
    .catch(() => {
        embed.setFooter("Time isn't compatible in ISO8601 fomat...")
        .setTimestamp(null);

        msg.channel.send(embed).catch()
    })
}

module.exports.config = {
    name: "snowflake",
	description: "Converts an ID into a timestamp!",
    usage: `[ID]`,
    category: `misc`,
	accessableby: "Members",
    aliases: []
}
