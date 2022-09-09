const Discord = require("discord.js")

const {
    REST
} = require('@discordjs/rest')

const {
    Routes
} = require('discord-api-types/v9')

const fs = require("node:fs")


const client = new Discord.Client({
    intents: [
      GatewayIntentBits.Guilds // And more you can provide by just copy-pasting and changing 'Guilds' to any other intent.
    ],
    partials: [
      Partials.User, // These are the partials. Feel free to remove some.
      Partials.Channel,
      Partials.GuildMember,
      Partials.Message
    ]
})


// Command Handling
client.commands = new Discord.Collection()

fs.readdirSync('./Events').forEach(dirs => {
  const EventFiles = fs.readdirSync(`./Events/${dirs}`)
    .filter(file =>
      file.endsWith('.js')
           )
    
  for (const file of EventFiles) {
    const EventName = file.split(".")[0]
    const Event = require(`./Events/${dirs}/${file}`)
    client.on(EventName, Event.bind(null, client))
  }
})

const commands = [];

fs.readdirSync('./Commands').forEach(dirs => {
  const CommandFiles = fs.readdirSync(`./Commands/${dirs}`)
    .filter(file =>
      file.endsWith('.js')
           )
    
  for (const file of CommandFiles) {
    const command = require(`./Commands/${dirs}/${file}`)
    commands.push(command.data.toJSON())
    client.commands.set(command.data.name, command)
  }
})

const rest = new REST({
  version: '9'
}).setToken(Config.Token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    
    await rest.put(
      Routes.applicationGuildCommands(Config.ClientID, Config.GuildID), {
        body: commands
      },
    );
    
    console.log('Successfully reloaded application (/) commands.');
  
  } catch (error) {
    console.error(error);
  }
})();

client.on("ready", () => {
    console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
})

client.login(Token).catch(console.error)
