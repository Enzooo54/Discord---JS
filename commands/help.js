const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
    data : new SlashCommandBuilder()
        .setName('help')
        .setDescription('Affiche la liste des commandes'),
	async execute(interaction) {
		defaultEmbed = {
			color: parseInt('#0099ff', 16),
			title: 'Les commandes disponibles',
			description: '**Ici tu trouveras toutes les commandes du bot :**\nVoici les catégories de commandes disponibles',
			thumbnail: {
				url: 'https://i.imgur.com/76DiNuz.jpg',
			},
			fields: [
				{ name: '👨‍💻 Utilisateur', value: 'Affiche les commandes utilisateurs' },
				{ name: '🔨 Modérateur', value: 'Affiche les commandes des modérateurs' },
				{ name: '👑 Administrateur', value: 'Affiche les commandes des administateurs' },
			],
			timestamp: new Date(),
			footer: {
				text: 'Demandé par ' + interaction.user.username,
				icon_url: interaction.user.avatarURL(),
			},
		}
		const select = new StringSelectMenuBuilder()
			.setCustomId('Menu')
			.setPlaceholder('Voici le menu d\'aide')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Menu d\'aide')
					.setDescription('Affiche le menu d\'aide')
					.setValue('help'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Utilisateur')
					.setDescription('Commandes pour les utilisateurs')
					.setValue('user'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Modérateur')
					.setDescription('Commandes pour les modérateurs')
					.setValue('moderation'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Administrateur')
					.setDescription('Commandes pour les administrateurs')
					.setValue('admin'),
			);

		const row = new ActionRowBuilder()
			.addComponents(select);

		await interaction.reply({
			embeds: [defaultEmbed],
			components: [row],
		});
	},
	async handleMenuInteraction(interaction) {
		const author = interaction.guild.members.cache.get(interaction.user.id);
		const authorAvatar = interaction.user.avatarURL();
		const value = interaction.values[0];

		let embed = new EmbedBuilder()
			.setColor('#0099ff')
			.setThumbnail("https://i.imgur.com/76DiNuz.jpg")
			.setTimestamp()
			.setFooter({
				text: `Demandé par ${author.user.username}`,
				iconURL: `${authorAvatar}`});

		switch (value) {
			case 'help':
				embed = defaultEmbed;
				break;
			case 'user':
				embed.setTitle('Commandes pour les utilisateurs')
					.setDescription('Voici les commandes pour les utilisateurs')
					.addFields(
						{ name: '/help', value: 'Affiche la liste des commandes' },
						{ name: '/ping', value: 'Affiche le ping du bot' },
						{ name: '/perm', value: 'Affiche les permissions de l\'utilisateur' }
					);
				break;
			case 'moderation':
				embed.setTitle('Commandes pour les modérateurs')
					.setDescription('Voici les commandes pour les modérateurs')
					.addFields(
						{ name: '/ban', value: 'Bannir un utilisateur' },
						{ name: '/kick', value: 'Expulser un utilisateur' },
						{ name: '/unban', value: 'Muter un utilisateur' },
						{ name: '/clear', value: 'Clear les messages d\'un channel' },
						{ name: '/banlist', value: 'Affiche la liste des utilisateurs bannis'}
					);
				break;
			case 'admin':
				embed.setTitle('Commandes pour les administrateurs')
					.setDescription('Voici les commandes pour les administrateurs')
					.addFields(
						{ name: '/stop', value: 'Stop le bot' },
						{ name: '/soon', value: 'SOON' },
						{ name: '/soon', value: 'SOON' }
					);
				break;
			default:
				embed.setTitle('Erreur')
					.setDescription('Une erreur est survenue');
				break;
		}
		try {
			await interaction.update({ embeds: [embed] });
		} catch (error) {
			console.error("Une erreur est survenue");
		}

	}
}