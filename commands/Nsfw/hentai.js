const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../botconfig/config.json")
module.exports = {
  name: "hentai",
  category: "🔞 NSFW Commands",
  description: "Sends random hentai",
  usage: "hentai",
  run: async (client, message, args) => {

  //Checks channel for nsfw
  var errMessage = "This is not an NSFW Channel";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

        async function work() {
        let owo = (await neko.nsfw.hentai());

        const hentai = new Discord.MessageEmbed()
        .setTitle("Hentai")
        .setImage(owo.url)
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .setURL(owo.url);
        message.channel.send({embeds:[hentai]})

}

      work();
}
                };
