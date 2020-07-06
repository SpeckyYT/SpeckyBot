module.exports = {
    name: "urban",
    description: "Gives you informations about a word you don't know!",
    usage: `[random] <query>`,
    category: `utilities`,
    aliases: ["urba","urb","ud","urbandictionary","dictionary"]
}

const urban = require("urban");

module.exports.run = async (bot, msg) => {
    const { Args } = msg;
    const image = "http://cdn.marketplaceimages.windowsphone.com/v8/images/5c942bfe-6c90-45b0-8cd7-1f2129c6e319?imageType=ws_icon_medium";
    let search;
    try{
        if(Args[0] == "random"){
            search = urban.random();
        }else{
            search = urban(Args.join(" "));
        }
    }catch{
        return bot.cmdError("Unknown error happened");
    }
    
    try {
        search.first(res => {
            if(!res) return msg.channel.send("No results found for this topic, sorry!");
            const { word, definition, example, thumbs_up, thumbs_down, permalink, author} = res;
            const embed = bot.embed()
            .setColor("#C78C2B")
            .setAuthor(`Urban Dictionary | ${word}`, image)
            .setThumbnail(image)
            .setDescription(`**Defintion:** ${definition || "No definition"}\n\n**Example:** ${example || "No Example"}\n\n**Upvotes:** ${thumbs_up || 0}\n**Downvotes:** ${thumbs_down || 0}\n\n**Link:** [link to ${word}](${permalink || "https://www.urbandictionary.com/"})`)
            .setFooter(`Written by ${author || "unknown"}`);
            msg.channel.send(embed)
        });
    } catch(e) {
        console.log(e)
        return msg.channel.send("looks like i've broken! Try again")
    }
}
