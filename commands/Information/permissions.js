const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json")

var ee = require("../../botconfig/embed.json");
const { GetUser } = require("../../handlers/functions")
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "permissions",
  category: "Information",
  aliases: ["perms"], 
  cooldown: 5, 
  usage: "permissions <user>", 
  description: "Shows the Permissions of a Member", 
  memberpermissions: ["MANAGE_MESSAGES"],
  requiredroles: [], 
  alloweduserids: [], 
  minargs: 1, 
  maxargs: 0, 
  minplusargs: 0,
  maxplusargs: 0, // 
  argsmissing_message: "",
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try {   
      var user;
      if(args[0]){
        try{
            user = await GetUser(message, args)
        }catch (e){
          if(!e) return message.reply("UNABLE TO FIND THE USER")
          return message.reply(e)
        }
      }else{
        user = message.author;
      }
      if(!user || user == null || user.id == null || !user.id) message.reply(`${client.emotes.error} I couldn't find the user.`)
      try{
        const member = message.guild.members.cache.get(user.id);
        //create the EMBED
        const embeduserinfo = new MessageEmbed()
        embeduserinfo.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        embeduserinfo.setAuthor("Permissions for:   " + member.user.username + "#" + member.user.discriminator, member.user.displayAvatarURL({ dynamic: true }), "https://clan.milrato.eu")
        embeduserinfo.addField('**❱ Permissions:**',`${message.member.permissions.toArray().map(p=>`\`${p}\``).join(", ")}`)
        embeduserinfo.setColor(ee.color)
        embeduserinfo.setFooter(ee.footertext, ee.footericon)
        //send the EMBED
        message.channel.send({embeds: [embeduserinfo]})
      }catch (e){
        console.log(e)
        //create the EMBED
        const embeduserinfo = new MessageEmbed()
        embeduserinfo.setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
        embeduserinfo.setAuthor("Permissions from:   " + user.username + "#" + user.discriminator, user.displayAvatarURL({ dynamic: true }), "https://clan.milrato.eu")
        embeduserinfo.addField('**❱ Permissions:**',`${message.member.permissions.toArray().map(p=>`\`${p}\``).join(", ")}`)
        embeduserinfo.setColor(ee.color)
        embeduserinfo.setTimestamp()
        embeduserinfo.setFooter(ee.footertext, ee.footericon)
        //send the EMBED
        message.reply({embeds: [embeduserinfo]})
      }
      
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return; ;
    }
  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */

