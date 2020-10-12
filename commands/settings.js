const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'settings',
    description: "says pong!",
    execute(vars)
    {
        var message = vars['message'];
        var args = vars['args'];
        var db = vars['db'];
        var guild_settings = vars['guild settings'];
        if (vars['is dm']) 
        {
            vars['message'].channel.send(`❌ This command cannot be used in dms as it relies on being in a guild to function ❌`);
            return;
        }
        if (!message.member.hasPermission('ADMINISTRATOR') && message.author.id != 422492063574130688)
        {
            message.channel.send(`<:megathink:739036702047469670> You do not have administrator permissions in this server. SKIDDADLE OUTTA HERE. <:jail:739035711096750081>`);
            return;
        }
        if (args.length > 1)
        {
            var setting = funcs.AutoFill(args[1], ['prefix', 'reactions', 'allowed', 'welcoming']);
            if (setting === null) return;
            switch (setting)
            {
                case ('prefix'):
                    if (args[2] != ' ' && args[2] != undefined)
                    {
                        guild_settings['prefix'] = args[2];
                    }
                    else
                    {
                        message.channel.send(`Set your prefix to something normal please. Not just empty space`);
                        return;

                    }
                    break;
                case ('reactions'):
                    var state = funcs.AutoFill(args[2], ['true', 'false']);
                    if (state === null) return;
                    if (state === 'true')
                    {
                        guild_settings['reaction images'] = true;
                    }
                    else if (state === 'false')
                    {
                        guild_settings['reaction images'] = false;
                    }
                    break;
                case ('welcoming'):
                    var state = funcs.AutoFill(args[2], ['true', 'false']);
                    if (state === null) return;
                    if (state === 'true')
                    {
                        guild_settings['welcoming'] = true;
                    }
                    else if (state === 'false')
                    {
                        guild_settings['welcoming'] = false;
                    }
                    break;
                case ('allowed'):
                    var add_or_remove = funcs.AutoFill(args[2], ['add', 'remove']);
                    if (add_or_remove === null) return;
                    var channel_name = ``;
                    for (var count = 3; count < args.length; count++)
                    {
                        channel_name += ` ${args[count]}`;
                    }
                    channel_name = channel_name.substring(1);
                    if (channel_name === ' ' || channel_name === undefined)
                    {
                        message.channel.send(`I need a channel name`);
                        return;
                    }
                    var channel = message.guild.channels.cache.find(channel => channel.name === channel_name);
                    if (!channel)
                    {
                        message.channel.send(`${channel_name} doesn't doesn't exist in your server`);
                        return;
                    }
                    var allowed_channels = guild_settings['allowed channels'];
                    if (add_or_remove === 'add')
                    {
                        for (var count = 0; count < allowed_channels.length; count++)
                        {
                            if (allowed_channels[count] === channel_name)
                            {
                                message.channel.send(`You already added this channel`);
                                return;
                            }
                        }
                    }
                    var new_allowed_channels;
                    if (add_or_remove === 'add')
                    {
                        new_allowed_channels = allowed_channels;
                        new_allowed_channels.push(channel_name);
                    }
                    else if (add_or_remove === 'remove')
                    {
                        new_allowed_channels = [];
                        for (var count = 0; count < allowed_channels.length; count++)
                        {
                            if (allowed_channels[count] != channel_name)
                            {
                                new_allowed_channels.push(allowed_channels[count]);
                            }
                        }
                    }
                    guild_settings['allowed channels'] = new_allowed_channels;
                    break;
            }
        }
        var reaction_images = guild_settings['reaction images'];
        var allowed_channels = guild_settings['allowed channels'];
        var welcoming = guild_settings['welcoming'];
        var allowed_channels_display = ``;
        if (allowed_channels.length === 0)
        {
            allowed_channels = `None (\`Lattebot is accesible anywhere\`)`;
        }
        else
        {
            for (var count = 0; count < allowed_channels.length; count++)
            {
                allowed_channels_display += `${allowed_channels[count]}\n`;
            }
        }
        var prefix = guild_settings['prefix'];
        var menu = `
        Prefix: \`${prefix}\`
        Reaction images: \`${reaction_images}\`
        Welcoming: \`${welcoming}\`
        Allowed channels:
        ${allowed_channels_display}`;
        var instructions = `
        ${prefix}settings prefix <\`anything\`>
        ${prefix}settings reactions <\`true\` or \`false\`>
        ${prefix}settings welcoming <\`true\` or \`false\`>
        ${prefix}settings allowed <\`channel\`> <\`add\` or \`remove\`> <\`channel\`>`;
        funcs.Say(message, `⚙️ Server settings ⚙️`, ``, undefined, undefined, `Settings`, menu, `Instructions`, instructions);
        db.run(`UPDATE servers SET settings = ? WHERE id = ?`, [JSON.stringify(guild_settings), message.guild.id]);
    }
}