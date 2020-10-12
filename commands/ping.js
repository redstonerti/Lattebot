const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'ping',
    description: "says pong!",
    execute(vars)
    {
        var message = vars['message'];
        var args = vars['args'];
        var bot = vars['bot'];
        var prefix = vars['prefix'];
        funcs.Say(message, 'pong', `Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ws.ping)}ms`);
    }
}