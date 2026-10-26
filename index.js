const runtimeEnv = require("./environment");
const { Collection, Client, Discord, MessageEmbed } = require('discord.js');
const config = require(`./botconfig/config.json`);

const settings = require(`./botconfig/settings.json`);

const colors = require("colors");
const fetch = require("node-fetch")
const client = new Client({
    
  
    shards: "auto",
    allowedMentions: {
      parse: [ ],
      repliedUser: false,
    },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [
      "GUILDS",
      "GUILD_MEMBERS",
      "GUILD_BANS",
      "GUILD_INTEGRATIONS",
      "GUILD_WEBHOOKS",
      "GUILD_INVITES",
      "GUILD_VOICE_STATES",
      "GUILD_PRESENCES",
      "GUILD_MESSAGES",
      "GUILD_MESSAGE_REACTIONS",
      "GUILD_MESSAGE_TYPING",
      "DIRECT_MESSAGES",
      "DIRECT_MESSAGE_REACTIONS",
      "DIRECT_MESSAGE_TYPING",
  ],
    presence: {
      activity: {
        name: `Music`, 
        type: "LISTENING", 
      },
      status: "online"
    }
});
client.emotes = require("./botconfig/emotes")

const mongoose = require("mongoose");
mongoose.connect(runtimeEnv.MONGODB_URI, {
       useUnifiedTopology: true,
       useNewUrlParser: true,
     useFindAndModify: false,
}).then(console.log('Connected to mongodb!'))

client.b = require("./botconfig/colors")
client.g = require("./botconfig/colors")
client.y = require("./botconfig/colors")
client.p = require("./botconfig/colors")
client.r = require("./botconfig/colors")
client.commands = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection()
client.editedsnipes = new Collection()

client.categories = require("fs").readdirSync(`./commands`);
["events", "commands", "slashCommands", settings.antiCrash ? "antiCrash" : null]
    .filter(Boolean)
    .forEach(h => {
        require(`./handlers/${h}`)(client);
    })
const aichatbot = require("./Features/chatbot")(client)
const snipes = require("./Features/snipes")(client)

const mlogs = require("./Features/msg-logs")(client)
client.login(runtimeEnv.DISCORD_TOKEN)


/*// let count = 0;
setInterval(
  () =>
    require("node-fetch")(process.env.URL).then(() =>
      console.log(`[${++count}] My Ping is there `)
    ),
    120000
);
//*/

