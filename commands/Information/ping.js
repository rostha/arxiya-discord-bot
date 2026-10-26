const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "ping",
  category: "Information", 
  aliases: ["latency"], 
  cooldown: 5, 
  usage: "ping", 
  description: "Shows the bot's ping", 
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
      message.reply(`Calculating....`).then(resultMessage => {
          const ping = resultMessage.createdTimestamp - message.createdTimestamp
                    
          resultMessage.edit({content: `🏓 Pong!... API latency: **${client.ws.ping}ms** & BOT latency : **${ping}ms**`})
                    
      })
  }catch{}


  }
}

