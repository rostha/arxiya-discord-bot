const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const { MessageEmbed } = require('discord.js');
const config = require("../../botconfig/config.json")

module.exports = {
  name: "cuddle",
  category: "Emotes",
  description: "cuddles a mentioned user",
  
  aliases: [],
  BotPerms: ["EMBED_LINKS","SEND_MESSAGES"],
 category: "Information",
  usage: "cuddle [@User]",
  run: async (client, message, args) => {
       
try{
       if(!args[0]) return message.reply(`<:Autumn_Ohno:862619572980285450> You must mention someone to  cuddle!`)

      let user = message.mentions.users.first();
      if(!user) return message.reply(`<:Autumn_Ohno:862619572980285450> You can't cuddle yourself. mention somebody!`)
        

        async function work() {
        let owo = (await neko.sfw.cuddle());

        const hugembed = new Discord.MessageEmbed()
        
        .setAuthor(`${message.author.username} cuddles ${user.username}`,message.author.avatarURL())
        .setImage(owo.url)
        .setColor(config.colors.yes)
                message.channel.send({embeds :[hugembed]})

}

      work();
}catch{
    
}
}

                };
