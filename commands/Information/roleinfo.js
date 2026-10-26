const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json")
var ee = require("../../botconfig/embed.json");
const moment = require('moment');
const { GetRole } = require("../../handlers/functions")
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "roleinfo", 
  category: "Information",
  aliases: ["rinfo"],
  cooldown: 5, 
  usage: "roleinfo <@ROLE>", 
  description: "Shows Information about a role", 
  memberpermissions: ["MANAGE_MESSAGES"],
  requiredroles: [], 
  alloweduserids: [],
  minargs: 1, 
  maxargs: 0, 
  minplusargs: 0,
  maxplusargs: 0, 
  argsmissing_message: "",  
  argstoomany_message: "", 
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try {   
      var role;
      if(args[0]){
        try{
          role = await GetRole(message, args)
        }catch (e){
          if(!e) return message.reply("Couldn't find the role.")
          return message.reply(e)
        }
      }else{
        return message.reply(`${client.emotes.error} Please retry but add a Role/Rolename/Roleid`);
      }
      if(!role || role == null || role.id == null || !role.id) message.reply(`${client.emotes.error} You must provide a valid role.`)
        //create the EMBED
        const embeduserinfo = new MessageEmbed()
        embeduserinfo.setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
        embeduserinfo.setAuthor("Information about:   " + role.name, message.guild.iconURL({ dynamic: true }), "https://discord.gg/FQGXbypRf8")
        embeduserinfo.addField('**❱ Role Name:**',`\`${role.name}\``,true)
        embeduserinfo.addField('**❱ Role ID:**',`\`${role.id}\``,true)
        embeduserinfo.addField('**❱ Role Color:**',`\`${role.hexColor}\``,true)
        embeduserinfo.addField('**❱ Date Created:**', "\`"+moment(role.createdAt).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(role.createdAt).format("hh:mm:ss") + "\`",true)
        embeduserinfo.addField('**❱ Role Position:**',`\`${role.rawPosition}\``,true)
        embeduserinfo.addField('**❱ Role MemberCount:**',`\`${role.members.size} Members have it\``,true)
        embeduserinfo.addField('**❱ Hoisted:**',`\`${role.hoist ? "✔️" : "❌"}\``,true)
        embeduserinfo.addField('**❱ Mentionable:**',`\`${role.mentionable ? "✔️" : "❌"}\``,true)
        embeduserinfo.addField('**❱ Role Permissions:**',`${role.permissions.toArray().map(p=>`\`${p}\``).join(", ")}`)
        embeduserinfo.setColor(role.hexColor)
        embeduserinfo.setFooter(ee.footertext, ee.footericon)
        //send the EMBED
        message.reply({embeds: [embeduserinfo]})
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return;
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

