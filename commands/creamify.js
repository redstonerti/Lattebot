const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'creamify',
    description: "Turns clean milk into cream",
    execute(vars)
    {
        var message = vars['message'];
        var centrifuge = vars['centrifuge'];
        var watts = vars['watts'];
        var clean_milk = vars['clean milk'];
        var cream = vars['cream'];
        var db = vars['db'];
        var id = vars['id'];
        var battery = vars['battery'];
        var watts_per_machine = 1000;
        var batch_size = 100;
        var output_multipliter = 1;
        var AmountPasteurized = 0;
        watts = funcs.CalcPower();
        if (clean_milk <= 0)
        {
            message.channel.send(`You don't have any clean milk`);
            return;
        }
        if (centrifuge <= 0)
        {
            message.channel.send(`You don't have any centrifuges`);
            return;
        }
        if (watts < watts_per_machine)
        {
            message.channel.send(`You don't have enough watts to run any centrifuges. You have \`${watts}\` watts and you need \`${watts_per_machine}W\` to run a centrifuge`);
            return;
        }
        AmountPasteurized = Math.min(Math.floor(watts / watts_per_machine), centrifuge, clean_milk / batch_size);
        message.channel.send(`You used \`${funcs.ConvertToUnit(AmountPasteurized)}\` centrifuges (\`${funcs.ConvertToUnit(AmountPasteurized * watts_per_machine)}W\`) and made \`${funcs.ConvertToUnit(AmountPasteurized * batch_size * output_multipliter)}\` cream.\nYou now have:\n\`${funcs.ConvertToUnit(clean_milk - AmountPasteurized * batch_size)}\` clean milk\n\`${funcs.ConvertToUnit(cream + AmountPasteurized * batch_size * output_multipliter)}\` cream\n\`${funcs.ConvertToUnit(watts - AmountPasteurized * watts_per_machine, 'K M G')}W / ${funcs.ConvertToUnit(battery * 10000, 'K M G')}W\``);
        db.run(`UPDATE data SET clean_milk = ?, cream = ?, watts = ? WHERE id = ?`, [(clean_milk - AmountPasteurized * batch_size).toFixed(2), Number((cream + AmountPasteurized * batch_size * output_multipliter)).toFixed(2), (watts - AmountPasteurized * watts_per_machine).toFixed(2), id]);
    }
}