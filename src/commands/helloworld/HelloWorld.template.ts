import { SpeckyClient } from "../../../typings/Client";
import { CmdMessage } from "../../../typings/Message";

module.exports = {
    name: "hwtts",
    description: "Hello World!",
    usage: '',
    category: 'helloworld',
    aliases: [],
    type: 'template',
    run: async (bot:SpeckyClient, msg:CmdMessage): Promise<string> => "`TypeScript (templates)`: Hello World!"
}
