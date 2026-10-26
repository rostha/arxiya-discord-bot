const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "suggestion",
  category: "utility", 
  aliases: ["suggest"], 
  cooldown: 40, 
  usage: ">suggest <yoursuggestion>", 
  description: "Provide suggestions to improve arxiya", 
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

  message.chanel.send(`Thanks for your suggestion <a:AnimePray:902555440397819935>`)
  const logchannel = message.guild.channels.cache.get(config.report)
  const embed = new MessageEmbed()
  .setColor(client.b.b)
  .setAuthor(`${message.author.username}`,message.author.avatarURL({dynamic:true}))
  .setDescription(`${message.content}`)
  .setTimestamp()
  .setFooter(`${message.guild.name} | ${message.guild.id} | ${message.channel.name}`)
  logchannel.send({embeds:[embed]})

  }
}

