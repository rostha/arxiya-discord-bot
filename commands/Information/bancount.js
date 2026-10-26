const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "bancount",
  category: "Information", 
  aliases: ["c"], 
  cooldown: 5, 
  usage: ">bancount", 
  description: "Shows the ban count of the guild", 
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
  
    run: async (client, message, args, Discord) => {

        message.guild.bans.fetch().then(bans => {
            message.channel.send(`${client.user.username} is Counting...`).then(m => m.delete({ timeout: 2000 }));
            const embed = new MessageEmbed()
            .setDescription(`**${bans.size}**`)
            .setAuthor(`Bans`, message.guild.iconURL())
            .setFooter(`${client.user.username} | ${message.guild.name}`)
            .setColor(client.b.b)
            .setTimestamp()
            message.channel.send({embeds :[embed]})
        
        })
              

  }
}}

