const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'leaderboard',
    description: "says pong!",
    async execute(vars)
    {
        var message = vars['message'];
        var player_amount;
        var variable = ``;
        var db = vars['db'];
        var id = vars['id'];
        var args = vars['args'];
        var prefix = vars['prefix'];
        var VariableNames = funcs.GetPropertyNames(vars['Variables']);
        var names = ``;
        var values = ``;
        if (args.length < 3)
        {
            funcs.Say(message, `Leaderboard command`, `**Syntax:** leaderboard + [amount (\`up to 20\`)] + [sorted thing]\n\n**Description**: The leaderboard command shows you the players that have the highest or lowest of ANY value\n\n**Examples:** \`leaderboard 5 balance\` => \`l 5 balance\`\n \`leaderboard 20 milk\` => \`l 20 m\``);
            return;
        }
        player_amount = Number(args[1]);
        if (isNaN(player_amount))
        {
            message.channel.send(`${args[1]} isn't a number`);
            return;
        }
        player_amount = Math.floor(player_amount);
        if (player_amount < 0)
        {
            message.channel.send(`Don't give me negative numbers you scum`);
            return;
        }
        if (player_amount === 0)
        {
            message.channel.send(`You're asking me for nothing, so i'm giving you nothing`);
        }
        player_amount = Math.min(player_amount, 20);
        for (var count = 2; count < args.length; count++)
        {
            variable += ` ${args[count]}`;
        }
        variable = variable.substring(1);
        variable = funcs.AutoFill(message, variable, VariableNames);
        if (variable === null)
        {
            return;
        }
        variable = variable[0].toString();
        query = `SELECT name, ${variable} FROM data ORDER BY ${variable.replace(' ', '_')} DESC`;
        promise = new Promise(reslove =>
        {
            db.all(query, [], (err, row) =>
            {
                if (err)
                {
                    console.log(err);
                    reslove(false);
                    return;
                }
                reslove(row);
                return;
            })
        })
        var LeaderboardValues = await promise;
        player_amount = Math.min(LeaderboardValues.length, player_amount);
        var display_count = 0;
        for (var count = 0; count < player_amount; count++)
        {
            var name = LeaderboardValues[count]['name'];
            if (name === '')
            {
                continue;
            }
            if (display_count === 0)
            {
                name = `🥇 ${name}`;
            }
            else if (display_count === 1)
            {
                name = `🥈 ${name}`;
            }
            else if (display_count === 2)
            {
                name = `🥉 ${name}`;
            }
            else
            {
                name = `**${display_count + 1}.** ${name}`;
            }
            display_count++;
            var amount = LeaderboardValues[count][variable];
            names += `${name}\n`;
            values += `${funcs.ConvertToUnit(amount)}\n`;
        }
        funcs.Say(message, `Leaderboard`, ``, undefined, undefined, `Name:`, names, funcs.CapitalFirst(variable) + `:`, values);
    }
}