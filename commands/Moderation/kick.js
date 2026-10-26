const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "kick",
  category: "Moderation", 
  aliases: ["throwaway","leaveoff","Kick"],
  cooldown: 4, 
  usage: ">kick <user ID> or <mention> <optional_reason>", 
  description: "Kicks a member", 
  memberpermissions: ["KICK_MEMBERS"], 
  requiredroles: [],
  alloweduserids: [],
  minargs: 1, 
  maxargs: 0, 
  minplusargs: 0, 
  maxplusargs: 0,
  argsmissing_message: "", 
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
  
  // Starting Embeds
  const e2 = new MessageEmbed()
  .setDescription(`${client.emotes.error} **You must mention someone or atleast provide an userId | username | userTag**`)
   .setColor(client.b.b)
   .setTimestamp()
   .setFooter(`${client.user.username}  • Usage: >kick <@user> [Reason]`);

 const e3 = new MessageEmbed()
   .setDescription(
     `${client.emotes.error} **I couldn't find the user. Please provide mention || UserId || nickname || user Tag inorder to kick them.**`
   )
   .setColor(client.b.b)
   .setTimestamp()
   .setFooter(
     `${client.user.username}  • Makesure that the user is in this guild`
   );

  const e7 = new MessageEmbed()
   .setDescription(
     `${client.emotes.error} I can't kick someone same as mine or higher than my top role`
   )
   .setTimestamp()
   .setFooter(
     `${client.user.username}  • Makesure the user's role position is lower than me`
   )
   .setColor(client.b.b);

 const e8 = new MessageEmbed()
   .setDescription( `${client.emotes.error} You can't kick someone same as your or higher than your top role` )
   .setTimestamp()
   .setFooter( `${client.user.username}  • Makesure the user's role position is lower than you`)
   .setColor(client.b.b);
   message.channel.sendTyping();
   if (!args[0]) return message.channel.send({ embeds: [e2]})
try{
     const user = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) 
     const reason = args.slice(1).join(' ') || `No reasons provided by || ${message.author.tag}`;
if(!user) return message.channel.send({ embeds: [e3]})
     
if (user.roles.highest.position >= message.member.roles.highest.position) return message.channel.send({ embeds: [e8]})
     
if (user.roles.highest.position >= message.guild.me.roles.highest.position) return message.channel.send({ embeds: [e7]})
   
   const sembed2 = new MessageEmbed()
   .setColor(client.r.r)
   .setTimestamp()
   .setAuthor(`${message.guild.name}`, message.guild.iconURL())
   .setDescription(
     `** You were kicked From Server : ${message.guild.name}
         Reason - ${reason || "Reason Not mentioned!"}**`
   )
   .setFooter(
     `${client.user.username}  • You were kicked so you will be able to join again.`,
     message.guild.iconURL()
   );
   
     
   const sembed = new MessageEmbed()
   .setColor(client.y.y)
   .setAuthor(`${message.guild.name}`, message.guild.iconURL())
   .setDescription( `${client.emotes.success} **${user.user.tag} has been kicked!**   ` )
   .setFooter(  `${user.user.username} Kicked by ${message.author.username}`    )
   .setTimestamp();
   message.delete();
   user.send({embeds : [sembed2]}).catch(err => {
     return;
   }).then(() => {
      user.kick(reason)
     message.channel.send({embeds: [sembed]})
     })
   
     }catch (e){}

  }
}

