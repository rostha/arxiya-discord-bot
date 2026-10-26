const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "membercount",
  category: "Information", 
  aliases: ["mc"], 
  cooldown: 3, 
  usage: ">membercount", 
  description: "Shows the membercount of the server", 
  memberpermissions: ["MANAGE_MESSAGES"], 
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
    const guildid = message.guild.id
    var memberCount = client.guilds.cache.get(`${guildid}`).memberCount; 
const em1 =  new MessageEmbed()

.setDescription(`**${memberCount}**`)
        .setAuthor(`Members`, message.guild.iconURL())
        .setFooter(` ${message.guild.name} || ${client.user.username} `)
        .setColor(client.b.b)
        .setTimestamp()
        message.channel.send({embeds :[em1]})
  }catch{}

  }
}

