const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json");
const schema = require('../../models/command')
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "enable",
  category: "Utility", 
  aliases: ["enable-command","enable-cmd"], 
  cooldown: 2, 
  usage: ">enable <command-name>", 
  description: "enables a disabled command in a channel", 
  memberpermissions: ["MANAGE_GUILD"], 
  requiredroles: [],
  alloweduserids: [],
  minargs: 1, 
  maxargs: 0, 
  minplusargs: 0, 
  maxplusargs: 0,
  argsmissing_message: "", 
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
  

    try{
        const cmd = args[0];
              if(!cmd) return message.channel.send(`${client.emotes.error} You must specify a command.`)
              if(!!client.commands.get(cmd) === false) return message.channel.send(`${client.emotes.error}  This command does not seems to exist.`);
              schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                if(err) throw err;
                if(data) {
                    if(data.Cmds.includes(`${cmd} | ${message.channel.id}`)) {
                        let commandNumber;
      
                        for (let i = 0; i < data.Cmds.length; i++) {
                            if(data.Cmds[i] === `${cmd} | ${message.channel.id}`) data.Cmds.splice(i, 1)
                        }
      
                        await data.save()
                        const embed = new MessageEmbed()
                        .setDescription(`${client.emotes.success} Command ${cmd} has been enabled sucessfully for this channel!`)
                        .setFooter(`Arxiya by ReYMiz`)
                        .setColor(client.y.y)
                        message.channel.send({embeds:[embed]})
                    }  else return message.channel.send(`${client.emotes.success} The command is already enabled successfully for this channel`)
                }
              })
          }catch{}

  }
}

