const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "meme",
    category: "fun",
    description: "Sends a random meme from Reddit",
    run: async (client, message, args) => {
     try{
         message.channel.send(`This command is locked for a time being`)
        }catch{}
    }
}
