const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const Schema = require('../../models/mutes')
const settings = require("../../botconfig/settings.json");
const ms = require("ms")
module.exports = {
  name: "mute",
  category: "Moderation", 
  aliases: ["mt"], 
  cooldown: 3, 
  usage: ">mute <user> <time s,m,h <reason_optional>", 
  description: "Mute a member so they cannot type or speak.", 
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
  


    const e1 = new MessageEmbed()
    .setColor(client.b.b)
    .setDescription(`${client.emotes.error} **You didn't provided any valid user to mute.**`)
    .setFooter(`${client.user.username} • Usage: >mute <@user> <time> <reason> `)
  
    const e2 = new MessageEmbed()
    .setDescription( `${client.emotes.error} ***You can't mute someone same as your or higher than your top role***` )
    .setTimestamp()
    .setFooter( `${client.user.username}  • Makesure the user's role position is lower than you`)
    .setColor(client.b.b);
    const e3 = new MessageEmbed()
    .setDescription( `${client.emotes.error}*** I can't mute someone same as mine or higher than my top role***` )
    .setTimestamp()
    .setFooter( `${client.user.username}  • Makesure the user's role position is lower than me`)
    .setColor(client.b.b);
    const e4 = new MessageEmbed()
    .setDescription( `${client.emotes.error} ***Proper Usage : >mute @user <time+format(eg:10m, 2h)> <optional reason>***` )
    .setTimestamp()
    .setFooter( `${client.user.username}  • You didn't added a time of his unmute`)
    .setColor(client.b.b);
    
  try{
        if(!args[0]) return message.reply(`${client.emotes.error} You didn't provided any user to mute.`)
    const member =  message.mentions.members.first() ||  message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) 
    let time = args[1] 
    if(!time) return message.reply({embeds : [e4]})
   
    const reason = args.slice(2).join(' ') || `No reasons provided by || ${message.author.tag}`
  
            if (!member) return message.reply({embeds : [e1]});
                         
  if (member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send({ embeds: [e2]})
  if (member.id === client.id) return message.reply('B-BBAKA!! Why are you trying mute me?')
  if (member.roles.highest.position >= message.guild.me.roles.highest.position) return message.channel.send({ embeds: [e3]})
  
  const role = message.guild.roles.cache.find(role => role.name === 'Unconscious') || message.guild.roles.cache.find(role => role.name === 'Muted') 
  
           
  if (!role) {
   
       let mssg = message.channel.send(`Creating muted role...`).then(message => message.delete({ timeout: 3000 }));
    let highestrolepos = message.guild.me.roles.highest.position;
          let role = await message.guild.roles.create({
             name: "Muted",
             color: "#444242",
             position: Number(highestrolepos) - 1,
             reason: "Muted role created to mute members",
             permissions:[]
            
            })
         
          message.guild.channels.cache.map((x) => {
            if (!x.isThread()) {
              x.permissionOverwrites.edit(
                role,
                {
                  MANAGE_WEBHOOKS: false,
                  SEND_MESSAGES: false,
                  USE_PUBLIC_THREADS: false,
                  USE_PRIVATE_THREADS: false,
                  ADD_REACTIONS: false,
                  SEND_TTS_MESSAGES: false,
                  MANAGE_THREADS: false,
                  MANAGE_MESSAGES: false,
                  MENTION_EVERYONE: false,
                  CONNECT: false,
                  SPEAK: false,
                },
                `Completing muted role's overwrites`,
              )
            }
          
          })
          
             
  }
     let role2 = message.guild.roles.cache.find(role => role.name === 'Unconscious') || message.guild.roles.cache.find(role => role.name === 'Muted') 
               
            const erroembed = new MessageEmbed()
            .setDescription(`
            ${client.emotes.error} **Please add a valid time. Usage: n\`mute @user <Time+Format(e.g: 10m) n\` 
            Example : >mute @user 10m Can you stop spamming!**
            `)
            .setColor(`${client.b.b}`)
            .setFooter(`${client.user.username} • Note you can use s,m,h or d only.`)
            .setTimestamp()
           
              if(!time === undefined) return message.channel.send({embeds :[erroembed]})
  
              let mutetime;
  
      
          mutetime = ms(time);
      
          if(!mutetime || mutetime === undefined) return message.reply({embeds : [erroembed]})
          
  
            if (member.roles.cache.has(role2)) return message.reply(`${client.emotes.success} **${member.tag} is already muted.**`)
    
   const mutedembed = new MessageEmbed()
   .setDescription(`***${client.emotes.success} ${member.user.tag} has been muted for ${ms(ms(time))}.***`)
   .setColor(client.b.b)
   
            await member.roles.add(role2, reason)
            Schema.findOne({Guild: message.guild.id}, async(err, data) =>{
                if(!data) {
                    new Schema({
                        Guild: message.guild.id,
                        Users: member.id
                    }).save();
                }else{
                    data.Users.push(member.id);
                    data.save()
                }
            })
             
              message.delete()
            message.channel.send({embeds : [mutedembed]})
          
         
           setTimeout(() => {
               member.roles.remove(role2, `Mute time over`)
            }, ms(time))
                    } catch (e) {
                      const errorembed =   new MessageEmbed()
                      .setAuthor(`Something went Wrong`)
                      .setDescription(`
                      **Posible Reasons ${client.emotes.vibe}
                      - I don't have permission to manage roles,
                      - Muted role is above me**
                      `)
                      return message.channel.send
                      ({content: 'Error Occured', embeds: [errorembed]})

  }
}
}

