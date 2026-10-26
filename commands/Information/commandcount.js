const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json")
var ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "commandcount",
  category: "Information",
  aliases: ["cmdcount", "commandamount", "cmdamount"],
  cooldown: 5, 
  usage: "commandcount", 
  description: "Shows the Amount of Commands an Categories", 
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
    try {
      message.reply({embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`:gear: **[${client.commands.size}] Commands**`)
        .setDescription(`:gear: **[${client.categories.length}] Categories**`)
      ]});
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return;
    }
  }
}


