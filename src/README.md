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

| Property     | Type     | Example                           | Info                                            | Required |
|--------------|----------|-----------------------------------|-------------------------------------------------|----------|
| name         | String   | "hello"                           | lowercase and no spaces                         | true     |
| category     | String   | "fun"                             | "help" command will show the various categories | false    |
| description  | String   | "says hi to you"                  | everything works                                | false    |
| usage        | String   | "<@user>"                         | example result: "sb!hello <@user>"              | false    |
| type         | String   | "send"                            | if "send", it will send the returned value      | false    |
| template     | String   | "test"                            | the command template to use for the command     | false    |
| data         | Object   | { text: 'hi' }                    | the data to pass trough the command template    | false    |
| limited      | Object   | { guild, channel, user }          | properties should be a string or array of IDs   | false    |
| `anything`   | Function | (bot,msg)=>msg.channel.send("hi") | the function that will be called                | true     |
| aliases      | Array    | ["hi","howdy"]                    | lowercase and no spaces                         | false    |
| userPerms    | Array    | ["ADMINISTRATOR"]                 | permissions that the user should have           | false    |
| botPerms     | Array    | ["BAN_MEMBERS"]                   | permissions that the bot should have            | false    |
| flags        | Array    | ["funny","fun"]                   | may change the result of the command `"--flag"` | false    |
| cooldown     | Number   | 10000                             | how long to wait for rerunning the command (ms) | false    |

Note: You can have **ONLY ONE** exported function in the entire file
Note: Creating a template counts as one exported function

## 1.3. Console

Console commands are called each time you enter a string in the terminal.

| Property     | Type     | Example                 | Info                             | Required |
|--------------|----------|-------------------------|----------------------------------|----------|
| name         | String   | "hello"                 | lowercase and no spaces          | true     |
| aliases      | Array    | ["hi","howdy"]          | lowercase and no spaces          | false    |
| `anything`   | Function | ()=>{console.log("hi")} | the function that will be called | true     |

Note: You can have **ONLY ONE** exported function in the entire file

## 1.4. Emotes

This folder makes it easier to save and use emojis without having to write them multiple times over different files.

| Property   | Type   | Example    |
|------------|--------|------------|
| `anything` | String | joy: "😂" |

Example:
```js
function(bot,msg){
    msg.channel.send(bot.emotes.joy)
}
```

## 1.5. Events

Events get called by the [Discord.js](https://discord.js.org/#/docs/main/stable/class/Client), [node-cron](https://www.npmjs.com/package/node-cron) (e.g. "0 20 4 * * *") or by custom events (e.g. "commandError").

| Property     | Type     | Example                       | Info                             | Required |
|--------------|----------|-------------------------------|----------------------------------|----------|
| event        | String   | "message"                     | any event emitted from one above | true     |
| emitter      | String   | "bot"                         | `bot` or `process`               | false    |
| type         | String   | "once"                        | `on` or `once`                   | false    |
| timezone     | String   | "Europe/Rome"                 | One of [these](https://raw.githubusercontent.com/node-cron/tz-offset/master/generated/offsets.json) timezones | false |
| `anything`   | Function | (bot,msg)=>{console.log(msg)} | the function that will be called | true     |

Note: You can have **ONLY ONE** exported function in the entire file

## 1.6. Handlers

Handlers are files, which get called from the `generalhandler.js` file.
Files in `handlers/loader` will be automatically called.

## 1.7. Languages

The language files get loaded into `require.extensions` for extending the languages supported.

## 1.8. Modules

The module files get loaded into `bot.modules` for easier access to common functions and properties.

## 1.9. Prototypes

The prototypes folder is code which adds (or modifies) prototypes.

Example:
```js
module.exports = () => {
    String.prototype.h = function(){
        this = "h";
    }
}
```

## 1.10. Templates

Templates offer an easier way to create commands with similar code without having to copy and paste.

Example:
```js
module.exports.test = function({text}){
    return function(bot,msg){
        return msg.channel.send("msg.content\n"+text);
    }
}
```

# 2. Addidional Informations

## 2.1. Supported Programming Languages

- JavaScript (.js)
- CoffeeScript (.coffee)
- Koffee (.koffee)
- Iced CoffeeScript (.iced)
- SpeckyBotScript (.sbs)
