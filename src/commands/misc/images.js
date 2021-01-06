module.exports = {
    name: "image",
    description: "Searches you an image!",
    usage: "<text>",
    category: "misc",
    aliases: ['img']
}

const google = new (require('images-scraper'))({
    puppeteer:{
        headless: true
    }
});

module.exports.run = async (bot, msg) => {
    if(!msg.cmdContent){
        return bot.cmdError("You need to give some text to search an image");
    }

    const m = await msg.channel.send("Searching for an image...");
    const res = await google.scrape(msg.cmdContent,50);
    return m.edit(
        res[
        Math.min(
            ...Array(5)
            .fill(0)
            .map(()=>Math.floor(Math.random()*res.length))
        )
        ].url
    );
}
