const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "avatar",
  category: "Information", 
  aliases: ["av"], 
  cooldown: 5, 
  usage: ">avatar <user>", 
  description: "view a user's avatar in bigger screen", 
  memberpermissions: ["ADD_REACTIONS"], 
  requiredroles: [],
  alloweduserids: [],
  minargs: 0, 
  maxargs: 0, 
  minplusargs: 0, 
  maxplusargs: 0,
  argsmissing_message: "", 
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
   if(message.channel.id == 880328393374203995) return message.channel.send(`This channel is banned from using the command`)
    
    const e1 =  new MessageEmbed()
    .setDescription(`**User's Profile Picture Not Found!**`)
    .setFooter(`The user has no pfp`)
    .setColor(client.b.b)
    const e2 =  new MessageEmbed()
    .setDescription(`**Couldn't find the User**`)
    .setColor(client.b.b)
    .setFooter(`I couldn't find the user in this guild`)
    
            let user;
            if(!args[0]) user = message.author
            if(args[0] && isNaN(args[0])) user = message.mentions.users.first()
            if(args[0] && !isNaN(args[0])){
                user = client.users.cache.get(args[0])
         
                if(!message.guild.members.cache.has(args[0])) return message.reply({embeds : [e2]})
         
            }
         if(!user)return message.reply(`${client.emotes.error} I couldn't find the user.`) 
            if(!user.avatarURL()) return message.reply({embeds : [e1]})
    
    let download2 = user.avatarURL({dynamic: true})+"?size=2048"
            let  Embed = new MessageEmbed()
          
    
            .setDescription(`
                ** Download : [Click Me](${download2})**
                `)
             .setImage(user.avatarURL({dynamic: true})+"?size=2048") //Size :D
                  .setAuthor(`${user.username}'s Pfp`,user.avatarURL())
                .setColor(client.b.b)
         
            message.channel.send({embeds: [Embed]})


  }
}

