const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "vckick",
  category: "Moderation", 
  aliases: ["voicekick"], 
  cooldown: 5, 
  usage: "vckick <mention or userID> <optional_reason>", 
  description: "disconnects a member from a vc", 
  memberpermissions: ["MANAGE_CHANNELS"], 
  requiredroles: [],
  alloweduserids: [],
  minargs: 1, 
  maxargs: 0, 
  minplusargs: 0, 
  maxplusargs: 0,
  argsmissing_message: "", 
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
  


    const em4 =  new MessageEmbed()
    .setDescription(`${client.emotes.error} **Please Provide a user!**`)
    .setColor(client.b.b)
    .setFooter(`${client.user.username} •  Usage: >disconnect <@user or UserID> [reason <optional>]`)
    try{
    if(!args[0]) return message.reply({embeds : [em4]})
    const user = message.mentions.members.first() ||  message.guild.members.cache.get(args[0])
       if(!user) return (`${client.emotes.error} I couldn't find the member you provided.`)
    const reason = args.slice(1).join(' ') || `No reasons provided by || ${message.author.tag}`
    let { channel } = user.voice;
    if (!channel)
    return message.reply(`${client.emotes.error} The member is not in any voice channels.`);
    
    const em3 =  new MessageEmbed()
    .setDescription(`${client.emotes.success} *${user} was disconnected from the VC*`)
    .setColor(client.b.b)
    .setFooter(`${client.user.username} • Voicekicked by ${message.author.tag}`)
    .setTimestamp()
    
        
 
    
    user.voice.disconnect(reason).catch(err => {
    if(err) return message.channel.send('>>> Something went wrong! Please check my channel permissions in that voicechannel permission overrides.')
    })
    message.channel.send({embeds : [em3]})
   
    
    }catch (e){
              }
  }
}

