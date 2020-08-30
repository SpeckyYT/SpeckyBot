import { Message } from "discord.js";

declare class ExtendedMessage extends Message {
    ARGS:Array<string>
    Args:Array<string>
    _flags:Array<string>
    args:Array<string>
    flag(input:string):boolean
    hasFlag(input:string):boolean
    links:Array<string>
    readonly _extended:boolean
}


declare class CmdMessage extends ExtendedMessage {
    command:string
    cmdContent:string
}
