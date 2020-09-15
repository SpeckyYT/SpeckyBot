import { SpeckyClient } from "../../../typings/Client";
import { CmdMessage } from "../../../typings/Message";

module.exports = {
    name: "hwts",
    description: "Hello World!",
    category: 'helloworld',
    aliases: [],
    run: async (bot:SpeckyClient, msg:CmdMessage): Promise<void> => {
        await msg.channel.send("`TypeScript`: Hello World!");
    }
}
