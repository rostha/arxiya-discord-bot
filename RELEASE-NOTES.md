# arxiya-discord-bot

A customized Discord.js v13 community bot with moderation, server utilities, message logging, and games.

This is a sanitized release candidate of the historical project at https://github.com/rostha/Arxiyaofficial. It contains the latest selected source snapshot, without the original Git history. The release preparation does not claim that all included code was originally authored by the maintainer.

## Setup

This project uses legacy Discord.js APIs. The dependency stack has not been modernized or tested against a live Discord server.

Install dependencies with `npm install`. Supply `DISCORD_TOKEN` and `MONGODB_URI` through your hosting environment or shell, then run `npm start`. `.env.example` lists the variable names; these prepared copies do not automatically load a `.env` file.

PowerShell example:

```powershell
$env:DISCORD_TOKEN = '<your-bot-token>'
$env:MONGODB_URI = '<your-database-uri>'
npm start
```

Use the Discord Developer Portal to configure any intents and permissions required by the selected commands. Configure non-secret prefixes and server options in the existing configuration files.

## Attribution and license

All existing source comments, attribution notices, and license files have been retained. The existing MIT LICENSE is retained and package metadata has been aligned to it. Several source files explicitly credit Tomato6966/Milrato and other contributors; their upstream licensing still needs verification.

## Release status

Credentials have been removed from this snapshot. Rotate previously committed credentials separately. No live credential validity tests or dependency installation scripts were run. Review the accompanying validation report before publishing.

