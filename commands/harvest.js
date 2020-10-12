const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
const plant = require('./plant.js');
module.exports = {
    name: 'harvest',
    description: "Harvest your corn",
    execute(vars)
    {
        var message = vars['message'];
        var corn = Number(vars['corn']);
        var seed = vars['seed'];
        var farm = vars['farm'];
        var planted_farm = JSON.parse(vars['planted farm']);
        var db = vars['db'];
        var time = vars['time'];
        var id = vars['id'];
        var player_tier = vars['player tier'];
        var Farmables = vars['Farmables'];
        var Items = vars['Items'];
        var args = vars['args'];
        var item = '';
        /*
        var new_last_harvested = 0;
        
        */
        if (player_tier <= 2)
        {
            item = 'corn';
        }
        else
        {
            item = funcs.AutoFill(args[1], Farmables);
            if (item === null) return;
        }
        if (planted_farm[item] < 0.01)
        {
            message.channel.send(`None of your ${item} farms are planted`);
            return;
        }
        var harvest_time = Math.min(time - planted_farm[item + ' harvest'], 10000);
        var items_harvested = Number(harvest_time * planted_farm[item] * 0.01).toFixed(0);
        var seeds_gained = Math.floor(items_harvested * 1.2);
        planted_farm[item] = Number(planted_farm[item]) - items_harvested * 0.01;
        if (items_harvested >= 1)
        {
            planted_farm[item + ' harvest'] = time;
        }
        if (farm < 1)
        {
            message.channel.send(`You don't have any farms`);
            return;
        }
        space_left = farm;
        for (var count = 0; count < Farmables.length; count++)
        {
            space_left -= planted_farm[Farmables[count]];
        }
        var farm_layout = ``;
        for (var count = 0; count < Farmables.length; count++)
        {
            var number = planted_farm[Farmables[count]];
            var tier = Items[Farmables[count]]['tier'];
            if (player_tier < tier) continue;
            farm_layout += `${Items[Farmables[count]]['emoji']} ${funcs.CapitalFirst(Farmables[count])}: ${funcs.ConvertToUnit(number)} | ${funcs.ConvertToUnit(number / farm * 100)}%\n`;
        }
        farm_layout += `Empty space: ${funcs.ConvertToUnit(space_left)} | ${funcs.ConvertToUnit(space_left / farm * 100)}%`;
        message.channel.send(`You just harvested \`${funcs.ConvertToUnit(items_harvested)}\` ${item} and \`${funcs.ConvertToUnit(seeds_gained)}\` seeds\nYou now have \`${funcs.ConvertToUnit(Number(vars[item]) + Number(items_harvested))}\` ${item} and \`${funcs.ConvertToUnit(seeds_gained + seed)}\` seeds\nFarm Layout:\n${farm_layout}`);
        db.run(`UPDATE data SET seed = ?, planted_farm = ?, ${item.replace(' ', '_')} = ? WHERE id = ?`, [seed + seeds_gained, JSON.stringify(planted_farm), Number(vars[item]) + Number(items_harvested), id]);
    }
}