const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'dump',
    description: "Destroys waste barrels",
    execute(vars)
    {
        if (vars['is dm']) 
        {
            vars['message'].channel.send(`❌ This command cannot be used in dms as it relies on being in a guild to function ❌`);
            return;
        }
        var message = vars['message'];
        var waste_barrel = vars['waste barrel'];
        var db = vars['db'];
        var time = vars['time'];
        var id = vars['id'];
        if (waste_barrel <= 0)
        {
            message.channel.send(`You don't have any waste barrels`);
            return;
        }
        message.channel.send(`You just dumped \`${funcs.ConvertToUnit(waste_barrel)}\` waste barrels into the sea polluting the oceans. Do you feel good about yourself? You better hope no one reports you, you scum.`);
        db.run(`UPDATE data SET waste_barrel = ?, last_dumped = ? WHERE id = ?`, [0, time, id]);
    }
}