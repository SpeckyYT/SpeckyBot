module.exports = {
    name: "battle",
    description: "Lets you battle!",
    category: "games",
    aliases: ['boss','bossfight']
}

const save = global.modules.saveAsset;

const promises = [
    ["https://media.discordapp.net/attachments/671851100290285568/757301181620944916/image0.jpg",'boss1.jpg'],
    ["https://media.discordapp.net/attachments/671851100290285568/757301085223256304/image0.png",'boss2.jpg'],
    ["https://media.discordapp.net/attachments/671851100290285568/757301092219355156/image0.png",'boss3.jpg'],
    ["https://media.discordapp.net/attachments/671851100290285568/757301096946597947/image0.png",'boss4.jpg'],
    ["https://media.discordapp.net/attachments/671851100290285568/757301103304900728/image0.png",'boss5.jpg'],
    ["https://media.discordapp.net/attachments/671851100290285568/757301109189509222/image0.png",'boss6.jpg'],
    ["https://vgmdownloads.com/soundtracks/pokemon-diamond-and-pearl-super-music-collection/kbqajyde/1-20%20Battle%21%20Trainer.mp3",'battle.mp3'],
    ["https://vgmdownloads.com/soundtracks/pokemon-gold-silver-crystal/rylwnmtd/011%20Victory%21%20%28Wild%20Pok%C3%A9mon%29.mp3",'won.mp3']
].map(save);

const redditImages = require('reddit-image-fetcher');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (bot, msg) => {
    await promises;

    // START
    const loading = msg.channel.send("Loading...");

    const boss = redditImages.fetch({
        type: 'bossfight',
        subreddit: 'bossfight',
        total: 5
    });

    await msg.channel.send("Listen to the music for full experience!", global.assets.battle.toAttachment('battle.mp3'));

    const bossImg = (await boss).filter(i=>!i.NSFW)[0].image;

    (await loading).delete().catch(()=>{});

    await bot.wait(1500);

    await msg.channel.send("A wild boss appeared!", new MessageAttachment(bossImg));

    const words = [
        'fight',
        'hit',
        'punch',
        'kick',
        'slap',
        'throw',
        'attack',
        'bite',
        'stab'
    ];

    let word = words.pick();

    let damage = 1;
    let won = false;

    let dmgmessage = await msg.channel.send(global.assets.boss1.toAttachment('health.jpg'));
    const message = await msg.channel.send(`Type \`${word}\` to damage it!`);

    const filter = m => {
        if(m.author.bot) return false;
        if(typeof word == "number") return false;
        if(m.content.toLowerCase() === word.toLowerCase()) return true;
        return false;
    }

    const collector = msg.channel.createMessageCollector(filter, {idle: 15000});

    collector.on('collect', async (m) => {
        word = Infinity;
        damage++;
        await (await dmgmessage).delete();
        dmgmessage = msg.channel.send(global.assets[`boss${damage}`].toAttachment('health.jpg'));
        if(damage >= 6){
            message.delete();
            won = true;
            collector.stop()
        }else{
            while(typeof word != 'string' || message.content.includes(word)){
                word = words.pick();
            }
            return message.edit(`Type \`${word}\` to damage it!`)
        }
    });

    collector.on('end', () => {
        if(won){
            return msg.channel.send("You won!",global.assets.won.toAttachment('won.mp3'));
        }else{
            return msg.channel.send("The boss ran away...")
        }
    });
}
