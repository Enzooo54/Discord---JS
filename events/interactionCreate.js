const helpCommand = require('../commands/help.js');

module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        if (interaction.isCommand()) {
            // Gérer les commandes slash
        } else if (interaction.isStringSelectMenu()) {
            helpCommand.handleMenuInteraction(interaction);
        }
    },
};