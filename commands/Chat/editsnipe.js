const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const moment = require("moment")
module.exports = {
  name: "editsnipe",
  category: "Chat", 
  aliases: ["esn","esnipe"], 
  cooldown: 2, 
  usage: ">editsnipe <amount_optional>", 
  description: "Snipes the recently edited messages", 
  memberpermissions: ["MANAGE_MESSAGES"], 
  requiredroles: [],
  alloweduserids: [],
  minargs: 0, 
  maxargs: 0, 
  minplusargs: 0, 
  maxplusargs: 0,
  argsmissing_message: "", 
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
  
  
        message.channel.sendTyping();
 const editedsnipes   = client.editedsnipes.get(message.channel.id)
if(!editedsnipes) return message.channel.send(`There are no recently edited messages found`)
const editedsnipe = + args[0] - 1 || 0;
const target = editedsnipes[editedsnipe];
if(!target) return message.reply(`There is only ${editedsnipes.length}edited messages!.`)

const { msg, time, image, oldmsg } = target;
   

let reason = `No content found`
if(msg.author.bot) {
 reason = `Message was a part of an embed`
}

const editedsnipeembed = new MessageEmbed()
 .setAuthor(msg.author.tag, msg.author.avatarURL())
 .setImage(image)
.setColor(`${client.g.g}`)
.setDescription(`
**Before** : ${msg.content ||`${reason}`}
**After** : ${oldmsg ||`${reason}`}
`)

.setFooter(`
${client.user.username} || Sent in ${message.channel.name} • ${editedsnipe + 1}/${editedsnipes.length}
${moment(time).fromNow()}
`,client.user.avatarURL())
.setTimestamp()

message.channel.send({embeds : [editedsnipeembed]})


    

  }
}

