
const config = require("../../botconfig/config.json")

const settings = require("../../botconfig/settings.json");
const ee = require("../../botconfig/embed.json");
const { MessageEmbed} = require("discord.js")
const Discord = require("discord.js"); 
const Schema = require("../../models/mutes")
module.exports = async (message, member) => {
 try{
    const data = await Schema.findOne({Guild: member.guild.id});
    if(!data) return;
    const user = data.Users.findIndex((prop) => prop === member.id)
    if(user == -1) return;
    const role = member.guild.roles.cache.find(role => role.name === 'Unconscious') ||  member.guild.roles.cache.find(role => role.name === 'Muted') 
    member.roles.add(role.id)
    const i = new MessageEmbed()
    .setTitle(`Muted`)
    .setAuthor(`Nice Try`)
    .setColor("RED")
    .setDescription(`You are muted cuz you were muted before you left`)
    .setTimestamp()

    await member.send({embeds :[i]})
 }catch{}
}
