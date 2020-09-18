module.exports = {
    name: "minesweeper",
    description: "Gives you a minesweeper field!",
    category: "games",
    aliases: ["ms"]
}

function available(board, row, column) {
    return (row >= 0 && column >= 0 && typeof board[row] !== 'undefined' && typeof board[row][column] !== 'undefined');
}

module.exports.run = async (bot, msg) => {
    const width = Math.floor(Math.random()*2+10);
    const height = Math.floor(Math.random()*2+10);
    const board = [];
    let bombs = Math.ceil(width*height/5);

    for(let x=0; x<width; x++){
        board[x] = [];

        for(let y=0; y<height; y++){
            board[x][y] = 0;
        }
    }

    let pbs = 0; // placed bombs
    let loops = 0; // debug

    while(pbs < bombs){
        if(loops > bombs*2){
            bombs = pbs;
            break;
        }

        const x = Math.floor(Math.random()*board.length);
        const y = Math.floor(Math.random()*board[0].length);

        if(typeof board[x][y] !== 'string'){
            board[x][y] = '';
            pbs++;
        }

        loops++;
    }

    for(let x=0; x<width; x++){
        for(let y=0; y<height; y++){
            let bombs = 0;
            if(typeof board[x][y] === "string") continue;
            for(let x1=-1; x1<2; x1++){
                for(let y1=-1; y1<2; y1++){
                    if(available(board,x+x1,y+y1)){
                        if(typeof board[x+x1][y+y1] === 'string') bombs++;
                    }
                }
            }
            board[x][y] = bombs;
        }
    }

    const numbers = ['zero','one','two','three','four','five','six','seven','eight'];
    let bomb;

    switch(msg.guild.id){
        case '265505748413448193':
            bomb = bot.emotes.crafter;
            break;
        case '491274461111123969':
            bomb = bot.emotes.megaflushed;
            break;
        default:
            bomb = '🎆';
    }

    if(msg.guild.name.toLowerCase().includes('specky')){
        bomb = bot.emotes.specky;
    }

    // height and width have to be inverted for some reason
    let text = `Welcome to MineSweeper!\nBoard: ${height}x${width}\nBombs: ${bombs}\n`

    board.forEach(x => {
        x.forEach(y => {
            if(typeof y === 'number'){
                text += `||:${numbers[y]}:||`;
            }else{
                text += `||${bomb}||`;
            }
        });
        text += '\n';
    });

    return msg.channel.send(text);
}
