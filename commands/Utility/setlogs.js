const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const Schema = require('../../models/logs')
module.exports = {
  name: "setmsglogs",
  category: "utilty", 
  aliases: ["setupmessagelogs","setmesssagelogs"], 
  cooldown: 4, 
  usage: ">setmsglogs <mention channel>", 
  description: "Sets arxiya's messagelog system", 
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
        const channell = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if (!channell) return message.reply('Please mention a channel');
        if (!channell.permissionsFor(message.client.user).has("SEND_MESSAGES","EMBED_LINKS"))
         return message.channel.send(`I don't have permission to \`\ SEND_MESSAGES, EMBED_LINKS \`\ in ${channell}`)
        Schema.findOne({
            guild: message.guild.id
        }, async (err, data) => {
            if (data) data.delete()
            new Schema({
                guild: message.guild.id,
                channel: channell.id,
            }).save();
            message.channel.send(`${client.emotes.success} Message log channel is setup as ${channell}`)
        })
    }catch{}


  }
}

