const urban = require("urban");
const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, msg, args, owner, prefix) => {
    if(args < 1 || !["search", "random"].includes(args[0])) return msg.channel.send(`Usage: \`${prefix}urban <search|random> (query)\``);
    let image = "http://cdn.marketplaceimages.windowsphone.com/v8/images/5c942bfe-6c90-45b0-8cd7-1f2129c6e319?imageType=ws_icon_medium";
    let search = args[1] ? urban(args.slice(1).join(" ")) : urban.random();
    try {
        search.first(res => {
            if(!res) return msg.channel.send("No results found for this topic, sorry!");
            let { word, definition, example, thumbs_up, thumbs_down, permalink, author} = res;
            let embed = new RichEmbed()
                .setColor("#C78C2B")
                .setAuthor(`Urban Dictionary | ${word}`, image)
                .setThumbnail(image)
                .setDescription(`**Defintion:** ${definition || "No definition"}
                **Example:** ${example || "No Example"}
                **Upvote:** ${thumbs_up || 0}
                **Downvote:** ${thumbs_down || 0}
                **Link:** [link to ${word}](${permalink || "https://www.urbandictionary.com/"})`)
                .setTimestamp()
                .setFooter(`Written by ${author || "unknown"}`);
                msg.channel.send(embed)
        });
    } catch(e) {
        console.log(e)
        return msg.channel.send("looks like i've broken! Try again")
    }
}


module.exports.config = {
    name: "urban",
    description: "Gives you informations about a word you don't know!",
    usage: `<query>`,
    accessableby: "Members",
    aliases: ["urba","urb","ud","urbandictionary","dictionary"]
}