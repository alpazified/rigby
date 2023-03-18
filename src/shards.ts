import { ShardingManager } from 'discord.js';
require('dotenv').config();


const manager = new ShardingManager(`${__dirname}/structures/Client.js`, {
    totalShards: 'auto',
    shardList: 'auto',
    mode: 'worker',
    token: process.env.DISCORD_TOKEN
});

manager.on('shardCreate', (shard) => {
    console.log(`[SHARD] - Launched shard ${shard.id}`);
});

manager.spawn();