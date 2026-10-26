
console.log("Loading MessageDelete Function".brightRed)
const { MessageEmbed }= require('discord.js')
const ArxiyaEmbed  = require('../utils/ArxiyaEmbed')
const { Util: { escapeMarkdown } } = require('discord.js');
const { diffWordsWithSpace } = require('diff');
const Schema = require('../models/logs');
module.exports = async (client, message) => {
    // Ahm... okay i guess
    client.on("messageDelete", async (message)=> {

      if (message.channel.type == "dm") return;
      if(message.author.bot) return;
    
      try{  

        await Schema.findOne({
          guild: message.guild.id
      }, async (err, data) => {
          if (!data) return;
          if (err) throw err;
        
          const logchannelid = data.channel
          const logchannel = message.guild.channels.cache.get(logchannelid)
          if(!logchannel) return;
          if (!logchannel.permissionsFor(message.client.user).has("SEND_MESSAGES","EMBED_LINKS"))
   return;
          if(message.author.bot) return;
          const attachments = message.attachments.size ? message.attachments.map(attachment => attachment.proxyURL) : null;
             const DeletedLog = new ArxiyaEmbed()
      .setColor(client.y.y)
      .setAuthor(message.author.tag,client.user.displayAvatarURL({ dynamic: true }))
      .setFooter(`AuthorID : ${message.author.id} | MessageID : ${message.id}`)
        //.addField("\u200b",`${attachments ? `Attachments: [${attachments.length}] ${attachments.join('\n')}` : ''} `)
      .setTimestamp()
                   if (message.content.length) {
      DeletedLog.splitFields(`
      **Message ${message.id} deleted in ${message.channel}**
      ${message.content}
      ${attachments ? `Attachments: [${attachments.length}] ${attachments.join('\n')}` : ''}
      `);
      
    }
      
   
        logchannel.send({embeds:[DeletedLog]})  .catch(err => {
          if(err) return;
      })

              })
        
           //   const logchannel = message.guild.channels.cache.find(ch => ch.name === 'arxia-msg-logs')
     
    
    } catch (e) {
      console.log(e)
       
    } 
     
 })
     

       client.on('messageUpdate', async(oldMessage, newMessage) =>{
  try {
    if (oldMessage.channel.type == "dm") return;
         if(oldMessage.author.bot) return;
         
        await Schema.findOne({
          guild: oldMessage.guild.id
      }, async (err, data) => {
          if (!data) return;
          if (err) throw err;
        
          const logchannelid = data.channel
         const logchannel = oldMessage.guild.channels.cache.get(logchannelid)
        if(!logchannel) return;
     if (!logchannel.permissionsFor(oldMessage.client.user).has("SEND_MESSAGES","EMBED_LINKS"))
 return;
const editedlog = new ArxiyaEmbed()
.setAuthor(`${oldMessage.author.tag}`, oldMessage.author.avatarURL())
.setTimestamp()
.setFooter(`AuthorID : ${oldMessage.author.id} | MessageID : ${oldMessage.id}`)
.setColor(client.g.g)
.addField("\u200b",`**Jump to Message : [Click Me](${newMessage.url})**`)
//Jump to Message :** [Click Me](${newMessage.url})
.splitFields(diffWordsWithSpace(escapeMarkdown(oldMessage.content), escapeMarkdown(newMessage.content))
				.map(result => result.added ? `**${result.value}**` : result.removed ? `~~${result.value}~~` : result.value)
				.join(' '));
logchannel.send({embeds : [editedlog]})
 
      })
        } catch (e) {
          console.log(e)
      } })
       
    }
    console.log("message delete loggingLoaded".brightGreen)


    
/**
  * @INFO
  *  Code Arxia Discord Bot
  * @INFO
  * Misslinx Natsu
  * @INFO
  * Position | Software Developer
  * @INFO
  * Copyright warning { False for this project!}
  * @INFO
*/
