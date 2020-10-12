const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'mix',
    description: "Turns cream into ice_cream",
    execute(vars)
    {
        var message = vars['message'];
        var Items = vars['Items'];
        var mixer = vars['mixer'];
        var watts = vars['watts'];
        var cream = vars['cream'];
        var sugar = vars['sugar'];
        var waste_barrel = vars['waste barrel'];
        var ice_cream = vars['ice cream'];
        var db = vars['db'];
        var id = vars['id'];
        var battery = vars['battery'];
        var freezer = vars['freezer'];
        var watts_per_machine = 1250;
        var batch_size_1 = 100;
        var batch_size_2 = 400;
        var output_multipliter = 4;
        var waste_multipliter = 50;
        var AmountPasteurized = 0;
        var max_production = Items['ice cream']['cap'] - ice_cream;
        max_production = max_production / batch_size_1 / output_multipliter;
        var waste_upgrade_info = ``;
        if (funcs.GetUpgrade(2) === 1)
        {
            waste_multipliter = waste_multipliter / 4;
            waste_upgrade_info = ' `-75%`';
        }
        watts = funcs.CalcPower();
        if (freezer < 1)
        {
            message.channel.send(`You don't have any freezers. Buy them in order to store ice cream. Each freezer stores \`1500\` ice cream`);
            return;
        }
        if (cream <= 0)
        {
            message.channel.send(`You don't have any cream`);
            return;
        }
        if (sugar <= 0)
        {
            message.channel.send(`You don't have any sugar`);
            return;
        }
        if (mixer <= 0)
        {
            message.channel.send(`You don't have any mixers`);
            return;
        }
        if (max_production <= 0)
        {
            message.channel.send(`You don't have any space`);
            return;
        }
        if (watts < watts_per_machine)
        {
            message.channel.send(`You don't have enough watts to run any mixers. You have \`${watts}\` watts and you need \`${watts_per_machine}W\` to run a mixer`);
            return;
        }
        AmountPasteurized = Math.min(max_production, Math.floor(watts / watts_per_machine), mixer, cream / batch_size_1, sugar / batch_size_2);
        message.channel.send(`You used \`${funcs.ConvertToUnit(AmountPasteurized)}\` mixers (\`${funcs.ConvertToUnit(AmountPasteurized * watts_per_machine)}W\`) and made \`${funcs.ConvertToUnit(AmountPasteurized * batch_size_1 * output_multipliter)}\` ice cream.\nYou now have:\n\`${funcs.ConvertToUnit(cream - AmountPasteurized * batch_size_1)}\` cream \`-${funcs.ConvertToUnit(AmountPasteurized * batch_size_1)}\`\n\`${funcs.ConvertToUnit(sugar - AmountPasteurized * batch_size_2)}\` sugar \`-${funcs.ConvertToUnit(AmountPasteurized * batch_size_2)}\`\n\`${funcs.ConvertToUnit(ice_cream + AmountPasteurized * batch_size_1 * output_multipliter)}\` ice cream \`+${funcs.ConvertToUnit(AmountPasteurized * batch_size_1 * output_multipliter)}\`\n\`${funcs.ConvertToUnit(waste_barrel + AmountPasteurized * waste_multipliter)}\` waste barrels \`+${funcs.ConvertToUnit(AmountPasteurized * waste_multipliter)}\`${waste_upgrade_info}\n\`${funcs.ConvertToUnit(watts - AmountPasteurized * watts_per_machine, 'K M G')}W / ${funcs.ConvertToUnit(battery * 10000, 'K M G')}W\``);
        db.run(`UPDATE data SET cream = ?, sugar = ?, ice_cream = ?,waste_barrel = ?, watts = ? WHERE id = ?`, [(cream - AmountPasteurized * batch_size_1).toFixed(2), (sugar - AmountPasteurized * batch_size_2).toFixed(2), Number((ice_cream + AmountPasteurized * batch_size_1 * output_multipliter)).toFixed(2), (waste_barrel + AmountPasteurized * waste_multipliter).toFixed(2), (watts - AmountPasteurized * watts_per_machine).toFixed(2), id]);
    }
}