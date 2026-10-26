const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "nick",
  category: "Moderation", 
  aliases: ["setnick"], 
  cooldown: 3, 
  usage: "nick <user> <new username> <optional_reason>", 
  description: "Sets a user's nickname", 
  memberpermissions: ["MANAGE_NICKNAMES"], 
  requiredroles: [],
  alloweduserids: [],
  minargs: 1, 
  maxargs: 0, 
  minplusargs: 0, 
  maxplusargs: 0,
  argsmissing_message: "", 
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
  
const em3 =  new MessageEmbed()

.setDescription(`**Please Provide a user!**`)
.setFooter(`${client.user.username} •  Usage: >nick <@user or UserID> [new Nickname] `)
.setColor(client.b.b)

const em4 =  new MessageEmbed()
.setDescription(`**Please provide a valid user!**`)
.setColor(client.b.b)
.setFooter(`${client.user.username} • Makesure that the member is in the guild.`)

const em5 =  new MessageEmbed()
.setDescription(`**Please provide a New Nick!**`)
.setFooter(`${client.user.username} • You didn't provided a new Nick`)
.setColor(client.b.b)

const em6 =  new MessageEmbed()
.setDescription(`**I can't change nick of members equal to my role or higher than my top role.**`)
.setFooter(`${client.user.username} • Makesure that my role is above the member's role`)
.setColor(client.b.b)

const em8 =  new MessageEmbed()
.setDescription(`**You can't change nick of members equal to your role or higher than your top role.**`)
.setFooter(`${client.user.username} • Makesure that  your role is above the member's role`)
.setColor(client.b.b)
message.channel.sendTyping();
            if (!args[0]) return message.channel.send({embeds : [em3]})
    
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) 
    if (!member) return message.channel.send({embeds : [em4]});

     
if (member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send({ embeds: [em8]})
if (member.roles.highest.position >= message.guild.me.roles.highest.position) return message.channel.send({ embeds: [em6]})

    if (!args[1]) return message.channel.send({embeds : [em5]});
    let nick = args.slice(1).join(' ');
    let reason = args.slice(2).join(' ');
 
    try {
    member.setNickname(nick)
    const em7 = new MessageEmbed()
    .setColor(client.b.b)
        .setDescription(`${client.emotes.success} **Changed Nickname of ${member.displayName} to ${nick}**`)
        .setFooter(`${client.user.username} • Nicked by ${message.author.tag}`)
        .setTimestamp()
        message.delete()
    message.channel.send({embeds : [em7]})

}catch (e){
  
}



  }
}

