module.exports = {
    name: "urban",
    description: "Gives you informations about a word you don't know!",
    usage: `[random] <query>`,
    category: `utilities`,
    aliases: ["urba","urb","ud","urbandictionary","dictionary"]
}

const urban = require("urban");

module.exports.run = async (bot, msg) => {
    const image = "https://lh3.googleusercontent.com/unQjigibyJQvru9rcCOX7UCqyByuf5-h_tLpA-9fYH93uqrRAnZ0J2IummiejMMhi5Ch";
    let search;
    try{
        if(msg.args[0] == "random"){
            search = urban.random();
        }else{
            search = urban(msg.Args.join(" "));
        }
    }catch{
        return bot.cmdError("Unknown error happened");
    }

    try {
        search.first(async res => {
            if(!res) return msg.channel.send("No results found for this topic, sorry!");
            const { word, definition, example, thumbs_up, thumbs_down, permalink, author} = res;

            async function replaceLinks(string){
                return new Promise((res,rej) => {
                    try{
                        const subwords = string.match(/\[[^[\]]+\]/g);
                        const sub = subwords.map(v => urban(v.slice(1,v.length-1)));
                        let s = string;
                        let proof = 0;
                        sub.forEach((v,i) => {
                            v.first(u => {
                                s = s.replace(subwords[i],`${subwords[i]}(${u.permalink})`);
                                proof++;
                                if(proof >= sub.length){
                                    s = s.replace(/(\*|\||>|_|~)/g,'\\$1');
                                    res(s);
                                }
                            })
                        })
                    }catch(err){
                        rej(err);
                    }
                })
            }

            const embed = bot.embed()
            .setColor("#134FE6")
            .setAuthor(`Urban Dictionary | ${word}`, image)
            .setThumbnail(image)
            .setDescription(`**Defintion:** ${await replaceLinks(definition) || "No Definition"}\n\n**Example:** ${await replaceLinks(example) || "No Example"}\n\n**Upvotes:** ${thumbs_up || 0}\n**Downvotes:** ${thumbs_down || 0}\n\n**Link:** [link to ${word}](${permalink || "https://www.urbandictionary.com/"})`)
            .setFooter(`Written by ${author || "unknown"}`);
            msg.channel.send(embed)
        });
    } catch(e) {
        console.error(e)
        return bot.cmdError("Unknown error happened");
    }
}
