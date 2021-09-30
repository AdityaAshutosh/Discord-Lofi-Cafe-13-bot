const client= require('./client');
const ytdl= require('ytdl-core-discord');
const _ = require('lodash');

client.on('ready', async () => {
    console.log(`Bot client Logged in as ${client.user.tag}!`);
  });

  const lofiCafe = async (oldMember, newMember) => {
    const guild_id = process.env.DISCORD_GUILD_ID;
      const channel_name = process.env.DISCORD_CHANNEL_NAME;
    const VOICE_URLS = process.env.VOICE_URLS.split(',')
  
      // find the voice channel 
    const voiceChannel = await guild.channels.cache.find(ch => ch.name === channel_name);
  
    let newUserChannel = newMember.channelID;
    let oldUserChannel = oldMember.channelID;
  
      // a function to play audio in loop
    const play = async (connection) => connection.play(
      await ytdl(_.sample(VOICE_URLS)),
      { type: 'opus', highWaterMark: 50, volume: 0.7 },
    )
    // When the song is finished, play it again.
      .on('finish', play);
  
    const Guild = await client.guilds.fetch(guild_id); 
    const botUserId = await client.user.id;
    const discordBotUser = await Guild.members.cache.get(botUserId); 
  
    if (newUserChannel === voiceChannel.id) {
      // if a user joins lo-fi music channel 
  
      // if bot not in voice channel and users connected to the channel
      if (!discordBotUser.voice.channel && voiceChannel.members.size > 0) {
        // play music
        voiceChannel.join()
          .then(await play)
          .catch(console.error);
      }
    } else if (oldMember && oldMember.channel && oldMember.channel.members
      && !(oldMember.channel.members.size - 1) && oldUserChannel === voiceChannel.id
      && discordBotUser.voice.channel) {
  
          // if there is only one member in the channel (bot itself)
          // leave the server after five minutes
  
      setTimeout(() => { 
                      // wait five minutes
        if (!(oldMember.channel.members.size - 1)) { 
                      // if there's still 1 member,
          oldMember.channel.leave();
        }
      }, 60000); // leave in 1 minute
    }
  };

  client.on('voiceStateUpdate', lofiCafe); 