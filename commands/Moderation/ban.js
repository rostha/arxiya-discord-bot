const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "ban",
  category: "Moderation", 
  aliases: ["prohibit"],
  cooldown: 2, 
  usage: ">ban <userID or mention> <optional_reason>", 
  description: "bans a user from the guild", 
  memberpermissions: ["BAN_MEMBERS"], 
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
      .setFooter(`${client.user.username}  • Usage: >ban <@user> [Reason]`);

    const e3 = new MessageEmbed()
      .setDescription(
        `${client.emotes.error} **I couldn't find the user. Please provide userID | mention | username | user Tag inorder to ban them.**`
      )
      .setColor(client.b.b)
      .setTimestamp()
      .setFooter(
        `${client.user.username}  • Makesure that the user is in this guild`
      );

     const e7 = new MessageEmbed()
      .setDescription(
        `${client.emotes.error} I can't ban someone same as mine or higher than my top role`
      )
      .setTimestamp()
      .setFooter(
        `${client.user.username}  • Makesure the user's role position is lower than me`
      )
      .setColor(client.b.b);

    const e8 = new MessageEmbed()
      .setDescription( `${client.emotes.error} You can't ban someone same as your or higher than your top role` )
      .setTimestamp()
      .setFooter( `${client.user.username}  • Makesure the user's role position is lower than you`)
      .setColor(client.b.b);
     
      if (!args[0]) return message.channel.send({ embeds: [e2]})


        const user = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) 
        const reason = args.slice(1).join(' ') || `No reasons provided by || ${message.author.tag}`;
 
 
 
        if(!user) {
try{
 let bannedMember =  await client.users.fetch(args[0])
 message.guild.members.ban(bannedMember)
 
 const outsidebanned = new MessageEmbed()
 .setColor(client.r.r)
 .setAuthor(`${bannedMember.tag}`, message.guild.iconURL())
 .setDescription( `${client.emotes.success} **${bannedMember.tag} has been banned!**   ` )
 .setFooter(`${bannedMember.username} Banned by ${message.author.username}`    )
 .setTimestamp();
 message.channel.send({embeds : [outsidebanned]})


}catch(e){}
 } 
  try{
    if (user.id == message.guild.ownerId)
return message.channel.send (
  'B-BAKA!! you cant ban the server owner dummy. -_-'
);  

if (user.roles.highest.position >= message.member.roles.highest.position) return message.channel.send({ embeds: [e8]})
        
if (user.roles.highest.position >= message.guild.me.roles.highest.position) return message.channel.send({ embeds: [e7]})

      const sembed2 = new MessageEmbed()
      .setColor(client.y.y)
      .setTimestamp()
      .setAuthor(`${message.guild.name}`, message.guild.iconURL())
      .setDescription(`
** You were banned From Server : ${message.guild.name}
Reason - ${reason || "Reason Not mentioned!"}**`
  )
      .setFooter(
        `${client.user.username}  • You are banned so you won't be able to join again.`,
        message.guild.iconURL()
      );
      
       
      message.channel.sendTyping();
      const sembed = new MessageEmbed()
      .setColor(client.b.b)
      .setAuthor(`${message.guild.name}`, message.guild.iconURL())
      .setDescription( `${client.emotes.success} **${user.user.tag} has been banned!**   ` )
      .setFooter(  `${user.user.username} Banned by ${message.author.username}`    )
      .setTimestamp();
      message.delete();
      user.send({embeds : [sembed2]}).catch(err => {
        return;
      }).then(() => {
         user.ban({
            reason: reason,
        })
        message.channel.send({embeds: [sembed]})
    })
}catch(e){
    console.log(e)
}

   
}

  }


