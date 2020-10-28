const axios= require('axios');

async function fetchGif(){
    const {data:{data:{images:{downsized_large:{url:newGifUrl}}}}} = await axios.get('https://api.giphy.com/v1/gifs/random',{ params:{
         api_key:process.env.GIPHY_API_KEY,
         tag:'henrycavill',
     }});
    return newGifUrl
}
module.exports = {fetchGif}