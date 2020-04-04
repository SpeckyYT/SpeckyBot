module.exports = {
    name: "snowflake",
	description: "Converts an ID into a timestamp!",
    usage: `[ID] [ID]...`,
    category: `misc`,
	accessableby: "Members",
    aliases: ['sf','id']
}

const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, msg) => {
    let lsf, error;

    msg.Args.forEach(async arg => {
        let snowflake = parseInt(String(arg));

        if(isNaN(snowflake)){
            if(!error){
                error = bot.cmdError(`Snowflake \`${arg}\` is not a number`);
            }
        }else{
            let timestamp = (snowflake / 4194304) + 1420070400000;

            let timenow = new Date();

            let {sec, min, hrs, day, month, year} = bot.msToVars(timestamp - timenow);

            let skip = false;

            let embed = new RichEmbed()
            .setTitle("Snowflake Timestamp")
            .setColor("#FF00AA");

            if(year != Infinity){
                embed.addField(`${timestamp < timenow ? "How long ago the snowflake was created" : "Time left for that snowflake"}`,`${bot.singPlur(year,"year")} ${bot.singPlur(month,"month")} ${bot.singPlur(day,"day")} ${bot.singPlur(hrs,"hour")} ${bot.singPlur(min,"minute")} and ${bot.singPlur(sec,"second")}`);
            }else{
                skip = true;
                embed.setDescription("The requested Snowflake's age is older than `2^1024` or `10^309` years.\nSuch a big number can't be handled by the bot ;-)");
            }

            if(snowflake > 1056890076895641534463){
                skip = true;
                embed.setFooter("Time isn't compatible in ISO8601 fomat...");
            }else{
                embed.setFooter("Date of the snowflake");
                embed.setTimestamp(timestamp);
            }

            if(!skip){
                let item = bot.findSnowflake(snowflake);

                let result = false;

                if(item){
                    result = item.toString();
                }

                if(result){
                    embed.addField(`Resulting snowflake`,result);
                }
            }

            if(lsf){
                let diff = Math.abs(timestamp-lsf);
                let {sec, min, hrs, day, month, year} = bot.msToVars(diff);
                embed.addField(`Difference from previous snowflake`,`${bot.singPlur(year,"year")} ${bot.singPlur(month,"month")} ${bot.singPlur(day,"day")} ${bot.singPlur(hrs,"hour")} ${bot.singPlur(min,"minute")} and ${bot.singPlur(sec,"second")}`)
            }
            lsf = timestamp;

            await msg.channel.send(embed).catch();
        }
    });

    if(error){
        return error;
    }
}
