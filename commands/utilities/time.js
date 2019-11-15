module.exports.run = async (bot, msg, args, config) => {
    if(isNaN(args[0])) return msg.channel.send('Invalid UNIX Timestamp');
    const unix_timestamp = args[0]
    var date = new Date(unix_timestamp);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    msg.channel.send(formattedTime)
}

module.exports.config = {
	name: "time",
	description: "Turns UNIX time into \"readable\" time!",
	usage: `<UNIX Timestamp>`,
	category: `utilities`,
	accessableby: "Members",
    aliases: ["si","serveri"]
}