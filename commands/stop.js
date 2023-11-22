const { SlashCommandBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Arrête le bot'),
    async execute(interaction) {
        const author = interaction.guild.members.cache.get(interaction.user.id);
        if (author.PermissionsBitField.has([ PermissionsBitField.Flags.Administrator ])) {
            await interaction.reply({ content: 'Arret du bot en cours ....', ephemeral: false });
            process.exit();
        }
    }
}