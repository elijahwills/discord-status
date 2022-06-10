const lib = require("lib")({ token: process.env.STDLIB_SECRET_TOKEN });

const { channel_id, message_id } = require("../config.json");
const { discord } = require("../lib/status.js");

if (!channel_id) return "There is no channel ID in the config.json file"
if (!message_id) return "Make sure to enter a valid message ID in the config.json file"

const update = new discord(channel_id, message_id);

await update.editMessage();

if (await update.isIncident()) {
  try {
  return await update.editMessage();
  } catch (e) {
    console.log(e)
    return "Make sure the channel ID or Message ID in the config file are valid!"
  }
} else return "All services are operational";
