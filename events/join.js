const { Events } = require("discord.js");

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const channel = member.guild.channels.cache.find(ch => ch.name === 'bienvenue');
        if (!channel) return;
        channel.send(`Nous souhaitons la bienvenue à : ${member} sur le serveur ! 🎉`);
    }
}