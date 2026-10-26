const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const getprefix = require("../../utils/getprefix")

module.exports = {
  name: "help",
  category: "Information", 
  aliases: ["h", "commandinfo", "cmds", "cmd", "halp"], 
  cooldown: 3, 
  usage: "help [Commandname]", 
  description: "Returns all Commmands, or one specific command", 
  memberpermissions: [], 
  requiredroles: [], 
  alloweduserids: [],
  minargs: 0, 
  maxargs: 0, 
  minplusargs: 0, 
  maxplusargs: 0, 
  argsmissing_message: "",
  argstoomany_message: "", 
    run: async (client, message, args, plusArgs, cmdUser, text) => {
      const prefix =  await getprefix(message.guild.id);
        if (args[0]) {
          const embed = new MessageEmbed();
          const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
          if (!cmd) {
              return message.reply({embeds: [embed.setColor(ee.wrongcolor).setDescription(`No Information found for command **${args[0].toLowerCase()}**`)]});
          }
          if (cmd.name) embed.addField("**Command name**", `\`${cmd.name}\``);
          if (cmd.name) embed.setTitle(`Information about:\`${cmd.name}\``);
          if (cmd.description) embed.addField("**Description**", `\`${cmd.description}\``);
          if (cmd.aliases) embed.addField("**Aliases**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
          if (cmd.cooldown) embed.addField("**Cooldown**", `\`${cmd.cooldown} Seconds\``);
          else embed.addField("**Cooldown**", `\`${settings.default_cooldown_in_sec} Second\``);
          if (cmd.usage) {
              embed.addField("**Usage**", `\`${prefix}${cmd.usage}\``);
              embed.setFooter(ee.footertext);
          }
          return message.reply({embeds: [embed.setColor(ee.color)]});
        } else {
          const row = new MessageActionRow()
          .addComponents(
      new MessageButton()
  .setLabel("Invite")
  .setStyle("LINK")
  .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1477831806&scope=applications.commands%20bot`),
          )
                  .addComponents(
      new MessageButton()
  .setLabel("Vote")
  .setStyle("LINK")
  .setURL(`https://top.gg/bot/795184988035350530`),
          )
               
          
          const embed = new MessageEmbed()
          
           .setAuthor(`${client.user.username}`,`${client.user.avatarURL({dynamic:true})}`)
           .setTitle(`Help`)
           .setThumbnail(`https://c.tenor.com/G452IB4_oCIAAAAi/animation-anime.gif`)
           .setImage(`https://cdn.discordapp.com/attachments/874591066400112660/886155363462815774/Arxiya.gif`)
           .setDescription(`
           **${client.emotes.wave} Hey, I'm Arxiya!** \n The functions listed below are my commands.\n My current prefix in this server is \`\ ${prefix} \`\ \n You can use \`\ ${prefix}help <command name> \`\ for further details.`)
           .addField('Commands not working?',`Makesure I have enough permissions to perform that task. \n Also makesure to check the channel overrides permission with my roles.`)
           .addField(`<:Autumn_Moderation:882121355603111987>  Moderation`,"`embed`, `permissions`, `kick`, `ban`, `mute`, `unmute`, `unban`, `softban`, `unbanall`, `voicekick`, `setnick`, `purge`")
           .addField(`<:chat:884997942619041852>  Chat`, "`say`, `sayembed`, `lock`, `unlock`, `slowmode`, `snipe`, `editsnipe`")
           .addField(`<a:bluebutterfly:884980656776564746>  Fun`, "`truth`, `dare`, `quote`, `tictactoe`, `waifu`, `anime`, `baka`, `cuddle`, `kiss`, `hitler`, `hug`, `jail`, `delete`, `feed`, `pat`, `poke`, `rip`, `shit`, `slap`, `trigger`, `wanted`, `wasted`, `cattext`, `flip`, `ratewaifu`, `owoify`, `meme`, `8ball`")
           .addField(`<:Autumn_info:884979636885401620>  Information`, "`avatar`, `userinfo`, `banner`, `lookup`, `membercount`, `help`, `fetch-bans`, `bancount`, `ping`, `anime`, `serverinfo`, `urban`")
           .setColor("YELLOW")
            .addField(`⚙️  Utility`,"`invite`, `prefix`, `patchnotes`, `vote`, `info`, `setchat`, `removechat`, `setmsglogs`, `disablemsglogs`, `enable`, `disable`, `wholeenable`, `wholedisable`")
            .setFooter(`By Remyz Github- @ItzRemy69, you can always suggest new features to be added using command \n ${prefix}suggest & report bugs or other essentials using ${prefix}report. \n Every report is valuable in improvement of Arxiya.`)
           if(!message.channel.nsfw){
            embed.addField(`<:nsfwchannel:884998317719830528>  NSfw [30+]`,"`Can't show in non NSFW channels`")
          }else{embed.addField(`<:nsfwchannel:884998317719830528>  NSfw`,"`YuriYuri`, `trap`, `spank`, `pussy`, `porn`, `kuni`, `hentai`, `keta`, `hboobs`, `lewdneko`, `lewdnekogif`, `kitsune`, `holoero`, `holo`, `hentaigif`, `hboobs`, `gasm`, `futanari`, `femdom`, `eroyuri`, `erokitsune`, `ero`, `cumslut`, `boobs`, `blowjob`, `bj`, `ass`, `anal`, `2feetgif`, `2dtits`, `2dfeet`, `2dboobs`, `2danal`")}
          message.channel.send({embeds: [embed], components: [row]});
            }
                    
        
      }
   
    }
  


