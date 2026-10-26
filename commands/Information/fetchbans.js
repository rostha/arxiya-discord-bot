const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "fetch-bans",
  category: "Information", 
  aliases: ["f-bans","fetchbans"], 
  cooldown: 5, 
  usage: "fetch-bans", 
  description: "Shows the list of users banned in the guild", 
  memberpermissions: ["MANAGE_GUILD"], 
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
            
    const fetchBans = 
    message.guild.bans.fetch()
    const bannedmembers = (await fetchBans)
    .map((member) => member.user.tag)
    .join(', ')
    if(!bannedmembers) return message.channel.send(`There are currently no users banned in this guild to show.`)
    const embed = new MessageEmbed()
    .setColor(client.g.g)
    .setTitle(`Banned Members`)
    .setTimestamp()
    .setFooter(`${client.user.username}  •  ${message.guild.name}`,client.user.avatarURL())
    .setDescription(`\`\ ${bannedmembers} \`\ `)
    
    message.channel.send({embeds : [embed]})
    
    }catch{}


  }
}

