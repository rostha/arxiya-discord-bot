const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const { MessageEmbed } = require('discord.js');
const config = require("../../botconfig/config.json")

module.exports = {
  name: "waifu",
  category: "Fun",
  description: "shows a waifus",
  aliases: [],
  usage: "waifu ",
  run: async (client, message, args) => {
       
try{

        async function work() {
        let owo = (await neko.sfw.waifu());

        const hugembed = new Discord.MessageEmbed()
        
        .setAuthor(`${message.author.username}'s waifu`,message.author.avatarURL())
        .setImage(owo.url)
        .setColor(config.colors.yes)
                message.channel.send({embeds :[hugembed]})

}

      work();
}catch{
    
}
}

                };
