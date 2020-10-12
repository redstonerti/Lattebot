const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'filter',
    description: "Destroys waste barrels",
    execute(vars)
    {
        var message = vars['message'];
        var waste_filter = vars['waste filter'];
        var watts = vars['watts'];
        var waste_barrel = vars['waste barrel'];
        var db = vars['db'];
        var id = vars['id'];
        var battery = vars['battery'];
        var watts_per_machine = 25000;
        var batch_size = 10;
        var AmountPasteurized = 0;
        watts = funcs.CalcPower();
        if (waste_barrel <= 0)
        {
            message.channel.send(`You don't have any waste barrels`);
            return;
        }
        if (waste_filter <= 0)
        {
            message.channel.send(`You don't have any waste filters`);
            return;
        }
        if (watts < watts_per_machine)
        {
            message.channel.send(`You don't have enough watts to run any waste filters. You have \`${watts}\` watts and you need \`${watts_per_machine}W\` to run a waste filter`);
            return;
        }
        AmountPasteurized = Math.min(Math.floor(watts / watts_per_machine), waste_filter, waste_barrel / batch_size);
        message.channel.send(`You used \`${funcs.ConvertToUnit(AmountPasteurized)}\` waste filters (\`${funcs.ConvertToUnit(AmountPasteurized * watts_per_machine)}W\`) and filtered \`${funcs.ConvertToUnit(AmountPasteurized * batch_size)}\` waste barrels.\nYou now have:\n\`${funcs.ConvertToUnit(waste_barrel - AmountPasteurized * batch_size)}\` waste barrels\n\`${funcs.ConvertToUnit(watts - AmountPasteurized * watts_per_machine, 'K M G')}W / ${funcs.ConvertToUnit(battery * 10000, 'K M G')}W\``);
        db.run(`UPDATE data SET waste_barrel = ?, watts = ? WHERE id = ?`, [(waste_barrel - AmountPasteurized * batch_size).toFixed(2), (watts - AmountPasteurized * watts_per_machine).toFixed(2), id]);
    }
}