const { SlashCommandBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Supprime les messages')
        .addStringOption(option =>
            option
                .setName('remove')
                .setDescription('Nombre de messages à supprimé')
                .setRequired(true)),
    async execute(interaction) {
        const remove = Number(interaction.options.getString('remove'));
        const author = interaction.guild.members.cache.get(interaction.user.id);
        if (author.permissions.has([ PermissionsBitField.Flags.ManageMessages ])) {
            await interaction.reply({ content: 'Clear en cours ....', ephemeral: false });
            interaction.channel.bulkDelete(remove + 1);
        } else {
            await interaction.reply({ content: 'Vous n\'avez pas la permission d\'utiliser cette commande', ephemeral: true });
        }
    }
}