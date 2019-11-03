const fetch = require('node-fetch');
const { RichEmbed } = require('discord.js');
const base64 = require('base64-js');

module.exports.run = async (bot, msg, args, owner, prefix) => {
    const link =  'https://opentdb.com/api.php?amount=1&encode=base64'; 
/*    const response = await fetch(link);
    const json = await response.json();
    msg.channel.send(json);
*/

    fetch(link, {method: 'GET',headers:
        {Accept: 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            response.json().then(json => {
                var infos = [];
                var data
                json.results.forEach((obj) => {
                    data = obj;
                });
                const cEmbed = new RichEmbed()
                    .setTitle('Trivia Question!')
                    .addField('Category:', `${Buffer.from(data.category, 'base64').toString()}`)
                    .addField('Difficulty:', `${Buffer.from(data.difficulty, 'base64').toString()}`)
                    .addField('Question:', `${Buffer.from(data.question, 'base64').toString()}`)
                    .setFooter('Say "reveal" once you\'ve written the answer down! (You have 1 minute time)');
                msg.channel.send(cEmbed).then(resp => {
                    const filter = m => m.content.includes('reveal');
                    msg.channel.awaitMessages(filter, {max: 1, time: 60000})
                    .then(collected => {
                        var times = 0
                        data.incorrect_answers.forEach(function(inc){
                            data.incorrect_answers[times] = Buffer.from(inc, 'base64').toString()
                            times++;
                        })
                        const cEmbed2 = new RichEmbed()
                            .setTitle('Trivia Question!')
                            .addField('Category:', `${Buffer.from(data.category, 'base64').toString()}`)
                            .addField('Difficulty:', `${Buffer.from(data.difficulty, 'base64').toString()}`)
                            .addField('Question:', `${Buffer.from(data.question, 'base64').toString()}`)
                            .addField('Correct Answer:', `${Buffer.from(data.correct_answer, 'base64').toString()}`)
                            .addField('Wrong Answers', `${data.incorrect_answers.join(", ")}`);
                        resp.edit(cEmbed2);
                    })
                })
            });
        }
    });
}

module.exports.config = {
    name: "trivia",
	description: "A random trivia question from the internet!",
    usage: ``,
    category: `games`,
	accessableby: "Members",
    aliases: ["trivi", "triv","quiz"]
}
