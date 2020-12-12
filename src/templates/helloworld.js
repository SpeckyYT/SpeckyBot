module.exports.helloworld = ({language}) =>
    function(bot,msg){
        return msg.channel.send(`\`${language} (templates)\`: Hello World!`)
    }
