import { SpeckyClient } from "../../../../typings/Client";
import { CmdMessage } from "../../../../typings/Message";

module.exports = {
    name: "hwtts",
    description: "Hello World!",
    category: 'helloworld',
    type: 'template',
    run: (bot:SpeckyClient, msg:CmdMessage): string => "`TypeScript (templates)`: Hello World!"
}
