const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const Schema = require('../../models/chatbot')
module.exports = {
  name: "setchat",
  category: "utilty", 
  aliases: ["setchatbot","addchat"], 
  cooldown: 5, 
  usage: ">setchat <mention channel>", 
  description: "Sets arxiya's chatbot system", 
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
        if (!channell) return message.reply('Please mention a channel');

        Schema.findOne({
            guild: message.guild.id
        }, async (err, data) => {
            if (data) data.delete()
            new Schema({
                guild: message.guild.id,
                channel: channell.id,
            }).save();
            message.channel.send(`${client.emotes.success} Chat bot channel is setup as ${channell}`)
        })
    }catch{}


  }
}

