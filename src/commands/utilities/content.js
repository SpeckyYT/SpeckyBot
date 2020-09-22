module.exports = {
    name: "content",
    category: "utilities",
    description: "Checks all the content types of the message",
    usage: "<text>"
}

module.exports.run = (bot,msg) => {
    const {content, args, Args, ARGS, cmdContent, command, links, _flags} = msg;
    return msg.channel.send(
        JSON.stringify({
            command,
            content,
            cmdContent,
            args,
            Args,
            ARGS,
            links,
            _flags
        },null,2)
        .code('json')
    );
}
