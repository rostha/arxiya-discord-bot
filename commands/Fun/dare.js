const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const Memer = require("random-jokes-api");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "dare",
  category: "Fun", 
  aliases: [], 
  cooldown: 3, 
  usage: "dare", 
  description: "Gives a random dare", 
  memberpermissions: [], 
  requiredroles: [],
  alloweduserids: [],
  minargs: 0, 
  maxargs: 0, 
  minplusargs: 0, 
  maxplusargs: 0,
  argsmissing_message: "", 
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try{
        let truths = Memer.dare()
        const truthembed = new MessageEmbed()
        .setColor(client.y.y)
        .setFooter(`Dare for ${message.author.username}  • ${client.user.username}`)
        .setTimestamp()
        .setAuthor(`${message.author.displayName || `${message.author.username}`}`,message.author.avatarURL({dynamic: true}))
        .setDescription(`**${truths}**`)
                    message.channel.send({embeds : [truthembed]})
        }catch{}


  }
}

