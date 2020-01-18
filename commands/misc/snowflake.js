const { RichEmbed, SnowflakeUtil } = require('discord.js')
const { deconstruct } = SnowflakeUtil;

module.exports.run = async (bot, msg) => {
    let snowflake = msg.Args[0];

    let { date } = deconstruct(snowflake);
    let timestamp = date;

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
    
    if(snowflake > 1056890076895641534463){
        embed.setFooter("Time isn't compatible in ISO8601 fomat...")
    }else{
        embed.setFooter("Date of the snowflake")
        embed.setTimestamp(timestamp)
    }

    let item = bot.findSnowflake(String(snowflake));

    let result = false;

    if(item){
        result = item.toString()
    }

    if(result){
        embed.addField(`Resulting snowflake`,result)
    }

    await msg.channel.send(embed).catch()
}

module.exports.config = {
    name: "snowflake",
	description: "Converts an ID into a timestamp!",
    usage: `[ID]`,
    category: `misc`,
	accessableby: "Members",
    aliases: ['sf','id']
}
