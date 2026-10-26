const Discord = require('discord.js')
const urban = require('urban.js')
const { MessageEmbed} = require("discord.js")
module.exports = {
    name: "urban",
    category: "utility",
  description: "Shows you a deffinition from urban dictionary",
  usage: "COMMAND [your word]",
  run: async (client, message, args) => {
      try{
  //command
  const bargs =  message.content.split(' ');
  const searchString = bargs.slice(1).join(' ')
  if(!searchString)return message.channel.send(`You have to type in word`)
  
  
  
urban(searchString).then(urbans=>{
  const embed = new MessageEmbed()
  .setAuthor(message.author.username,message.author.avatarURL({dynamic:true}))
  .setTimestamp()
  .setFooter(`Arxiya By Remiz`)
  .setColor(`CYAN`)
  .setDescription( `__**${urbans.word}**__\n\n**Definition**\n${urbans.definition}\n\n**Example**\n${urbans.example}\n\n**Tags:** ${urbans.tags}\n\n👍 **${urbans.thumbsUp}** *Thumbs Up* **|** 👎 **${urbans.thumbsDown}** *Thumbs Down*`)
  message.channel.send({embeds:[embed]})
})
      }catch{}

  }
  };
