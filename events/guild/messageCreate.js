//Import Modules
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const settings = require(`../../botconfig/settings.json`);
const { Collection, Client, Discord, MessageEmbed } = require('discord.js');
const getprefix = require("./../../utils/getprefix")

const { onCoolDown, replacemsg } = require("../../handlers/functions");

const db = require('../../models/command')
const db2 = require('../../models/wcommand')


module.exports = async (client, message) => {
    if(!message.guild || !message.channel || message.author.bot) return;
    if(message.channel.partial) await message.channel.fetch();
    if(message.partial) await message.fetch();
    const prefix = await getprefix(message.guild.id);
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})`);
    if(!prefixRegex.test(message.content)) return;
    const [, mPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(mPrefix.length).trim().split(/ +/).filter(Boolean);
    const cmd = args.length > 0 ? args.shift().toLowerCase() : null;
    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
      let alpha2 = new MessageEmbed()
      .setFooter(`This command is disabled for this channel.`)
      .setColor(client.y.y)
      let alpha = new MessageEmbed()
      .setFooter(`This command is disabled for the whole guild.`)
      .setColor(client.y.y)

    const wcmdcheck = await db2.findOne({ Guild: message.guild.id})
       if(wcmdcheck){
              if(wcmdcheck.Cmds.includes(cmd)) return message.channel.send({embeds : [alpha]}) .then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, settings.timeout.maxargs)})
    
    }
    const cmdcheck = await db.findOne({ Guild: message.guild.id})
    if(cmdcheck){
          if(cmdcheck.Cmds.includes(`${cmd} | ${message.channel.id}`)) return message.channel.send({embeds : [alpha2]}) .then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, settings.timeout.maxargs)})
    
    }
   
        //Check if user is on cooldown with the cmd, with Tomato#6966's Function from /handlers/functions.js
        if (onCoolDown(message, command)) {
          return message.reply({
            embeds: [new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setDescription(replacemsg(settings.messages.cooldown, {
                prefix: prefix,
                error: client.emotes.error,
                command: command,
                timeLeft: onCoolDown(message, command)
              }))]
              
          }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, settings.timeout.cooldown)}).catch((e) => {console.log(String(e).grey)})
        }
        try {
          //if Command has specific permission return error
          if (command.memberpermissions && command.memberpermissions.length > 0 && !message.member.permissions.has(command.memberpermissions)) {
            return message.reply({ embeds: [new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setDescription(`${client.emotes.error} **You are not allowed to run this command!**`)
                .addField(`Required Perms`,` \`\ ${command.memberpermissions} \`\ `)
               ]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, settings.timeout.notallowed_to_exec_cmd.memberpermissions)}).catch((e) => {console.log(String(e).grey)});
          }
          //if Command has specific needed roles return error
          if (command.requiredroles && command.requiredroles.length > 0 && message.member.roles.cache.size > 0 && !message.member.roles.cache.some(r => command.requiredroles.includes(r.id))) {
            return message.reply({embeds: [new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(replacemsg(settings.messages.notallowed_to_exec_cmd.title))
              .setDescription(replacemsg(settings.messages.notallowed_to_exec_cmd.description.requiredroles, {
                command: command,
                prefix: prefix
              }))]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, settings.timeout.notallowed_to_exec_cmd.requiredroles)}).catch((e) => {console.log(String(e).grey)});
            
          }
          //if Command has specific users return error
          if (command.alloweduserids && command.alloweduserids.length > 0 && !command.alloweduserids.includes(message.author.id)) {
            return message.reply({embeds: [new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(replacemsg(settings.messages.notallowed_to_exec_cmd.title))
              .setDescription(replacemsg(settings.messages.notallowed_to_exec_cmd.description.alloweduserids, {
                command: command,
                prefix: prefix
              }))]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, settings.timeout.notallowed_to_exec_cmd.alloweduserids)}).catch((e) => {console.log(String(e).grey)});
          }
          //if command has minimum args, and user dont entered enough, return error
          if(command.minargs && command.minargs > 0 && args.length < command.minargs) {
            return message.reply({embeds: [new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setDescription(`${client.emotes.error} **Wrong Command Usage**`)
              .addField(`Proper Usage`,command.argsmissing_message && command.argsmissing_message.trim().length > 0 ? command.argsmissing_message : command.usage ? "Usage: "+ `\`\ ${command.usage} \`\ `: "Wrong Command Usage")            
               ]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, settings.timeout.minargs)}).catch((e) => {console.log(String(e).grey)});
          }
          //if command has maximum args, and user enters too many, return error
          if(command.maxargs && command.maxargs > 0 && args.length > command.maxargs) {
            return message.reply({embeds: [new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setDescription(`${client.emotes.error} **Wrong Command Usage**`)
              .addField(command.argstoomany_message && command.argstoomany_message.trim().length > 0 ? command.argstoomany_message : command.usage ? "Usage: " + `\`\ ${command.usage} \`\ ` : "Wrong Command Usage")]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, settings.timeout.maxargs)}).catch((e) => {console.log(String(e).grey)});
          }
          
          //if command has minimum args (splitted with "++"), and user dont entered enough, return error
          if(command.minplusargs && command.minplusargs > 0 && args.join(" ").split("++").filter(Boolean).length < command.minplusargs) {
            return message.reply({embeds: [new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(":x: Wrong Command Usage!")
              .setDescription(command.argsmissing_message && command.argsmissing_message.trim().length > 0 ? command.argsmissing_message : command.usage ? "Usage: " + command.usage : "Wrong Command Usage")]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, settings.timeout.minplusargs)}).catch((e) => {console.log(String(e).grey)});
          }
          //if command has maximum args (splitted with "++"), and user enters too many, return error
          if(command.maxplusargs && command.maxplusargs > 0 && args.join(" ").split("++").filter(Boolean).length > command.maxplusargs) {
            return message.reply({embeds: [new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(":x: Wrong Command Usage!")
              .setDescription(command.argstoomany_message && command.argstoomany_message.trim().length > 0 ? command.argsmissing_message : command.usage ? "Usage: " + command.usage : "Wrong Command Usage")]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, settings.timeout.maxplusargs)}).catch((e) => {console.log(String(e).grey)});
          }
          //run the command with the parameters:  client, message, args, Cmduser, text, prefix,
          command.run(client, message, args, args.join(" ").split("++").filter(Boolean), message.member, args.join(" "), prefix);
        } catch (error) {
          if (settings.somethingwentwrong_cmd) {
            return message.reply({
              embeds: [new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(replacemsg(settings.messages.somethingwentwrong_cmd.title, {
                  prefix: prefix,
                  command: command
                }))
                .setDescription(replacemsg(settings.messages.somethingwentwrong_cmd.description, {
                  error: error,
                  prefix: prefix,
                  command: command
                }))]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, 4000)}).catch((e) => {console.log(String(e).grey)});
          }
        }
      } else //if the command is not found send an info msg
        return;
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}

