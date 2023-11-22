const { Events } = require ("discord.js");

module.exports = {
    name: Events.GuildMemberRemove,
    async execute(member) {
        const channel = member.guild.channels.cache.find(ch => ch.name === 'adieu');
        if (!channel) {
            console.log("Le channel adieu n'existe pas !");
            return;
        } else {
            channel.send(`Adieu : ${member}  🥺`);
        }
    }
}