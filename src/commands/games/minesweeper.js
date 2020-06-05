module.exports = {
    name: "minesweeper",
    description: "Gives you a minesweeper field!",
    usage: ``,
    category: `games`,
    accessableby: "Members",
    aliases: ["ms"]
}

function available(board, row, column) {
    return (row >= 0 && column >= 0 && typeof board[row] !== 'undefined' && typeof board[row][column] !== 'undefined');
}

module.exports.run = async (bot, msg) => {
    const length = Math.floor(Math.random()*5+5);
    const height = Math.floor(Math.random()*5+5);
    const board = [];
    let bombs = Math.ceil(length*height/5);

    for(let x=0; x<length; x++){
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

    for(let x=0; x<length; x++){
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
            bomb = '<:crafter:646808734483611669>';
            break;
        default:
            bomb = '🎆';
    }

    if(msg.guild.name.toLowerCase().includes('specky')){
        bomb = '<:specky:653319769516146729>';
    }

    // height and length have to be inverted for some reason
    let text = `Welcome to MineSweeper!\nBoard: ${height}x${length}\nBombs: ${bombs}\n`

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