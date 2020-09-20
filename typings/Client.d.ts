import { Client, Collection, RichEmbed } from "discord.js";
import { CmdMessage } from "./Message";

declare class SpeckyClient extends Client {
    aliases:Collection<string,string>
    cache:Cache
    cmdError(error:string):Error
    cmdSuccess(success:string):string
    commands:Collection<string,Command>
    config:Config
    console:Collection<string,ConsoleCommand>
    consoleali:Collection<string,string>
    debug():void
    debugN:number
    delay(time:number):Promise<void>
    embed:RichEmbed
    log(input:string):void
    resetDebug():void
    sleep(time:number):Promise<void>
    stats:Stats
    supportedFiles:RegExp
    wait(time:number):Promise<void>
}

type Config = {
    apikeys:Object
    bannedUsers:Array<string>
    color:string
    extra_apikeys:boolean
    load_nsfw:boolean
    owner:Array<string>
    prefix:string
    reply_unexisting_command:boolean
    token:string
}

type Stats = {
    commandsExecuted:number
    slots:number
}

type Command = {
    name:string
    category?:string
    description?:string
    usage?:string
    type?:string
    run?(bot:SpeckyClient,msg:CmdMessage):Promise<any>
    aliases?:Array<string>
    perms?:Array<string>
    cmdperms?:Array<string>
    flags?:Array<string>
    cooldown?:number
}

type ConsoleCommand = {
    name:string
    aliases?:Array<string>
    run?(bot:SpeckyClient,data:Object):Promise<any>
}

type Cache = {
    messages:Array<CmdMessage>
    lastImage:Object
    console:Object
    chatbot:Object
    cooldown:Collection<string,Date>
    runningcmds:Array<string>
    globalchat:Collection<number,Array<CmdMessage>>
    msg: CmdMessage
}
