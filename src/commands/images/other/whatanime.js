module.exports = {
    name: 'whatanime',
    description: "Tries to recognize an anime from a screenshot!",
    category: "images",
    aliases: ["wa"]
}

const fetch = require('node-fetch');
const Canvas = require('canvas');

module.exports.run = async (bot, msg) => {
    const image = bot.cache.lastImage[msg.channel.id];
    if(image == undefined) return bot.cmdError("No image found");

    const img = await Canvas.loadImage(image);
    const canvas = Canvas.createCanvas(img.width, img.height);

    canvas.getContext('2d').drawImage(img,0,0);

    const buffer = canvas.toDataURL('image/jpeg',0.8);

    return fetch('https://trace.moe/api/search', {
        method: 'POST',
        body: JSON.stringify({image: buffer})
    })
    .then(r => r.json())
    .then(r => {
        if(typeof r == 'string') return bot.cmdError(r);

        const animes = r.docs;

        const string = animes
        .slice(0,10)
        .filter((a,i) => !animes.slice(0,i-1).some(an => an.anime == a.anime || an.title_english == a.title_english))
        .map(a => animeToString(a))
        .join('\n\n')
        .code('');

        return msg.channel.send(string);
    })
}

const animeToString = anime => `${anime.anime} (${anime.title_english})${anime.is_adult ? ' 🔞' : ''} [match: ${(anime.similarity*100).toFixed(1)}%]`
