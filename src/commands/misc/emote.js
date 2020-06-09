module.exports = {
    name: "emote",
    description: "Print a big pixeled emoji made of small emojis :3",
    usage: `<:emoji: or URL>`,
    category: "misc",
    accessableby: "Bot Owner",
    aliases: ["e","emoji"]
};

const Jimp = require('jimp');
const { closest } = require('color-diff');
const twemoji = require('twemoji');

const emojiRgb = [
    {R: 230, G: 231, B: 232, E: ":white_large_square:"},    // white
    // {R: 91,  G: 104, B: 118, E: ":new_moon:"},              // gray (not square)
    {R: 49,  G: 55,  B: 61,  E: ":black_large_square:"},    // black
    {R: 221, G: 46,  B: 68,  E: ":red_square:"},            // red
    {R: 238, G: 122, B: 139, E: ":womens:"},                // pink
    {R: 255, G: 172, B: 51,  E: ":orange_square:"},         // light orange
    {R: 244, G: 144, B: 12,  E: ":baby_symbol:"},           // orange 
    {R: 253, G: 203, B: 88,  E: ":yellow_square:"},         // yellow
    // {R: 255, G: 217, B: 131, E: ":full_moon:"},             // yellowish (not square)
    {R: 120, G: 177, B: 89,  E: ":green_square:"},          // green
    {R: 85,  G: 172, B: 238, E: ":blue_square:"},           // light blue
    {R: 0,   G: 0,   B: 255, E: ":blue_square:"},           // blue (same as light blue)
    {R: 170, G: 142, B: 214, E: ":purple_square:"},         // purple
    {R: 168, G: 133, B: 214, E: ":star_of_david:"},         // darker purple
    {R: 193, G: 105, B: 79,  E: ":brown_square:"},          // brown
].clean();

const size = 16;

module.exports.run = async (bot, msg) => {
    if(msg.Args.length < 1) return bot.cmdError("Needs a (default or custom) emoji or an emoji url");

    // try arg as emoji
    const emoji = bot.emojis.find(e => e.name == msg.Args[0].split(":")[1]);

    let url = "";

    if(!emoji){
        // check if image is url
        if(msg.Args[0].includes(".png") || msg.Args[0].includes(".jpg")){
            url = msg.Args[0];
        }else{
            // try use twemoji if it's a default emoji
            url = twemoji.parse(msg.Args[0]);
            if(!url.startsWith("<img")) return bot.cmdError("Only works with custom emojis from this guild / default emojis / png or jpg urls of emojis.");
            url = url.substring(url.indexOf("src")+5);
            url = url.substring(0,url.length-3);
        }
    }

    // print image if it was an emoji
    if(emoji){
        url = emoji.url;
        await msg.channel.send(url);
    }

    Jimp.read(url, async (err, img) => {
        if(err) return bot.cmdError("Could not read image");
        img.resize(size, Jimp.AUTO, Jimp.RESIZE_BEZIER, async (err,img) => {
            if(err) return bot.cmdError("Could not load image");
            const transColors = [];
            for(let i = 0; i < img.getHeight(); i++){
                for(let j = 0; j < img.getWidth(); j++){
                    const rgb = Jimp.intToRGBA(img.getPixelColor(j, i));
                    const cdiff = closest({R:rgb.r,G:rgb.g,B:rgb.b}, emojiRgb);
                    const found = emojiRgb.find(v => v.R == cdiff.R && v.B == cdiff.B && v.B == cdiff.B);
                    transColors[i] = transColors[i] || [];
                    transColors[i].push(found ? found.E : 'black_large_square');
                }
            }
            await msg.channel.send(transColors.map(arr=>arr.join('')).join('\n'),{split:'\n'});
        })
    })
}

