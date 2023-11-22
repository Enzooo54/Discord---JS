const {EmbedBuilder} = require("discord.js");

module.exports = {
    data: {
        name: "ping",
        description: "Renvoie le ping du bot",
        options: []
    },

    async execute(interaction, client) {
        const PingBeforeEmbed = new EmbedBuilder().setAuthor({
            name: "L'oiseau va revenir avec le ping du bot...",
            iconURL: client.user.avatarURL({dynamic: true, size: 4096})
        }).setColor("#0099ff").setTimestamp().toJSON();

        const sent = await interaction.reply({
            embeds: [PingBeforeEmbed], 
            fetchReply: true,
            ephemeral: true
        })

        const TotalPing = sent.createdTimestamp - interaction.createdTimestamp
        const PingEmbed = new EmbedBuilder()
        .setAuthor({
            name: `Le ping de ${client.user.username}`,
            iconURL: client.user.avatarURL({dynamic: true, size: 4096})
        })
        .addFields(
            {
                name: "Total du ping",
                value: `${TotalPing}ms`,
                inline: true
            },
            {
                name: "Websocket",
                value: `${client.ws.ping}ms`,
                inline: true
            }
        )
        await interaction.editReply({
            embeds: [PingEmbed],
            ephemeral: true
        })
    }
}