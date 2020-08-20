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
        var planted_farm = vars['planted farm'];
        var db = vars['db'];
        var id = vars['id'];
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
        var seeds_planted = (Math.min(seed / 100, farm - planted_farm) * 100).toFixed(0);
        var new_planted_farm = Math.min(seeds_planted / 100 + planted_farm, farm);
        var new_seeds = Math.max(seed - seeds_planted, 0);
        message.channel.send(`You just planted \`${funcs.ConvertToUnit(seeds_planted, `K M B`)}\` seeds\nYou now have \`${funcs.ConvertToUnit(new_seeds, `K M B`)}\` seeds\nBut now \`${funcs.ConvertToUnit(new_planted_farm, `K M B`)} of ${funcs.ConvertToUnit(farm, `K M B`)} farms\` are planted`);
        db.run(`UPDATE data SET seed = ?, planted_farm = ? WHERE id = ?`, [new_seeds, new_planted_farm, id]);
    }
}