const { token } = require('./config.json');

const fs = require('fs')
const {Client, Collection, GatewayIntentBits, Options} = require('discord.js')


const client = new Client({
  intents: [
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessageReactions
  ],
  });
  // Nous créons une collection pour les commandes
  client.commands = new Collection()
  const commandFiles = fs
    .readdirSync('./commands')
    .filter((file) => file.endsWith('.js'))
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.data.name, command)
  }
  // Les events comme par exemple ready.js (quand le robot s'allume), 
  // ou encore messageCreate.js (quand un utilisateur/robot envoie un message)
  const eventFiles = fs
    .readdirSync('./events')
    .filter((file) => file.endsWith('.js'))
  for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client))
    } else {
      client.on(event.name, (...args) => event.execute(...args, client))
    }
  }
  // L'event interactionCreate directement ici, car c'est en soit le coeur du robot.
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return
    const command = client.commands.get(interaction.commandName)
    if (!command) return
    // On log quand un utilisateur fait une commande
    try {
      await console.log(
        `/${interaction.commandName} — Par ${interaction.user.username}`
      )
      await command.execute(interaction, client)
      // Mais s'il y a une erreur, 
      // alors on log ça et on renvoi un message d'erreur seulement à la personne (ephemeral: true)
    } catch (error) {
      console.error(error)
      return interaction.reply({
        content: "Une erreur s'est produite lors de l'exécution de cette commande !",
        ephemeral: true,
        fetchReply: true
      })
    }
  })

client.login(process.env.TOKEN);