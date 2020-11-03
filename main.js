const {Client,MessageAttachment}= require('discord.js');
const client = new Client();
const CronJob = require('cron').CronJob;
const Srv = require('./services/fetchGif');
require('dotenv').config();


client.on("ready", ()=>{
});

const henryRegex = RegExp('henry|cavill','gmi');
const dailyHenryMessage = new CronJob('0 10 * * *', async () => { //Daily message à 10:00 AM
        const newGifUrl = await Srv.fetchGif();
        const gifEmbed = {
            color: '#0099ff',
            title: 'Daily Henry',
            description:'Hello there, here\'s your daily Henry Cavill GIF. Have a nice day 😄!',
            image:{
                url: newGifUrl,
            }
        };
        //This will send the message on the first textual channel
        //env are for my private channels ids, can be removed
        const channelID = (process.env.MY_RANDOM_CHANNEL_ID || process.env.MEMES_CHANNEL_ID) || client.channels.cache.filter(channel=>channel.type==='text').first().id.send({embed:gifEmbed});
        // If you want to send the message to a specific channel, change channelID by the channel's ID (as a string) and remove the line above
        client.channels.cache.get(channelID).send({embed:gifEmbed});
});

client.on('message', async message => {
    if (message.content === '!HenryGif') {
        const newGifUrl = await Srv.fetchGif();
        const attachedGif = new MessageAttachment(newGifUrl)
        message.channel.send(`Hi ${message.author.username} ! Here's a GIF just for you 😉`,attachedGif)
    } else if (henryRegex.test(message.content)) {
        message.react('😘');
        const newGifUrl = await Srv.fetchGif();
        const attachedGif = new MessageAttachment(newGifUrl);
        message.channel.send(`Speaking of me ${message.author.username} ? Here\'s another one just for you. Love on you 🥰`,attachedGif);
    }
})
client.login(process.env.BOT_TOKEN);
dailyHenryMessage.start();
