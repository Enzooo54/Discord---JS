const { SlashCommandBuilder, PermissionsBitField, Message } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Séléctionnez un utilisateur à débannir')
        .addStringOption(option =>
            option
                .setName('id')
                .setDescription('L\'utilisateur à débannir')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getString('id');
        const author = interaction.guild.members.cache.get(interaction.user.id);

        if (author.permissions.has([ PermissionsBitField.Flags.BanMembers ])) {
            await interaction.guild.members.unban(user);
            await interaction.reply({ content: `L'utilisateur ${user} a été débanni !`, ephemeral: false });
        } else {
            await interaction.reply({ content: `Vous n'avez pas la permission de débannir cet utilisateur !`, ephemeral: true });
        }
    }
}