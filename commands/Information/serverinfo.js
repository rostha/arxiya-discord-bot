const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "serverinfo",
  category: "Information", 
  aliases: ["server"], 
  cooldown: 5, 
  usage: "serverinfo", 
  description: "Shows the information about the guild", 
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
  message.reply(`This command is currently being worked on please wait until then`)
      }catch{}

  }
}

