const fetch = require('node-fetch');
const { RichEmbed } = require('discord.js');
const { compareTwoStrings } = require('string-similarity')

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}
  

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
                data.correct_answer = Buffer.from(data.correct_answer, 'base64').toString();

                var cEmbed = new RichEmbed()
                    .setTitle('Trivia Question!')
                    .addField('Category:', `${Buffer.from(data.category, 'base64').toString()}`)
                    .addField('Difficulty:', `${Buffer.from(data.difficulty, 'base64').toString()}`)
                    .addField('Question:', `${Buffer.from(data.question, 'base64').toString()}`)
                    .setTimestamp()
                    .addBlankField();
                const quant = data.incorrect_answers.length;

                var answs = ["0","1","2","3"];
                shuffle(answs);

                var times = 0;
                while(times <4){
                    switch(answs[times]){
                        case "0":
                                cEmbed.addField(`Response #${times + 1}`, data.correct_answer);
                            break
                        case "1":
                                cEmbed.addField(`Response #${times + 1}`, data.incorrect_answers[0]);
                            break
                        case "2":
                                cEmbed.addField(`Response #${times + 1}`, data.incorrect_answers[1]);
                            break
                        case "3":
                                cEmbed.addField(`Response #${times + 1}`, data.incorrect_answers[2]);
                            break
                    }
                    times++;
                }
                msg.channel.send(cEmbed).then(async resp => {
                    cEmbed.addBlankField()

                    const filter =  m => m.author.id == msg.author.id;
                    await msg.channel.awaitMessages(filter, {max: 1, time: 60000, errors: ['time']})
                    .then(c => {
                        if(compareTwoStrings(data.correct_answer.toLowerCase(), msg.author.lastMessage.content.toLowerCase()) >= 0.75){
                            cEmbed.setColor('#00FF00');
                        }else{
                            cEmbed.setColor('#FF0000');
                        }
                        cEmbed.addField('Right Answer:',`${data.correct_answer}`)
                        resp.edit(cEmbed)
                    }).catch(c => {
                        cEmbed.setColor('#FF0000')
                        .addField('Right Answer:',`${data.correct_answer}`);
                        resp.edit(cEmbed);
                    })
                })
            })
        }
    })
}

module.exports.config = {
    name: "quiz",
	description: "A random question with (usually) 4 responses!",
    usage: ``,
    category: `games`,
	accessableby: "Members",
    aliases: ["qui", "qz","quiz"]
}
