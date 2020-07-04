# 1. Source Folder

This folder contains every information what will be processed and loaded in the bot.

## 1.1. Bot Functions

Bot Functions are functions or properties that may be helpful anywhere you have the `bot` object available.

Example:
```js
module.exports = (bot) => {
    bot.helloWorld = function(){
        return "hi!"
    }
}
```

## 1.2. Commands

Commands get loaded in `bot.commands` as a Collection and get called from the event `events/guild/commands.js`.

| Property     | Type     | Example                             | Info                                            | Required |
|--------------|----------|-------------------------------------|-------------------------------------------------|----------|
| name         | String   | "hello"                             | lowercase and no spaces                         | true     |
| description  | String   | "says hi to you"                    | everything works                                | false    |
| usage        | String   | "<@user>"                           | example result: "sb!hello <@user>"              | false    |
| category     | String   | "fun"                               | "help" command will sort the categories         | true     |
| accessableby | String   | "All users"                         | deprecated and no longer used                   | false    |
| aliases      | Array    | ["hi","howdy"]                      | lowercase and no spaces                         | false    |
| perms        | Array    | ["ADMINISTRATOR"]                   | permissions that the user should have           | false    |
| cmdperms     | Array    | ["BAN_MEMBERS"]                     | permissions that the bot should have            | false    |
| flags        | Array    | ["funny","fun"]                     | may change the result of the command ("--flag") | false    |
| cooldown     | Number   | 10000                               | how long to wait for rerunning the command (ms) | false    |
| <anything>   | Function | (bot,msg) => msg.channel.send("hi") | the function that will be called                | true     |

Note: You can have **ONLY ONE** function in the entire command file

## 1.3. Console

Console commands are called each time you enter a string in the terminal.

| Property     | Type     | Example                 | Info                             | Required |
|--------------|----------|-------------------------|----------------------------------|----------|
| name         | String   | "hello"                 | lowercase and no spaces          | true     |
| aliases      | Array    | ["hi","howdy"]          | lowercase and no spaces          | false    |
| <anything>   | Function | ()=>{console.log("hi")} | the function that will be called | true     |

Note: You can have **ONLY ONE** function in the entire command file

## 1.4. Events

Events get called by the Discord's API or by custom events (e.g. "interval_1_min").

| Property     | Type     | Example                       | Info                             | Required |
|--------------|----------|-------------------------------|----------------------------------|----------|
| event        | String   | "message"                     | [Discord.JS](https://discord.js.org/#/docs/main/11.6.4/class/Client) or custom events | true |
| type         | String   | "once"                        | `on` or `once`                   | false    |
| <anything>   | Function | (bot,msg)=>{console.log(msg)} | the function that will be called | true     |

Note: You can have **ONLY ONE** function in the entire command file

## 1.5. Handlers

Handlers are files, which get called from the `generalhandler.js` file.
Files in `handlers/botloader` will be automatically called.

## 1.6. Prototypes

The prototypes folder is code which adds (or modifies) prototypes.

Example:
```js
module.exports = () => {
    String.prototype.h = function(){
        this = "h";
    }
}
```
