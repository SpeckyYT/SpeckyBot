module.exports.run = async (bot, msg, args, config) => {
    const chan = msg.channel;
    var players = 0;
    var gameReady = null;

    if(args[0] == 'start'){
        
        await msg.channel.send(`We need at least 3 players to join!\nTo join, just type \`Join!\``)
        
        const filter = m => m.content.toLowerCase().includes(`join!`);

        chan.awaitMessages(filter, {max: 16, time: 5000, errors: ['time']})
            .then(c => {
                gameReady = 1;
                msg.channel.send('OwO?')
            })
            .catch(c => {
                if(c.size >= 3){
                    gameReady = 1
                    msg.channel.send('OwO!')
                }else{
                    chan.send(`Time expired and only ${c.size - 1} players joined.`);
                    gameReady = 0;
                    return;
                }
        })

        if(gameReady = 1){

            var challenge;      // 1: send message 
                                // 2: react to message
                                // 3: change nickname 
                                // 4: change custom status 
                                // 5: change status (active, inactive, ndn) 
                                // 6: enter vocal channel 
                                // 7: send DM
            var minChallenge = 1;
            var maxChallenge = 7;
            let alive = true;

            while(alive) {
                challenge = Math.round(Math.random() * maxChallenge) + minChallenge;  
            
                switch(challenge){
                    case 1:

                        break

                    case 2:

                        break

                    case 3:

                        break

                    case 4:

                        break

                    case 5:

                        break

                    case 6:

                        break

                    case 7:

                        break
                }
            
            }
        }
    }
}

module.exports.config = {
    name: "speckysays",
	description: "Users have to complete the challenges in order to survive!",
    usage: `start`,
    category: `games`,
	accessableby: "Members",
    aliases: ["simonsays", "simon"]
}
