const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'plant',
    description: "Plant corn",
    execute(vars)
    {
        var message = vars['message'];
        var seed = vars['seed'];
        var farm = vars['farm'];
        var db = vars['db'];
        var item;
        var id = vars['id'];
        var args = vars['args'];
        var amount;
        var player_tier = vars['player tier'];
        var Farmables = vars['Farmables'];
        console.log(Farmables);
        var planted_farm = JSON.parse(vars['planted farm']);
        var space_left = farm;
        var Items = vars['Items'];
        var time = vars['time'];
        var items_planted;
        for (var count = 0; count < Farmables.length; count++)
        {
            space_left -= planted_farm[Farmables[count]];
        }
        space_left = Math.max(space_left, 0);
        if (space_left <= 0.01)
        {
            message.channel.send(`All your farms are already planted`);
            return;
        }
        if (seed < 1)
        {
            message.channel.send(`You don't have any seeds`);
            return;
        }
        if (farm < 1)
        {
            message.channel.send(`You don't have any farms`);
            return;
        }
        if (player_tier <= 2)
        {
            item = 'corn';
            items_planted = Math.min(seed / 100, space_left);
            planted_farm['corn'] = Number(planted_farm['corn']) + items_planted;
        }
        else
        {
            amount = funcs.AutoFill(args[1], ['max', 'all'], false);
            if (amount)
            {
                amount = Math.min(space_left, seed / 100);
            }
            else
            {
                amount = funcs.ConvertToNumber(args[1]);
            }
            if (isNaN(amount))
            {
                item = funcs.AutoFill(args[1], Farmables);
                amount = 1;
            }
            else
            {
                item = funcs.AutoFill(args[2], Farmables);
            }
            if (item === null) return;
            items_planted = Math.min(amount, Math.min(space_left, seed / 100));
            planted_farm[item] = Number(planted_farm[item]) + Math.min(space_left, Number(items_planted));
        }
        planted_farm[item + ' harvest'] = time;
        space_left = farm;
        for (var count = 0; count < Farmables.length; count++)
        {
            space_left -= planted_farm[Farmables[count]];
        }
        var new_seeds = Math.max(seed - items_planted * 100, 0);
        var farm_layout = ``;
        for (var count = 0; count < Farmables.length; count++)
        {
            var number = planted_farm[Farmables[count]];
            var tier = Items[Farmables[count]]['tier'];
            if (player_tier < tier) continue;
            farm_layout += `${Items[Farmables[count]]['emoji']} ${funcs.CapitalFirst(Farmables[count])}: ${funcs.ConvertToUnit(number)} | ${funcs.ConvertToUnit(number / farm * 100)}%\n`;
        }
        farm_layout += `Empty space: ${funcs.ConvertToUnit(space_left)} | ${funcs.ConvertToUnit(space_left / farm * 100)}%`;
        message.channel.send(`\`+ ${funcs.ConvertToUnit(items_planted)}\` ${item}  farms\n\`- ${funcs.ConvertToUnit(items_planted * 100)} seeds\`\n\`${funcs.ConvertToUnit(new_seeds)}\` seeds left\nFarm layout:\n${farm_layout}`);
        db.run(`UPDATE data SET seed = ?, planted_farm = ? WHERE id = ?`, [new_seeds, JSON.stringify(planted_farm), id]);
    }
}