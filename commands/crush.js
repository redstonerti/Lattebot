const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'crush',
    description: "Turns sugarcane into sugar",
    execute(vars)
    {
        var message = vars['message'];
        var mill = vars['mill'];
        var watts = vars['watts'];
        var sugarcane = vars['sugarcane'];
        var sugar = vars['sugar'];
        var db = vars['db'];
        var id = vars['id'];
        var battery = vars['battery'];
        var watts_per_machine = 1000;
        var batch_size = 100;
        var output_multipliter = 4;
        var AmountPasteurized = 0;
        watts = funcs.CalcPower();
        if (sugarcane <= 0)
        {
            message.channel.send(`You don't have any sugarcane`);
            return;
        }
        if (mill <= 0)
        {
            message.channel.send(`You don't have any mills`);
            return;
        }
        if (watts < watts_per_machine)
        {
            message.channel.send(`You don't have enough watts to run any mills. You have \`${watts}\` watts and you need \`${watts_per_machine}W\` to run a mill`);
            return;
        }
        AmountPasteurized = Math.min(Math.floor(watts / watts_per_machine), mill, sugarcane / batch_size);
        message.channel.send(`You used \`${funcs.ConvertToUnit(AmountPasteurized)}\` mills (\`${funcs.ConvertToUnit(AmountPasteurized * watts_per_machine)}W\`) and made \`${funcs.ConvertToUnit(AmountPasteurized * batch_size * output_multipliter)}\` sugar.\nYou now have:\n\`${funcs.ConvertToUnit(sugarcane - AmountPasteurized * batch_size)}\` sugarcane\n\`${funcs.ConvertToUnit(sugar + AmountPasteurized * batch_size * output_multipliter)}\` sugar\n\`${funcs.ConvertToUnit(watts - AmountPasteurized * watts_per_machine, 'K M G')}W / ${funcs.ConvertToUnit(battery * 10000, 'K M G')}W\``);
        db.run(`UPDATE data SET sugarcane = ?, sugar = ?, watts = ? WHERE id = ?`, [(sugarcane - AmountPasteurized * batch_size).toFixed(2), Number((sugar + AmountPasteurized * batch_size * output_multipliter)).toFixed(2), (watts - AmountPasteurized * watts_per_machine).toFixed(2), id]);
    }
}