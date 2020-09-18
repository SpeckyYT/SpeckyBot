module.exports = {
    name: "rps",
    description: "Lets you play Rock Paper Scissors with the bot!",
    usage: `<handsign>`,
    category: "games",
    aliases: ["rsp", "rockpaperscissors","rockscissorspaper"]
}

module.exports.run = async (bot, msg) => {
    const { args } = msg;
    if(!args[0]) return msg.channel.send("You have to define a handsign (Rock | Scissors | Paper)");

    let value;

    let hand = args[0];
    if(hand.startsWith('\\')){
        hand = hand.slice(1);
    }

    switch(hand){
        case "rock":
        case "stone":
        case "✊":
            value = 1; break;
        case "paper":
        case "🤚":
            value = 2; break;
        case "scissors":
        case "scissor":
        case "✂️":
        case "✌️":
            value = 3; break;
        default:
            return bot.cmdError("Invalid hand sign (Rock | Scissors | Paper)");
    }

    const rng = Math.ceil(Math.random() * 3);
    let rng_str;
    switch(rng){
        case 1:
            rng_str = '✊ Rock'; break;
        case 2:
            rng_str = '🤚 Paper'; break;
        case 3:
            rng_str = '✌️ Scissors'; break;
    }

    let win = 0;    // 0 = lose | 1 = draw | 2 = win
    switch(value){
        case 1:
            win = rng == 1 ? 1 : (rng == 2 ? 0 : 2); break;
        case 2:
            win = rng == 1 ? 2 : (rng == 2 ? 1 : 0); break;
        case 3:
            win = rng == 1 ? 0 : (rng == 2 ? 2 : 1); break;
    }

    function send(string){
        msg.channel.send(`${rng_str}\n${string}`)
    }

    switch(win){
        case 0:
            send('> You lost'); break;
        case 1:
            send('> This was a draw'); break;
        case 2:
            send('> You won!!!'); break;
        default:
            return bot.cmdError("An unknown error occurred")
    }
}
