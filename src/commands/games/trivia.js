module.exports = {
    name: "trivia",
	description: "A random trivia question from the internet!",
    usage: ``,
    category: `games`,
	accessableby: "Members",
    aliases: ["trivi", "triv"]
}

const fetch = require('node-fetch');
const { RichEmbed } = require('discord.js');
const { compareTwoStrings } = require('string-similarity')

module.exports.run = async (bot, msg) => {
    const link =  'https://opentdb.com/api.php?amount=1&type=multiple&encode=base64'; 
/*    const response = await fetch(link);
    const json = await response.json();
    msg.channel.send(json);
*/

    fetch(link, {method: 'GET',headers:
        {Accept: 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            response.json().then(async json => {
                var infos = [];
                var data
                await json.results.forEach((obj) => {
                    data = obj;
                });
                var times = 0
                await data.incorrect_answers.forEach(function(inc){
                    data.incorrect_answers[times] = Buffer.from(inc, 'base64').toString()
                    times++;
                });
                var cEmbed = new RichEmbed()
                    .setTitle('Trivia Question!')
                    .addField('Category:', `${Buffer.from(data.category, 'base64').toString()}`)
                    .addField('Difficulty:', `${Buffer.from(data.difficulty, 'base64').toString()}`)
                    .addField('Question:', `${Buffer.from(data.question, 'base64').toString()}`)
                    .setFooter('Say "reveal" once you\'ve written the answer down! (You have 1 minute time)');
                var cEmbed2 = new RichEmbed()
                    .setTitle('Trivia Question!')
                    .addField('Category:', `${Buffer.from(data.category, 'base64').toString()}`)
                    .addField('Difficulty:', `${Buffer.from(data.difficulty, 'base64').toString()}`)
                    .addField('Question:', `${Buffer.from(data.question, 'base64').toString()}`)
                    .addField('Correct Answer:', `${Buffer.from(data.correct_answer, 'base64').toString()}`)
                    .addField('Wrong Answers', `${data.incorrect_answers.join(", ")}`);
                msg.channel.send(cEmbed).then(async resp => {

                    const filter =  m => ((m.content.toLowerCase().includes('reveal')) && (m.author.id == msg.author.id)) || 
                                    (compareTwoStrings(Buffer.from(data.correct_answer, 'base64').toString(), m.content) >= 0.7);

                    await msg.channel.awaitMessages(filter, {max: 1, time: 60000, errors: ['time']})
                    .then(c => {
                        if((msg.author.lastMessage.content.toLowerCase().includes('reveal'))){
                            cEmbed2.setColor('#FF0000');
                        }else{
                            cEmbed2.setColor('#00FF00');
                        }
                        resp.edit(cEmbed2);
                    }).catch(c => {
                        cEmbed2.setColor('#FF0000');
                        resp.edit(cEmbed2);
                    })
                })
            })
        }
    })
}
