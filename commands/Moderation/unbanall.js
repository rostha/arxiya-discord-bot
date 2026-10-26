const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "unbanall",
  category: "Moderation", 
  aliases: ["unbaneveryone"], 
  cooldown: 5, 
  usage: "unbanall", 
  description: "Unbans every single user from the guild", 
  memberpermissions: ["ADMINISTRATOR"], 
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
        message.guild.bans.fetch().then(bans => {
                    if (bans.size == 0) {{ 
    
                        message.reply({content:"There are no members banned in the guild to unban."})
                    }}
                    else{
                        bans.forEach(ban => {
                            message.guild.members.unban(ban.user.id, `On command by ${message.author.tag}`)
                        })
                        message.channel.send({content: `${client.emotes.success} Unbanning all the users , all the banned users will be unbanned soon be patient`})
                    }
                })
            } catch{}
  }
}

