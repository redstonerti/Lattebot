const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'clear',
    description: "clears the chat",
    execute(vars)
    {
        var args = vars['args'];
        var message = vars['message'];
        if (message.member.hasPermission('MANAGE_MESSAGES') === false)
        {
            if (vars['id'] != 422492063574130688)
            {
                message.channel.send(`No. You don't have the power. Dumb.`);
                return;
            }
        }
        if (args.length === 1)
        {
            funcs.Say(message, `Clear command`, `**Syntax**: clear + number of messages\n**Description**: The clear command simply deletes the amount of messages specified`);
            return;
        }
        args[1] = Number(args[1]);
        if (isNaN(args[1]))
        {
            message.channel.send(`That's not a number`);
            return;
        }
        message.channel.bulkDelete(args[1])
    }
}