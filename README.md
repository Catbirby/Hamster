# Hamster
A music bot for self hosting purposes, made in node.js
## `settings.json`
The bot configuration is stored in a file called `settings.json`

When configuring the bot you will need to set the `ownerid` and `token` fields.

Optional fields are `youtube-api` and `moderators`, and `noLog`.

`token` is the token<sup>1</sup> the bot is supposed to run under.  
`ownerid` is the Discord ID<sup>2</sup> of the person running the bot. Gives access to owner commands.  
`prefix` is prefix used by the bot. Defaults to `ham.`.  
`youtube-api` is the Youtube Data API<sup>3</sup> token used to parse playlists and do YouTube searches.  
`moderators` is a JSON array of Discord IDs<sup>2</sup> of moderators. They get access to all commands but `eval` and `shutdown`. 
Default, and in case of a type mismatch: `[]`

There is one more field, a Boolean, called `noLog`. It will disable `latest.log` if set to `true`. Defaults to `false`

Example of the file:
```json
{
  "token": "Mfa.sjaslkkngejfnesjkaNiCETokeNBrosdhsajshfjkjlajf",
  "youtube-api": "AIzahaHa8zY-8aNiCETokeNBmatyhPgoW-ABI",
  "ownerid": "155954930191040513",
  "prefix": "ham.",
  "noLog": false
}
```
## ffmpeg or avconv
To run the bot it is required to have ffmpeg or avconv
- avconv: `sudo apt-get install libav-tools`
- ffmpeg: A guide to installing this can be found [here](https://github.com/adaptlearning/adapt_authoring/wiki/Installing-FFmpeg)

## Music
To give someone access to `queue` and `skip` and other music commands, either add their ID to the `moderators` field, or give them a role named `DJ`.

## Moderators
Every user in the `moderators` array will get access to commands for moderating chat<strike> that are coming soon™</strike>.  
They will also get access to DJ commands even without the role.

## `latest.log`
The bot will collect all the logs printed to console into a `latest.log` file. 
Together with the timestamps and all that fancy.

To disable set the `noLog` option to true in `settings.json`

### Addition
1. Discord bot token can be obtained [here](HTTPS://discordapp.com/developers/docs/intro)
2. Discord IDs can be obtained by enabling `Developers Mode` in `Appearance` under `User Settings`,
 and then right clicking a user and pressing `Copy ID`
3. https://developers.google.com/youtube/v3/getting-started
