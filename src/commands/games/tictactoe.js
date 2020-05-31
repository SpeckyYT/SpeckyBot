module.exports = {
    name: "tictactoe",
    description: "Lets you play Tic Tac Toe with the bot!",
    usage: ``,
    category: `games`,
    accessableby: "Members",
    aliases: []
}

const ttt = require('tictactoe_model');
const ticTacToe = new ttt();

module.exports.run = async (bot, msg) => {
    msg.channel.send("Game will start soon!")
    .then(async ms => {
        // 0 = empty | 1 = player | 2 = AI
        let field =
            [0,0,0
            ,0,0,0
            ,0,0,0];

        const helper = [1,2,3,4,5,6,7,8,9];

        const generateField = () => {
            let i = 0;
            let string = '';
            field.map(p => {
                switch(p){
                    case 0:
                        string += `:${numbers[i]}:`; break;
                    case 1:
                        string += `:x:`;
                    break;
                    case 2:
                        string += `:o:`
                    break;  
                }
                i++;

                if(i%3 === 0){
                    string += '\n';
                }
            });
            return string;
        }

        msg.edit(generateField());

        const AIPlay = async () => {

        }

        const ask = async () => {
            return await msg.channel.awaitMessages(m => m.author.id === msg.author.id && helper.filter((v,i) => !field[i]).includes(Number(m.content)),{max:1,time:30000,errors:['time']})
            .then(r => {
                const pos = r.first().content;
                field[pos-1] = 1;
                return await AIPlay();
            })
            .catch(e => {
                console.error(e);
                throw msg.channel.send("Unexpected error happened");
            })
        }

        await ask();
    })
}
