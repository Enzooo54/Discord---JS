const synchronyseSlashCommands = require('../modules/sync_commands.js')
const { ActivityType } = require('discord.js')
module.exports = {
    name: 'ready',
    async execute(client) {
        console.log(`Connecté en tant que ${client.user.username}!`);
        client.user.setActivity('/help', { type: ActivityType.Watching });
        client.user.setUsername('Bot D\'Apprentissage');
        const channelId = "1168249101918425130"
        const channel = client.channels.cache.get(channelId)
        /* if (channel) {
            channel.send(`Bot connecté en tant que ${client.user.username}!`)
        } */

        await synchronyseSlashCommands(client, client.commands.map((c) => c.data),
        { 
            debug: true,  
        }
    )
    }
}