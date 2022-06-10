# Discord Status
This is an [autocode](https://autocode.com) project that allows you to live monitor discord servcies and third parties status right from your discord server! You can check if a service is down or is encountering an issue, it's expoliting the [discord status API](https://discordstatus.com/api) and been turned to a simple discord embed to keep trackdown easy!

# Features
- Live updates from [status](https://discorstatus.com)
- Auto embed color updater for different status (none, minor, major & critical)
- Fully customizable

# Configuration
1. Clone this repostory `git clone https://github.com/elijahwills/discord-status`
2. Open your files in your code editor
3. Open the `config.json` file and edit all your preferences
> Add emojis for `colors` using the emoji name and ID (you can get it by using `\EMOJI_HERE`and copy the result
> Add colors for embed color (you can leave them blank if you don't want to)
> Add a channel ID for the bot to send the message
4. Upload your files on [autocode](https://autocode.com)
5. On the left bottom of the page click **Environmental Variables** and add your bot token
6. Run the `post.js` file under `functions/`folder
7. Copy the message ID sent in your discord server and add it in the config.json file
8. Change the `update.js`endpoint trigger to what you want (note that this is when the bot is going to change and update the embed after every x time)

You got it!

# Disclamair
This project is meant to be an NPM library, I'm still pushing some updates and should make them public soon! :)
