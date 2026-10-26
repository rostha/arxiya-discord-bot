const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const Schema = require('../../models/logs')
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "disablemsglogs",
  category: "utility", 
  aliases: ["disablemessagelogs",'disable-msg-logs'], 
  cooldown: 5, 
  usage: ">disablemsglogs <channel>", 
  description: "Removes the message logging system", 
  memberpermissions: ["MANAGE_GUILD"], 
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
       
        const channell = message.mentions.channels.first()
     if (!channell) return message.reply(`${client.emotes.error} You must mention a channel`)
     Schema.findOneAndDelete({
         guild: message.guild.id
     }, async (err, data) => {
    message.channel.send(`${client.emotes.success} Messagelog system Removed for this guild.`)
     })
 
 }
 catch (e){
   if(e) return;
 }

  }
}

