const Discord = require('discord.js');
module.exports = async (client, commands, options = {debug: false, guildId: null}) => {
    const log = (message) => options.debug && console.log(message)

    const ready = client.readyAt ? await Promise.resolve() : new Promise((resolve) => client.once('ready', resolve))
    await ready
    const currentCommands = await client.application.commands.fetch(options.guildId && {guildId: options.guildId})

    log(`Synchronisation des commandes ....`)
    log(`Commandes actuelles: ${currentCommands.size} - Commandes à synchroniser: ${commands.length}`)

    const newCommands = commands.filter((command) => !currentCommands.some((c) => c.name === command.name))

    for (const newCommand of newCommands) { 
    log(`${newCommand.name} commande ajoutée`)
    await client.application.commands.create(newCommand, options.guildId)
    }
    log(`${newCommands.length} commandes ajoutées`)

    const deletedCommands = currentCommands
    .filter((command) => !commands.some((c) => c.name === command.name))
    .toJSON()
    for (const deletedCommand of deletedCommands) { 
    await deletedCommand.delete()
    }
    log(`${deletedCommands.length} commandes supprimées`)
    const updatedCommands = commands.filter((command) =>    
currentCommands.some((c) => c.name === command.name)
    )
    let updatedCommandCount = 0
    for (const updatedCommand of updatedCommands) {
    const newCommand = updatedCommand
    const previousCommand = currentCommands.find(
      (c) => c.name === updatedCommand.name
    )
    let modified = false
    if (previousCommand.description !== newCommand.description) modified = true
    if (
      !Discord.ApplicationCommand.optionsEqual(
        previousCommand.options ?? [],
        newCommand.options ?? []
      )
    )
      modified = true
    if (modified) {
      await previousCommand.edit(newCommand)
      updatedCommandCount++
    }
    }
    log(`${updatedCommandCount} commandes actualisé!`)
    log(`Commandes synchronisées!`)
    return {
    currentCommandCount: currentCommands.size,
    newCommandCount: newCommands.length,
    deletedCommandCount: deletedCommands.length,
    updatedCommandCount
    }
}
