const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const { MessageEmbed } = require('discord.js');
const config = require("../../botconfig/config.json")

module.exports = {
  name: "poke",
  category: "Emotes",
  description: "pokes a mentioned user",
  
  aliases: [],
  BotPerms: ["EMBED_LINKS","SEND_MESSAGES"],
 category: "Information",
  usage: "poke [@User]",
  run: async (client, message, args) => {
       
try{
       if(!args[0]) return message.reply(`<:Autumn_Ohno:862619572980285450> You must mention someone to  poke!`)

      let user = message.mentions.users.first();
      if(!user) return message.reply(`<:Autumn_Ohno:862619572980285450> You can't pat yourself. mention somebody!`)
        

        async function work() {
        let owo = (await neko.sfw.poke());

        const hugembed = new Discord.MessageEmbed()
        
        .setAuthor(`${message.author.username} pokes ${user.username}`,message.author.avatarURL())
        .setImage(owo.url)
        .setColor(config.colors.yes)
                message.channel.send({embeds :[hugembed]})

}

      work();
}catch{
    
}
}

                };
