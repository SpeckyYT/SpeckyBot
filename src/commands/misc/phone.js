module.exports = {
    name: "phone",
    description: "Lets you chat with some random dude from the internet",
    usage: "[c/cancel]",
    category: "misc",
    aliases: ["userphone","call"]
}

module.exports.run = (bot, msg) => {
    let { userphone } = bot;

    const exists = userphone.find(p => p.includes(msg.author.id));

    if(exists){
        if(['cancel','c'].includes(msg.args[0])){
            userphone = userphone.delete(userphone.indexOf(exists));
            return msg.channel.send("You were removed from the call list");
        }
        return bot.cmdError("You are already waiting for a call or you are already in one");
    }

    const group = bot.userphone.find(p => p.length < 2);

    if(!group){
        userphone.push([msg.author.id]);
        return msg.channel.send("You are now waiting for a call");
    }

    userphone[userphone.indexOf(group)].push(msg.author.id);

    const [userID1, userID2] = userphone[userphone.indexOf(group)];

    const [user1,user2] = [bot.users.cache.get(userID1), bot.users.cache.get(userID2)];

    if(!user1){
        userphone = userphone.delete(userphone.indexOf(group));
        return bot.cmdError(`User **${userID1}** not found, you were now kicked from the waiting call.`)
    }
    if(!user2){
        userphone = userphone.delete(userphone.indexOf(group));
        return bot.cmdError(`User **${userID2}** not found, you were now kicked from the waiting call.`)
    }

    Promise.all([user1.createDM(),user2.createDM()])
    .then(([userDM1,userDM2]) => {
        [userDM1,userDM2].forEach(u=>u.send(`You are now in the call between **${user1.tag}** and **${user2.tag}**\nType \`c\` or \`cancel\` to end the call.`))

        const collectors = [userDM1,userDM2].map(DMChannel => DMChannel.createMessageCollector(m => !m.author.bot, {idle: 3*60*1000}))

        let ended = false;

        collectors.forEach(coll => {
            coll.on('collect', message => {
                if(['c','cancel'].includes(message.content.toLowerCase())){
                    userphone = userphone.delete(userphone.indexOf(group));
                    coll.stop();
                }
                switch(message.channel.id){
                    case userDM1.id:
                        userDM2.send(`**${userDM1.recipient.tag}:** ${message.content || '...'}`); break;
                    case userDM2.id:
                        userDM1.send(`**${userDM2.recipient.tag}:** ${message.content || '...'}`); break;
                }
            })
            coll.on('end', () => collectors.forEach(c => {
                [userDM1,userDM2].forEach(dm => {
                    c.stop()
                    if(!ended){
                        ended = true;
                        dm.send("Call ended");
                    }
                })
            }))
        })

    })
    .catch(() => {
        userphone = userphone.delete(userphone.indexOf(group));
    })
}
