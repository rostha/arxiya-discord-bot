const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "unban",
  category: "Moderation", 
  aliases: [], 
  cooldown: 3, 
  usage: ">unban <userid>", 
  description: "Unbans a banned user from the guild", 
  memberpermissions: ["BAN_MEMBERS"], 
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

        if(!args[0]) return message.channel.send(`${client.emotes.error} You must provide userId`)
        if (isNaN(args[0])) return message.lineReply(`${client.emotes.error} UserId Must be in numbers`)
        let bannedMember = await client.users.fetch(args[0])
         let reason = args.slice(1).join(" ") || `No reasons provided by || ${message.author.tag}`
      
             message.guild.members.unban(bannedMember, reason).catch(err => {
                if(err) return message.channel.send(`${client.emotes.errror} Something went wrong, I couldn't unban the user. Please check my permissions.`)
            })
        let embed = new MessageEmbed()
            .setColor(client.r.r)
            .setFooter(client.user.username, client.user.avatarURL())
            .setDescription(`${client.emotes.success} **${bannedMember.tag}** Successfully unbanned!`)
            
const logchannel = message.guild.channels.cache.find(
ch => ch.name === "arxia-mod-logs"
);
if (!logchannel) return;   


        message.channel.send({embeds : [embed]})
             
    }  catch{

    }

  }
}

