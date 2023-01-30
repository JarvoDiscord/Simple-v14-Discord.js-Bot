const Discord = require("discord.js")

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("hi") // The name of the slash command
    .setDescription("Say's Hi!"), // A short description about the slash command.
  
  async execute(interaction) {
    
    interaction.reply({ // You always should reply to an interaction. If you want the interaction to reply to send another message, use interaction.followUp()
      content: "Hello there!",
      ephemeral: true // You set this to true if you want the message only be visible by the one who ran the command. Nobody else will see it and the message will disappear after a while.
    })
  }
}
