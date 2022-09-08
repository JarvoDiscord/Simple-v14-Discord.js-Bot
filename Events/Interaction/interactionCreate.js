const Discord = require("discord.js")
const Config = require("../../config.json")

module.exports = async (client, interaction) => {
    if (!interaction.isCommand() && !interaction.isContextMenuCommand() && !interaction.isMessageContextMenuCommand() && !interaction.isButton()) return; // When the interaction is not a command, not a contextmenu, or not a button, it will not execute.

    if (interaction.isCommand() || interaction.isContextMenuCommand() || interaction.isMessageContextMenuCommand()) { // If the command is a command or an contextmenu, it will run the below code.
        const command = client.commands.get(interaction.commandName) // This is the command (It's the same for ContextMenu as a ContextMenuCommand is just the same as a slash command, only the difference is that ContextMenuCommands are ran through an User Interface.
        if (!command) return // If the command does not exists, return again.

        try {
            await command.execute(interaction) // Try to execute the command.
        } catch (err) {
            if (err) console.error(err) // If it fails, it returns an error.

            await interaction.reply({ // And you inform the users that you have found an error.
                content: `You found an error!`,
                ephemeral: true
            })
        }
    }
}
