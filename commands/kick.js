const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Séléctionnez un utilisateur à kick')
        .addUserOption(option => 
            option
                .setName('utilisateur')
                .setDescription('L\'utilisateur à kick')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('raison')
                .setDescription('La raison du kick')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur');
        const reason = interaction.options.getString('raison') || 'Aucune raison spécifiée';
        const members = interaction.guild.members.cache.get(user.id);
        const author = interaction.guild.members.cache.get(interaction.user.id);

        if (author.permissions.has([ PermissionsBitField.Flags.KickMembers ])) {
            await members.kick(reason);
            await interaction.reply({ content: `L'utilisateur ${user} a été kick pour la raison suivante : ${reason}`, ephemeral: false });
        } else {
            await interaction.reply({ content: `Vous n'avez pas la permission de kick cet utilisateur !`, ephemeral: true });
        }
    }
}