import { SpeckyClient } from '../../../../typings/Client';
import { CmdMessage } from '../../../../typings/Message';

module.exports = {
    name: 'hwsts',
    description: 'Hello World!',
    category: 'helloworld',
    type: 'send',
    run: (bot:SpeckyClient, msg:CmdMessage): string => '`TypeScript (send)`: Hello World!'
}
