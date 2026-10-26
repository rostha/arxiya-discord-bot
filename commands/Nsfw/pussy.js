const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../botconfig/config.json")
module.exports = {
  name: "pussy",
  category: "🔞 NSFW Commands",
  usage: "pussy",
  run: async (client, message, args) => {

  var errMessage = "This is not an NSFW Channel";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }
  var superagent = require('superagent');

    if (!message.channel.nsfw) return message.channel.send('You must use this command in an nsfw lounge!') 
 
        superagent.get('https://nekobot.xyz/api/image').query({ type: 'pussy'}).end((err, response) => {

            var embed_nsfw = new Discord.MessageEmbed()
                .setDescription(`:underage:\n**[image not loading? click here](${response.body.message})**`)
                .setTimestamp().setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
                .setImage(response.body.message)
            
            message.channel.send({embeds:[embed_nsfw]});
       
    });
  
}
};
