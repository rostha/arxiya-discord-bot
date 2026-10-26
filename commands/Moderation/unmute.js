const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const Schema = require('../../models/mutes')
module.exports = {
  name: "unmute",
  category: "Moderation", 
  aliases: ["ut"], 
  cooldown: 3, 
  usage: ">unmute <user> <optional_reason>", 
  description: "unmutes a user so they can talk and speak", 
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
  
   
    try{
        
        const e1 = new MessageEmbed()
        .setColor(client.b.b)
        .setDescription(`${client.emotes.error} **You didn't provided any valid user to unmute.**`)
        .setFooter(`${client.user.username} • Usage: >mute <@user> <time> <reason> `)
      
       
        .setColor(client.b.b);
        const e4 = new MessageEmbed()
        .setDescription( `${client.emotes.error} ***Proper Usage : >mute @user <time+format(eg:10m, 2h)> <optional reason>***` )
        .setTimestamp()
        .setFooter( `${client.user.username}  • You didn't added a time of his unmute`)
        .setColor(client.b.b);
      
        if(!args[0]) return message.reply({ embeds : [e1]})
      
            
              const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      
              const reason = args.slice(1).join(' ') || `No reasons provided by || ${message.author.tag}`
      
              if(!target) return message.reply(`${client.emotes.error} I couldn't find the member.`)
              
                      const role = message.guild.roles.cache.find(role => role.name === 'Unconscious') || message.guild.roles.cache.find(role => role.name === 'Muted') 
             Schema.findOne({
                 Guild: message.guild.id,
                              }, async(err, data) => {
                                  if(!data) return message.channel.send(`Member wasn't muted`)
                                  const user = data.Users.findIndex((prop) => prop === target.id)
                                  if(user == -1) return message.reply("member not muted")
                                  data.Users.splice(user, 1);
                                  data.save()
                              })
                      await target.roles.remove(role, reason).catch(err => {
                  if (err) return;
                })
                const mutedembed = new MessageEmbed()
                .setDescription(`***${client.emotes.success} ${target.user.tag} has been unmuted.***`)
                .setColor(client.b.b)
                                                 message.delete()
              message.channel.send({embeds: [mutedembed]})
                   }catch {
      
                   }
      

  }
}

