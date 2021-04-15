module.exports = {
    name: "snowflake",
    description: "Converts an ID into a timestamp!",
    usage: `[ID] [ID]...`,
    category: "dev",
    flags: ['full'],
    aliases: ['sf','id']
}

const { SnowflakeUtil: { deconstruct } } = require('discord.js');
const prettyMs = require('pretty-ms');

module.exports.run = async (bot, msg) => {
    let lsf, error;

    const prev = [];

    if(!msg.args.length) return bot.cmdError('No valid Snowflake provided');

    for(const arg of msg.Args){
        const snowflake = arg.split('').filter(c=>"0123456789".includes(c)).join('');

        if(isNaN(snowflake) || !snowflake){
            if(!error) error = bot.cmdError(`Snowflake \`${arg}\` is not a valid number`);
        }else{
            const deconstructed = deconstruct(snowflake);
            const timestamp = deconstructed.date;
            const binary = deconstructed.binary;
            const toobig = binary.includes('-') || snowflake.length > 19;

            if(!prev.includes(binary)) prev.push(binary);
            else continue;

            const timenow = new Date();

            let skip = false;

            const embed = bot.embed()
            .setTitle(snowflake)
            .setColor(bot.config.color);

            if(toobig){
                skip = true;
                embed.setDescription("The requested Snowflake caused an overflow.");
                embed.setFooter("Time isn't compatible in ISO8601 fomat...");
            }else{
                embed.addField(
                    `${timestamp <= timenow ?
                        "How long ago the snowflake was created" :
                        "Time left for that snowflake"}`,
                    `${prettyMs(Math.abs(timenow - timestamp), { verbose: true })}`
                );
                embed.setFooter("Date of the snowflake");
                embed.setTimestamp(timestamp);
            }

            if(msg.flag('full')){
                embed.addField('Timestamp',deconstructed.timestamp)
                .addField('Worker ID',deconstructed.workerID)
                .addField('Process ID',deconstructed.processID)
                .addField('Increment',deconstructed.increment)
            }

            if(!skip){
                const item = snowflake.findSnowflake();
                if(item){
                    embed.addField(`Resulting snowflake`,item.toString());
                }
            }

            if(lsf) embed.addField(
                `Difference from previous snowflake`,
                prettyMs(Math.abs(timestamp-lsf), { verbose: true })
            )
            lsf = timestamp;

            await msg.channel.send(embed);
            continue;
        }
    }

    if(error) return error;
}
