# Arxiya

A customized Discord community bot organized around moderation, server utilities, message logging, and games.

**JavaScript · Discord.js v13 · Historical project (2021)**

## Overview

- Moderation commands, role and member information, and server utilities.
- Message-event features and configurable logging.
- Separate command, event, and slash-command handlers.
- MongoDB models for server-specific settings.

## Code map

| Path | Responsibility |
| --- | --- |
| `commands/` | Grouped commands and permissions |
| `slashCommands/` | Application-command modules |
| `events/` | Client and guild event handlers |
| `models/` | MongoDB-backed settings |
| `handlers/` | Command discovery and shared behavior |

## Run locally

Install the dependencies:

```sh
npm install
```

Set the required environment variables in your shell or hosting service:

| Variable | Purpose |
| --- | --- |
| `DISCORD_TOKEN` | Token for your own Discord bot |
| `MONGODB_URI` | Connection string for your own MongoDB database |

Start the bot with `npm start`. The blank [`.env.example`](.env.example) lists the required names; this copy does not automatically load a `.env` file. Non-secret bot preferences live in [`botconfig/`](botconfig/).

## Project history and current status

The original repository contains development commits from **2021**. This public repository is a sanitized source snapshot published in 2026; it does not import or backdate the private Git history.

This code uses legacy Discord.js APIs. The release preparation checked JavaScript syntax, JSON configuration, environment-variable guards, and embedded credential patterns. It has not been tested as a running bot against the current Discord API. It is presented as historical learning and customization work, rather than a maintained production template.

## Attribution

Existing source credits remain intact. See [ATTRIBUTION.md](ATTRIBUTION.md) and [RELEASE-NOTES.md](RELEASE-NOTES.md) for provenance and license details.
