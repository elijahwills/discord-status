const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const { channel_id } = require('../config.json');
if (!channel_id) return "There is no channel ID in the config.json file"

const { discord } = require('../lib/status.js');

const post = new discord(channel_id);

try {
return await post.sendMessage();
} catch (e) {
  console.log(e)
  return "Make sure your channel ID in your config.json is valid!"
}