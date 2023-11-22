const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listban')
        .setDescription('Affiche la liste des utilisateurs bannis'),
    async execute(interaction) {
        const author = interaction.guild.members.cache.get(interaction.user.id);
        if (author.permissions.has([ PermissionsBitField.Flags.BanMembers])) {
            await interaction.guild.bans.fetch()
                .then(banned => {
                    const banlist = banned.map(user => `**${user.user.tag}** avec l'ID : (${user.user.id}) a été banni pour la raison suivante : ${user.reason || 'Aucune raison spécifié'}`).join('\n');
                    if (banlist.length === 0) {
                        interaction.reply({ content: 'Aucun utilisateur banni !', ephemeral: true });
                    } else if (banlist.length >= 1950) banlist = `${banlist.slice(0, 1948)}...`;
                    else interaction.reply({ content: `Liste des utilisateurs bannis : \n${banlist}`, ephemeral: true });
                })
                .catch(error => {
                    console.error(error);
                    interaction.reply({ content: 'Une erreur est survenue lors de la récupération de la liste des utilisateurs bannis !', ephemeral: true });
                });
        } else {
            await interaction.reply({ content: `Vous n'avez pas la permission de voir la liste des utilisateurs bannis !`, ephemeral: true });
        }
    
    }
}