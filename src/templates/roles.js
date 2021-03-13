const checkIfRoleExists = (msg,role) => typeof role == 'string' && msg.guild.roles.cache.has(role);

module.exports.addRole = ({role}) =>
    async function(bot,msg){
        const roleOBJ = msg.guild.roles.cache.get(role);

        if(!checkIfRoleExists(msg,role)) return bot.cmdError('Role not found');

        if(msg.member.roles.cache.has(role)) return bot.cmdError('You already have that role');

        await msg.member.roles.add(role);

        return bot.cmdSuccess(`You got the ${roleOBJ} role!`);
    }

module.exports.removeRole = ({role}) =>
    async function(bot,msg){
        const roleOBJ = msg.guild.roles.cache.get(role);

        if(!checkIfRoleExists(msg,role)) return bot.cmdError('Role not found');

        if(!msg.member.roles.cache.has(role)) return bot.cmdError("You don't have that role");

        await msg.member.roles.remove(role);

        return bot.cmdSuccess(`The ${roleOBJ} role got removed from you!`);
    }

module.exports.toggleRole = ({role}) =>
    async function(bot,msg){
        if(msg.member.roles.cache.has(role)){
            return module.exports.removeRole({role})(bot,msg);
        }else{
            return module.exports.addRole({role})(bot,msg);
        }
    }
