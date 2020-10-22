const Discord= require('discord.js');
const client = new Discord.client();
const dotenv=require('dotenv')

client.on("ready",function(){
    console.log('my bot is ready!')
})

client.login(dotenv.BOT_TOKEN)