module.exports = {
    name: 'npm',
    aliases: []
}

let npm = require('npm');

module.exports.run = async (bot, data) => {
    npm.load({},() => {
        if(npm.commands[data.Args[0]]){
            npm.commands[data.Args[0]](data.Args.slice(1),()=>{})
        }else if(data.Args[0]){
            console.log(`Command ${data.Args[0].toUpperCase()} doesn't exist.`.error);
        }else{
            console.log(`NPM Command requires arguments.`.error);
        }
    })
}
