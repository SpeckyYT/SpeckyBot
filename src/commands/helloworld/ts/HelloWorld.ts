import { SpeckyClient } from "../../../../typings/Client";
import { CmdMessage } from "../../../../typings/Message";

module.exports = {
    name: "hwts",
    description: "Hello World!",
    category: 'helloworld',
    run: (bot:SpeckyClient, msg:CmdMessage): Promise<any> => msg.channel.send("`TypeScript`: Hello World!");
}
