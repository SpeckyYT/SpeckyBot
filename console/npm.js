module.exports = {
    name: 'npm',
    aliases: []
}

let npm = require('npm');

module.exports.run = async (bot, args) => {
    npm.load({},() => {
        if(npm.commands[args[0]]){
            npm.commands[args[0]](args.slice(1),()=>{})
        }else if(args[0]){
            console.log(`Command ${args[0].toUpperCase()} doesn't exist.`.error);
        }else{
            console.log(`NPM Command requires arguments.`.error);
        }
    })
}
