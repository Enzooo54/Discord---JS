const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Séléctionnez un utilisateur à bannir")
        .addUserOption(option => 
            option
                .setName("utilisateur")
                .setDescription("L'utilisateur à bannir")
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName("raison")
                .setDescription("La raison du ban")
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur');
        const reason = interaction.options.getString('raison') || 'Aucune raison spécifiée';
        const member = interaction.guild.members.cache.get(user.id);
        const author = interaction.guild.members.cache.get(interaction.user.id);

        if (author.permissions.has([ PermissionsBitField.Flags.BanMembers ])) {
            await member.ban({ reason });
            await interaction.reply({ content: `**Le marteau du bannissement a frappé 🔨** \n${user} a été banni pour la raison suivante : ${reason}`, ephemeral: false });
        } else {
            await interaction.reply({ content: `Vous n'avez pas la permission de bannir cet utilisateur !`, ephemeral: true });
        }
                

    }
}