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
    ["https://vgmdownloads.com/soundtracks/pokemon-gold-silver-crystal/rylwnmtd/011%20Victory%21%20%28Wild%20Pok%C3%A9mon%29.mp3",'won.mp3'],
    ["https://i.redd.it/a9r0wbb7f4o51.jpg",'b1.jpg'],
    ["https://i.redd.it/zbp6g872q7o51.png",'b2.jpg'],
    ["https://i.redd.it/nbhcsq4cybo51.jpg",'b3.jpg'],
    ["https://i.redd.it/lnh4563fvzn51.png",'b4.jpg'],
    ["https://i.redd.it/osfutsvxt6o51.jpg",'b5.jpg'],
    ["https://i.redd.it/ptwb2n6hl5o51.jpg",'b6.jpg'],
    ["https://i.redd.it/p8kmop01v4o51.png",'b7.jpg'],
    ["https://i.redd.it/qggsucgnczn51.jpg",'b8.jpg'],
    ["https://i.redd.it/t24ke5vsown51.jpg",'b9.jpg'],
    ["https://i.redd.it/0o3zyg8divn51.jpg",'b10.jpg']
].map(save);

module.exports.run = async (bot, msg) => {
    await promises;

    // START
    const loading = msg.channel.send("Loading...");
    await msg.channel.send("Listen to the music for full experience!", global.assets.battle.toAttachment('battle.mp3'));
    (await loading).delete();

    await bot.wait(1500);
    const amountOfBosses = 10;

    const currBoss = Math.ceil(Math.random()*amountOfBosses);

    await msg.channel.send("A wild boss appeared!",global.assets[`b${currBoss}`].toAttachment('boss.jpg'));

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

    const collector = msg.channel.createMessageCollector((m) => !m.author.bot, {idle: 15000});
    collector.on('collect', async (m) => {
        if(typeof word == "number") return;
        if(m.content.toLowerCase() === word.toLowerCase()){
            word = Infinity;
            damage++;
            await (await dmgmessage).delete();
            dmgmessage = msg.channel.send(global.assets[`boss${damage}`].toAttachment('health.jpg'));
            if(damage >= 6){
                message.delete();
                won = true;
                collector.stop()
            }else{
                word = words.pick();
                message.edit(`Type \`${word}\` to damage it!`)
            }
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
