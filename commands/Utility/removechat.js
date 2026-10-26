const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const Schema = require('../../models/chatbot')
module.exports = {
  name: "removechat",
  category: "utilty", 
  aliases: ["remove-chat","disable-chatbpt"], 
  cooldown: 5, 
  usage: ">remove chat <mention channel>", 
  description: "remove's arxiya's chatbot system", 
  memberpermissions: ["MANAGE_GUILD"], 
  requiredroles: [],
  alloweduserids: [],
  minargs: 1, 
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
       message.channel.send(`${client.emotes.success} Chat Bot Removed for this guild.`)
        })
    
    }
    catch (e){
      if(e) return;
    }
  }
}

