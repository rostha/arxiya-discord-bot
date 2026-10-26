const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../botconfig/config.json")
module.exports = {
  name: "kitsune",
  category: "🔞 NSFW Commands",
  usage: "kitsune",
  run: async (client, message, args) => {

  var errMessage = "This is not an NSFW Channel";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

        async function work() {
        let owo = (await neko.nsfw.kitsune());

        const kitsune = new Discord.MessageEmbed()
        .setTitle("Kitsune")
        .setImage(owo.url)
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .setURL(owo.url);
        message.channel.send({embeds:[kitsune]});

}

      work();
}
                };
