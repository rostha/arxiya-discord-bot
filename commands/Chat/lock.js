const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "lock",
  category: "Chat", 
  aliases: ["lk"], 
  cooldown: 3, 
  usage: ">lock <Optional_channel>", 
  description: "Locks a channel", 
  memberpermissions: ["MANAGE_CHANNELS"], 
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
      const everyoneRole = message.guild.roles.everyone
  
      var channel = message.mentions.channels.last() 
      if(!channel) {
          channel = message.channel
      }; 
      
      const reason = args.join(' ')
      
      channel.permissionOverwrites.edit(everyoneRole, {
          SEND_MESSAGES: false
      })
      const msg = await channel.send(`${client.emotes.success} Successfully locked <#${channel.id}>! **${reason || " No reasons provided."}**`)
                  
       
      const embed = new MessageEmbed()
      .setAuthor(`${message.author.tag} Locked Channel!`, `https://cdn.discordapp.com/emojis/798779224470585404.gif?v=1`)
      .setDescription(`Channel ${channel} Locked!\n Reason: **${reason || 'No reasons provided.'}**`)
      .setFooter(`Arxiya | Channel #${channel.name}`,client.user.avatarURL())
      .setColor(client.b.b)
      message.delete()
      message.channel.send({embeds : [embed]})
         
      
      setTimeout(() => {
          msg.delete()
      }, 4000);
  }catch{ }
}}

