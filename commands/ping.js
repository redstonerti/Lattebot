const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'ping',
    description: "says pong!",
    execute(vars)
    {
        var message = vars['message'];
        var args = vars['args'];
        var prefix = vars['prefix'];
        funcs.Say(message, 'pong', '');
    }
}