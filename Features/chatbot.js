

console.log("Loading Chatbot".brightCyan)
const { Collection, Client, Discord, MessageEmbed } = require('discord.js');
const  fetch  = require('node-fetch');
const {
    findOne
} = require('../models/chatbot');
const Schema = require('../models/chatbot');
module.exports = async (client, message) => {
       try{

client.on('messageCreate', async (message) => {
    if (message.channel.type == "dm" ) return;

    if (message.author.bot) return; // i put in the command by mistake lol
    await Schema.findOne({
        guild: message.guild.id
    }, async (err, data) => {
        if (!data) return;
        if (err) throw err;
        const channell = data.channel

        if (message.channel.id === channell) {
            message.channel.sendTyping();
            fetch(`http://api.brainshop.ai/get?bid=154819&key=${process.env.key}&uid=${message.author.id}&msg=${message.content}`) // this is the api we are using
                .then(response => response.json()).catch(err => {
                    if(err) return message.channel.send(`Looks like you're using emojis`)
                  })
                .then(data => {
                    message.reply({content: `${data.cnt || `Okiew`}`, allowedMentions: {
                        "parse": []
                      }})
                                   
                }) 
        }
    })
})
       }catch{}
}

console.log("Chat bot loaded".brightCyan)
