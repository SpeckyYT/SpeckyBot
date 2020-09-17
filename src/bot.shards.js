const { ShardingManager } = require('discord.js');
const { join } = require('path');

const { token } = require(join(process.cwd(),'..','config.json'));

const manager = new ShardingManager(join(__dirname,'bot.js'),
    {
        token: token,
    }
);

manager.spawn()

manager.on('launch', shard => console.log(`Launched shard ${shard.id}`));
