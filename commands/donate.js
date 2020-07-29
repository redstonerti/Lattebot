const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'donate',
    description: "Gives a link to patreon",
    execute(vars)
    {
        var message = vars['message'];
        var args = vars['args'];
        funcs.Say(message, '', 'You can support me and this bot by buying me a coffee in my [ko-fi](https://ko-fi.com/redstonerti#paymentModal "thanks man")');
    }
}
