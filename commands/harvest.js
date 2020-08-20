const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'harvest',
    description: "Harvest your corn",
    execute(vars)
    {
        var message = vars['message'];
        var corn = Number(vars['corn']);
        var seed = vars['seed'];
        var farm = vars['farm'];
        var last_harvested = vars['last harvested'];
        var planted_farm = vars['planted farm'];
        var db = vars['db'];
        var time = vars['time'];
        var id = vars['id'];
        if (last_harvested === 0)
        {
            last_harvested = time;
        }
        if (farm < 1)
        {
            message.channel.send(`You don't have any farms`);
            return;
        }
        if (planted_farm < 0.01)
        {
            message.channel.send(`None of your farms are planted`);
            return;
        }
        var harvest_time = Math.min(time - last_harvested, 10000);
        var corn_harvested = Number((harvest_time * planted_farm * 0.01).toFixed(0));
        var seeds_gained = Math.floor(corn_harvested * 1.2);
        var new_planted_farm = planted_farm - corn_harvested * 0.01;
        var new_last_harvested = 0;
        if (corn_harvested === 0)
        {
            new_last_harvested = last_harvested;
        }
        else
        {
            new_last_harvested = time;
        }
        if (new_planted_farm < 0.01)
        {
            new_planted_farm = 0;
        }
        message.channel.send(`You just harvested \`${funcs.ConvertToUnit(corn_harvested, `K M B`)}\` corn and \`${funcs.ConvertToUnit(seeds_gained, `K M B`)}\` seeds\nYou now have \`${funcs.ConvertToUnit(corn + corn_harvested, `K M B`)}\` corn and \`${funcs.ConvertToUnit(seeds_gained + seed, `K M B`)}\` seeds\nBut now \`${funcs.ConvertToUnit(new_planted_farm, `K M B`)} of ${funcs.ConvertToUnit(farm, `K M B`)} farms\` are planted`);
        db.run(`UPDATE data SET last_harvested = ?,seed = ?, corn = ?, planted_farm = ? WHERE id = ?`, [new_last_harvested, seed + seeds_gained, corn + corn_harvested, new_planted_farm, id]);
    }
}