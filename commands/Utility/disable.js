const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const schema = require('../../models/command')

module.exports = {
  name: "disable",
  category: "Utility", 
  aliases: ["disable-command", "disable-cmad"], 
  cooldown: 2, 
  usage: ">disable <command name>", 
  description: "Disables a command in a channel", 
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
        if(!cmd) return message.channel.send('<:Autumn_failure:861932733404151808> You must specify a command.')
        if(!!client.commands.get(cmd) === false) return message.channel.send('<:Autumn_failure:861932733404151808> This command does not seems to exist.');
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                if(data.Cmds.includes(`${cmd} | ${message.channel.id}`)) return message.channel.send('This command is already disabled in this channel.');
                data.Cmds.push(`${cmd} | ${message.channel.id}`)
            } else {
                data = new schema({
                    Guild: message.guild.id,
                    Cmds: `${cmd} | ${message.channel.id}`,
                
                })
            }
            await data.save();
            const embed = new MessageEmbed()
                        .setDescription(`${client.emotes.success} Command ${cmd} has been disabled sucessfully for this channel!`)
                        .setFooter(`Arxiya by ReYMiz`)
                        .setColor(client.y.y)

            message.channel.send({embeds:[embed]})
        })
    }catch{}

  }
}

