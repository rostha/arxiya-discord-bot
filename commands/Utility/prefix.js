const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json")
const Prefix = require("../../models/prefix");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "prefix",
  category: "Utility", 
  aliases: ["setprefix"], 
  cooldown: 5, 
  usage: "prefix <new prefix>", 
  description: "sets a custom prefix", 
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
    
    const prefix = args[0];
    

    if (!prefix)
      return message.reply(`${client.emotes.error}  Please provide something to add it as a new prefix. for example : prefix <new prefix>`);

    
      if (prefix.length > 5) return message.reply(`${client.emotes.error} The provided new prefix must be under \`5\` characters!`)
     

    const result = await Prefix.findOne({
      guildID: message.guild.id,
    });

    if (result) {
      result.prefix = prefix;
      result.save();

      message.reply(`${client.emotes.success} Server prefix is now updated to ${prefix}`);
    } else if (!result) {
      const data = new Prefix({
        guildID: message.guild.id,
        prefix: prefix,
      });
      data.save();

      message.reply(`${client.emotes.success}  updated the server prefix \` ${prefix} \``);
    }
}catch{}
  }
}

