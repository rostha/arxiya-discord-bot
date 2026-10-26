"use strict";

const required = ["DISCORD_TOKEN","MONGODB_URI"];
const values = {};
for (const name of required) {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new Error(`Missing ${name}. Set it in your environment before starting the bot.`);
  }
  values[name] = value;
}
module.exports = values;

