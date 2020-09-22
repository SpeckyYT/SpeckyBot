module.exports = {
    name: 'tictactoe',
    description: 'Lets you play Tic-Tac-Toe',
    category: 'games',
    aliases: ['ttt']
}

module.exports.run = async (bot, msg) => {
    const { TicTacToe } = require('tictactoejs');
    const size = 3;
    const game = new TicTacToe(size);

    // UTILITIES FUNCTIONS
    function draw(){
        return game.ascii().code();
    }
    function legalMoves(){
        return game.legalMoves().map(({x,y}) => positionToNumber(x,y));
    }
    function numberToPosition(n){
        const f = [null];
        for(let y = size; y > 0; y--){
            for(let x = 1; x <= size; x++){
                f.push([x,y])
            }
        }
        return f[n];
    }
    function positionToNumber(x,y){
        return x + (-(y-size))*size;
    }

    const ms = await msg.channel.send(draw())

    const collector = ms.channel.createMessageCollector(m => m.author.id == msg.author.id && parseInt(m.content) >= 1 && parseInt(m.content) <= size*size, {time: 30000});

    collector.on('collect', (m) => {
        const playerPos = parseInt(m.content);
        if(!isNaN(playerPos) && legalMoves().includes(playerPos)){
            // PLAYER MOVE
            const [x,y] = numberToPosition(playerPos);
            if(!game.move(x,y)) return;
            ms.edit(draw());
            if(game.gameOver()) return collector.stop();

            // "AI" MOVE
            game.randomMove();
            ms.edit(draw());
            if(game.gameOver()) return collector.stop();
        }
    })
    collector.on('end', () => {
        if(!game.gameOver()) return ms.edit(ms.content+'\n\nTime Elapsed');
    })
}
