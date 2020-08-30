module.exports = {
    name: "content",
    category: "utilities",
    description: "Checks all the content types of the message",
    usage: "<text>"
}

import { SpeckyClient } from "../../../typings/Client";
import { CmdMessage } from "../../../typings/Message";

module.exports.run = (bot:SpeckyClient,msg:CmdMessage) => {
    const {content, args, Args, ARGS, cmdContent, command, links, _flags} = msg;
    return msg.channel.send(`\`\`\`js\n${
        JSON.stringify({
            content,
            cmdContent,
            args,
            Args,
            ARGS,
            command,
            links,
            _flags
        },null,4)
    }\n\`\`\``);
}
