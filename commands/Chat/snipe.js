const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const moment = require('moment')
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "snipe",
  category: "Chat", 
  aliases: ["ssn"], 
  cooldown: 2, 
  usage: ">snipe <amount_optional>", 
  description: "snipes the recently delete message", 
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
    message.channel.sendTyping();
    const snipes   = client.snipes.get(message.channel.id)
   if(!snipes) return message.channel.send(`There are no recently deleted messages found`)
   const snipe = + args[0] - 1 || 0;
   const target = snipes[snipe];
   if(!target) return message.reply(`There is only ${snipes.length} messages!.`)
   
   const { msg, time, image } = target;
      
   
   let reason = `No message content found`
   if(msg.author.bot) {
    reason = `Message was a part of an embed | embeds cannot be sniped.`
   }
   
   const snipeembed = new MessageEmbed()
   
    .setAuthor(msg.author.tag, msg.author.avatarURL())
    .setImage(image)
   .setColor(`${client.b.b}`)
   .setDescription(`${msg.content ||`${reason}`}`)
   
   .setFooter(`Sent in ${message.channel.name} • ${snipe + 1}/${snipes.length}
   ${moment(time).fromNow()}
   `,client.user.avatarURL())
   .setTimestamp()
   message.channel.send({embeds : [snipeembed]})
   
   

    } catch {
        
    }

  }
}

