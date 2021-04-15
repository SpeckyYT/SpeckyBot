module.exports = {
    name: "blackjack",
    usage: "<bet>",
    category: "economy",
    description: "Lets you play BlackJack!",
    aliases: ['bj']
}

const { Blackjack } = require('blackjack-n-deck');
const db = require('quick.db');
const economy = new db.table('economy');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, msg) => {
    const obet = msg.args[0];
    const bet = bot.parseBet(msg.author,obet);
    const res = bot.resolveBet(msg.author,bet);
    if(res) return res;

    const game = new Blackjack(bet);

    game.event = event => {
        let string;

        switch(event) {
            case "init": break;
            case "hit": break;

            case "push":
                string = 'Push. Money back.'; break;

            case "win":
                string = `You won ${game.bet}₪!`;
                economy.add(`${msg.author.id}.money`,game.bet);
                break;

            case "bust":
                string = 'You lost.';
                economy.add(`${msg.author.id}.money`,-game.bet);
                break;

            case "blackjack":
                string = `BLACKJACK! ${game.bet}₪!`;
                economy.add(`${msg.author.id}.money`,game.bet);
                break;
        }
        msg.channel.send(
            string,
            draw(
                game,
                ['win','push','bust'].includes(event),
                event
            )
        );
    };

    msg.channel.send(
        bot.embed()
        .setTitle('Welcome to BlackJack!')
        .setDescription('Available commands: `hit` `doubledown` `stand`')
    )

    game.init();

    const collector = msg.channel.createMessageCollector(m => !game.status && m.author.id == msg.author.id, {idle: 30000});

    collector.on('collect', m => {
        switch(m.content.toLowerCase()){
            case 'dd':
            case 'doubledown':
                game.doubleDown(); break;
            case 'h':
            case 'hit':
                game.hit(); break;
            case 's':
            case 'stop':
            case 'stand':
                game.stand(); break;
            default:
                msg.channel.send('Invalid command\nAvailable ones: `hit` `doubledown` `stand`')
        }
    })
}

function draw(game, finished, event){
    const color =   event == 'win' && 'GREEN' ||
                    event == 'bust' && 'RED' ||
                    event == 'push' && 'BLUE' ||
                    'GREY';

    return new MessageEmbed()
    .setColor(color)
    .addField(
        'Your cards',
        `${game.player.cards.map(i => i.image).join(", ")} [${game.player.score}]`
    )
    .addField(
        'Dealer cards',
        `${finished ? game.dealer.cards.map(i => i.image).join(", ") : `${game.dealer.cards[0].image}, ?`} [${game.dealer.score}]`
    )
}
