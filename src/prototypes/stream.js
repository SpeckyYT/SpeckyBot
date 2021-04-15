const stream = require('stream');

module.exports = (bot) => {

    stream.prototype.toBuffer = function(){
        return new Promise((res,rej) => {
            const data = [];
            this.on('data', (chunk) => data.push(chunk));
            this.on('end', () => res(Buffer.concat(data)));
            this.on('error', (error) => rej(error))
        });
    }

}
