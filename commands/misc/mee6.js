const mee6 = require('mee6-levels-api')

module.exports.run = async (bot, msg, args, config) => {

    var serverID, userID;

    if(args[1]) serverID = args[1];
    if(args[2]) userID = args[2];

    switch(args[0]){
        case "server":
        case "servers":
        case "lb":
        case "leaderboard":
            try{
                mee6.getLeaderboard(serverID).then(leaderboard => {
                    console.log(leaderboard)
                    for(const user of leaderboard) msg.channel.send(`${user.tag} - ${user.rank}`);
                })
            }catch(e){
                msg.channel.send("Error occurred [server ID may be wrong]")
            }
        break

        case "roles":
        case "role":
        case "rolerewards":
            try{
                mee6.getRoleRewards(serverID).then(rewards => {
                    console.log(rewards)
                    for(const reward of rewards) msg.channel.send(`${reward.role.name} - Given at level **${reward.rank}**`);
                })
            }catch(e){
                msg.channel.send("Error occurred [server ID may be wrong]")
            }
        break

        case "xp":
        case "experience":
            try{
                mee6.getUserXP(serverID, userID).then(user => {
                    console.log(user)
                    msg.channel.send(`${user.tag} is at level **${user.level}** and at rank **${user.rank}**`);
                })
            }catch(e){
                msg.channel.send("Error occurred [server ID or user ID may be wrong]")
            }
        break

        default:
            msg.channel.send("You have to define an action [server/roles/xp]");
    }
}

module.exports.config = {
    name: "mee6",
	description: "Gives informations from MEE6's leaderboard!",
    usage: `<"server / roles / xp"> <serverID> [userID]`,
    category: `misc`,
	accessableby: "Members",
    aliases: ["status","st"]
}