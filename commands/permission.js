const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("perm")
        .setDescription("Séléctionnez un utilisateur")
        .addUserOption(option => 
            option
                .setName("utilisateur")
                .setDescription("L'utilisateur")
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur');
        const member = interaction.guild.members.cache.get(user.id);

        /* if (member.permissions.has([ PermissionsBitField.Flags.BanMembers])) {
            await interaction.reply('L\'utilisateur a les permissions suivantes : BAN_MEMBERS');
        }

        if (member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            await interaction.reply('L\'utilisateur a les permissions suivantes : KICK_MEMBERS');
        } */
                
        await interaction.reply({ content: `L'utilisateur ${user.tag} a les permissions suivantes : ${member.permissions.toArray()}`, ephemeral: false });
    }
}