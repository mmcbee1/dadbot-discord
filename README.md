# CMS Bot!

description

### To Do

#### Codewise
1. Turn CMS commands into [registered slash commands](https://discordjs.guide/creating-your-bot/creating-commands.html#registering-commands)
2. Update handlers to use Interaction events
3. Embedded message moderation - approve / deny / edit
   1. put /message
   2. del /message
4. ~~Add bot reaction emoji instead of add message response~~
5. Use axios instead of fetch
   1. Handle errors less obtrusively 
   2. convert err ifs to try/catch
6. Add setup tools for permissions
   1. slash commands available only for mods/owner (via dm?)
   2. options: require approval before adding via disc?
7. Figure out api auth/jwt for get calls via twitch/SE
8. How to deal with emojis


#### Documentation
1. Setup instructions
   - How to add bot to discord server
   - How to set up bot permissions as disc owner
   - Create /help instructions for disc users
   - Endpoint generators for Stream Elements/Labs etc for twitch commands

### Bot Setup
1. Generate invite link from application page in [Discord Development Portal](https://discord.com/developers/applications)
2. Owner/admin for the server needs to click link to allow bot
   1. Needs to be a role with 'manage server' permission
3. Add GET endpoint calls to twitch command interface
   1. [Stream Elements](https://streamelements.com/dashboard/bot/commands/custom)
   2. Recommendation: use the same channel command names as your tag names so people will be able to add them via Discord more intuitively
4. Add owner's discord ID to allowed users for admin commands
