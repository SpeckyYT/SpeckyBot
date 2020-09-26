module.exports =
    name: "f"
    description: "F"
    usage: "<anything>"
    category: "misc"
    run: (bot, msg) =>
        thing = msg.Args[0];
        if !thing then return bot.cmdError("You have to include some text or an emote.");
        thing = thing.slice(0,50);
        msg.channel.send("#{thing}#{thing}#{thing}#{thing}\n#{thing}\n#{thing}#{thing}#{thing}#{thing}\n#{thing}\n#{thing}\n#{thing}")
