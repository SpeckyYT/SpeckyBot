module.exports = {
    name: "urban",
    description: "Gives you informations about a word you don't know!",
    usage: `[random] <query>`,
    category: "utilities",
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
                        if(!subwords) res(false);
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
                        res(string);
                    }
                })
            }

            function slice(string){
                if(typeof string == "string"){
                    if(string.length > 1000){
                        return string.slice(0,1000).trim()+"...";
                    }else{
                        return string;
                    }
                }else{
                    return null;
                }
            }

            function baseEmbed(){
                return bot.embed()
                .setColor("#134FE6")
                .setAuthor(`Urban Dictionary | ${word}`, image)
                .setFooter(`Written by ${author || "unknown"}`)
                .setThumbnail(image);
            }

            return msg.channel.send(
                baseEmbed()
                .addField("**Definition**", slice(definition) || "No Definition")
                .addField("**Example**", slice(example) || "No Example")
                .addField("**Upvotes**", thumbs_up || 0, true)
                .addField("**Downvotes**", thumbs_down || 0, true)
                .addField("**Link**", `[link to ${word}](${permalink || "https://www.urbandictionary.com/"})`)
            )
            .then(async m => {
                const newDefi = await replaceLinks(definition);
                const newExem = await replaceLinks(example);
                if(newDefi||newExem){
                    m.edit(
                        baseEmbed()
                        .addField("**Definition**", slice(newDefi) || "No Definition")
                        .addField("**Example**", slice(newExem) || "No Example")
                        .addField("**Upvotes**", thumbs_up || 0, true)
                        .addField("**Downvotes**", thumbs_down || 0, true)
                        .addField("**Link**", `[link to ${word}](${permalink || "https://www.urbandictionary.com/"})`)
                    )
                }
            })
        });
    } catch(e) {
        console.error(e)
        return bot.cmdError("Unknown error happened");
    }
}
