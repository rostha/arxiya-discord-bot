const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const moment = require('moment')
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "lookup",
  category: "Information", 
  aliases: [], 
  cooldown: 5, 
  usage: "lookup <userid>", 
  description: "Shows info about a user outside the guild", 
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

    try{
        let lookMember =  await client.users.fetch(args[0]) || message.author

        if(!lookMember) return;
        const url = lookMember.avatarURL({dynamic: true})+"?size=2048"
        const embed = new MessageEmbed()
        .setThumbnail(url)
        .setColor(`AQUA`)
        .setDescription(`
        Discord Username : **${lookMember.tag}**
        Discord ID : **${lookMember.id}**
        Account Creation : **${moment(lookMember.createdAt).format("LLLL")}**
        Avatar : **[Click Me](${url})**
        `)
        message.channel.send({content: `<:Autumn_info:869503506036445185> **Information about user ${lookMember.tag}**`, embeds : [embed]})
    }catch{}
  


  }
}

