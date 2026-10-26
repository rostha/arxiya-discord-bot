const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const { MessageEmbed } = require('discord.js');
const config = require("../../botconfig/config.json")

module.exports = {
  name: "baka",
  category: "Emotes",
  description: "bakas a mentioned user",
  
  aliases: [],
  BotPerms: ["EMBED_LINKS","SEND_MESSAGES"],
 category: "Information",
  usage: "baka [@User]",
  run: async (client, message, args) => {
       
try{
      
      let user = message.mentions.users.first() || message.member
   
        async function work() {
        let owo = (await neko.sfw.baka());

        const hugembed = new Discord.MessageEmbed()
        
        .setAuthor(`${user.username || user.user.username} Baka`,message.author.avatarURL())
        .setImage(owo.url)
        .setColor(config.colors.yes)
                message.channel.send({embeds :[hugembed]})

}

      work();
}catch{
    
}
}

                };
