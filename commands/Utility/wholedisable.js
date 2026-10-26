const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json");
const schema = require('../../models/wcommand')
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "wholedisable",
  category: "Utility", 
  aliases: ["w-disable","wdisable-cmd","wdisable"], 
  cooldown: 2, 
  usage: ">wholdisable <commandname>", 
  description: "disables a command for entire server", 
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
                if(data.Cmds.includes(`${cmd}`)) return message.channel.send('This command is already disabled for the whole guild.');
                data.Cmds.push(`${cmd}`)
            } else {
                data = new schema({
                    Guild: message.guild.id,
                    Cmds: `${cmd}`,
                
                })
            }
            await data.save();
            const embed = new MessageEmbed()
            .setDescription(`${client.emotes.success} Command ${cmd} has been disabled sucessfully for the entire server!`)
            .setFooter(`Arxiya by ReYMiz`)
            .setColor(client.y.y)

            message.channel.send({embeds:[embed]})
        })
    }catch{}


  }
}

