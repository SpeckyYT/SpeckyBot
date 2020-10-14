module.exports = {
    name: "urban",
    description: "Gives you informations about a word you don't know!",
    usage: `[random] <query>`,
    category: "utilities",
    aliases: ["urba","urb","ud","urbandictionary","dictionary"],
    flags: ['random','r']
}

const urban = require("relevant-urban");

module.exports.run = async (bot, msg) => {
    const image = "https://lh3.googleusercontent.com/unQjigibyJQvru9rcCOX7UCqyByuf5-h_tLpA-9fYH93uqrRAnZ0J2IummiejMMhi5Ch";
    let search;

    try{
        if(msg.flag("random")||msg.flag("r")){
            search = await urban.random();
        }else if(msg.cmdContent.replace(/[^0-9a-zA-Z\s]/g,'')){
            search = await urban(msg.cmdContent.replace(/[^0-9a-zA-Z\s]/g,''));
        }else{
            return bot.cmdError('You need to enter valid text');
        }
    }catch(err){
        if(String(err).includes('500')){
            return bot.cmdError('Urban Dictionary Error happened');
        }else{
            return bot.cmdError(err);
        }
    }

    const res = search;
    if(!res) return bot.cmdError("No results found for this topic, sorry!");
    const { word, definition, example, thumbsUp, thumbsDown, urbanURL, author} = res;

    function replaceLinks(string){
        let s = string.valueOf();
        return new Promise(async (res,rej) => {
            try{
                const subwords = s.match(/\[[^[\]]+\]/g);
                if(!subwords) res(null);
                const sub = subwords.map(v => urban(v.slice(1,v.length-1)));

                let proms = [];
                try{
                    proms = await Promise.all(sub);
                }catch{}
                subwords.forEach((u,i) =>
                    s = s.replace(subwords[i],`${subwords[i]}(${proms[i] && proms[i].urbanURL})`)
                )
                res(s.replace(/(\*|\||>|_|~)/g,'\\$1'));
            }catch(err){
                res(s);
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

    const m = msg.channel.send(
        baseEmbed()
        .addField("**Definition**", slice(definition) || "No Definition")
        .addField("**Example**", slice(example) || "No Example")
        .addField("**Upvotes**", thumbsUp || 0, true)
        .addField("**Downvotes**", thumbsDown || 0, true)
        .addField("**Link**", `[link to ${word}](${urbanURL || "https://www.urbandictionary.com/"})`)
    );
    Promise.all([replaceLinks(definition),replaceLinks(example),m])
    .then(([newDefi,newExem,m]) => {
        if(newDefi||newExem){
            return m.edit(
                baseEmbed()
                .addField("**Definition**", slice(newDefi || definition || "No Definition"))
                .addField("**Example**", slice(newExem || example || "No Example"))
                .addField("**Upvotes**", thumbsUp || 0, true)
                .addField("**Downvotes**", thumbsDown || 0, true)
                .addField("**Link**", `[link to ${word}](${urbanURL || "https://www.urbandictionary.com/"})`)
            )
        }
    })
}
