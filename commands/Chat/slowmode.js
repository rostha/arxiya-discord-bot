const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const ms = require('ms')
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "slowmode",
  category: "Chat", 
  aliases: ["sm"], 
  cooldown: 3, 
  usage: ">slowmode <duration>", 
  description: "Sets the slowmode of a channel", 
  memberpermissions: ["MANAGE_CHANNELS"], 
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
        const arg0 = new MessageEmbed()
        .setDescription(`${client.emotes.success} Slowmode has been removed.`)
        .setColor(client.b.b)
        .setFooter(`Channel ${message.channel.name} • slowmode removed by ${message.author.username} • ${client.user.username}`)

        if(!args[0]){
            message.channel.setRateLimitPerUser(0)
            return message.channel.send({embeds:[arg0]})
        }
        const raw = args[0]
        const milliseconds  = ms(raw)

        const notvalid = new MessageEmbed()
        .setDescription(`${client.emotes.error} You must provide a valid time using s,m or h.`)
        .setColor(client.b.b)
        .setFooter(`Channel ${message.channel.name} • also makesure that the duration is above 0s. ${message.author.username} • ${client.user.username}`)
if (isNaN(milliseconds)) return message.reply(`This is not a valid time`)

if(milliseconds < 1000) return message.reply({embeds:[notvalid]})
message.channel.setRateLimitPerUser(milliseconds / 1000)
message.channel.send(`The slowmode for this channel has been set to \`\ ${ms(milliseconds, {
long:true
})}\`\ `)
}catch{}

  }
}

