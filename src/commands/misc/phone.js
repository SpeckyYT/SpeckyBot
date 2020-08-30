module.exports = {
    name: "phone",
    description: "Lets you chat with some random dude from the internet",
    usage: "[c/cancel]",
    category: "misc",
    aliases: ["userphone","call"]
}

module.exports.run = (bot, msg) => {
    // return bot.cmdError("Command not implemented");

    let { userphone } = bot;

    const exists = userphone.find(p => p.includes(msg.author.id));

    if(exists){
        if(['cancel','c'].includes(msg.cmdContent)){
            userphone = userphone.delete(userphone.indexOf(exists));
            return msg.channel.send("You was removed from the call list");
        }
        return bot.cmdError("You are already waiting for or in a call");
    }

    const group = bot.userphone.find(p => p.length < 2);

    if(!group){
        userphone.push([msg.author.id]);
        return msg.channel.send("You are now waiting for a call");
    }

    userphone[userphone.indexOf(group)].push(msg.author.id);

    const [userID1, userID2] = userphone[userphone.indexOf(group)];

    const [user1,user2] = [bot.users.get(userID1), bot.users.get(userID2)];

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

        const listener = (message) => {
            if(message.author.bot) return;
            if([userDM1.id,userDM2.id].includes(message.channel.id)){
                if(['c','cancel'].includes(message.content.toLowerCase())){
                    userphone = userphone.delete(userphone.indexOf(group));
                    bot.off('message', listener);
                    return [userDM1,userDM2].forEach(dm => dm.send("Call ended"));
                }
                switch(message.channel.id){
                    case userDM1.id:
                        userDM2.send(`**${userDM1.recipient.tag}:** ${message.content || '...'}`); break;
                    case userDM2.id:
                        userDM1.send(`**${userDM2.recipient.tag}:** ${message.content || '...'}`); break;
                }
            }
        }

        bot.on('message', listener)
    })
    .catch(() => {
        userphone = userphone.delete(userphone.indexOf(group));
    })

}
