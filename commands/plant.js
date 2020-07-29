const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'plant',
    description: "Plant corn",
    execute(vars)
    {
        var message = vars['message'];
        var args = vars['args'];
        var corn = vars['corn'];
        var seed = vars['seed'];
        var corn_storage = vars['corn storage'];
        var seed_storage = vars['seed storage'];
        var last_harvested = vars['last harvested'];
        var farm = vars['farm'];
        var planted_farm = vars['planted farm'];
        var db = vars['db'];
        var time = vars['time'];
        var id = vars['id'];
        var seeds_planted = (Math.min(seed / 100, farm - planted_farm) * 100).toFixed(0);
        var new_planted_farm = Math.min(seeds_planted / 100 + planted_farm, farm);
        var harvest_time = time - last_harvested;
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
        if (planted_farm >= farm)
        {
            message.channel.send(`All your farms are already planted`);
            return;
        }
        var new_seeds = Math.max(seed - seeds_planted, 0);
        var corn_harvested = Math.floor((Math.min(harvest_time, 10000)) * planted_farm / 100);
        var seeds_gained = Math.floor(corn_harvested * 1.2);
        message.channel.send(`You just planted \`${funcs.ConvertToUnit(seeds_planted, `K M B`)}\` seeds\nYou now have \`${funcs.ConvertToUnit(new_seeds, `K M B`)}\` seeds\nBut now \`${funcs.ConvertToUnit(new_planted_farm, `K M B`)} of ${funcs.ConvertToUnit(farm, `K M B`)} farms\` are planted`);
        db.run(`UPDATE data SET last_harvested = ?, seed = ?, planted_farm = ?, corn_storage = ?, seed_storage = ? WHERE id = ?`, [time, new_seeds, new_planted_farm, corn_storage + corn_harvested, seed_storage + seeds_gained, id]);
    }
}