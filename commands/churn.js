const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'churn',
    description: "Turns cream into butter",
    execute(vars)
    {
        var message = vars['message'];
        var churner = vars['churner'];
        var watts = vars['watts'];
        var cream = vars['cream'];
        var butter = vars['butter'];
        var db = vars['db'];
        var id = vars['id'];
        var battery = vars['battery'];
        var watts_per_machine = 1000;
        var waste_barrel = vars['waste barrel'];
        var waste_multipliter = 30;
        var batch_size = 100;
        var output_multipliter = 1;
        var AmountPasteurized = 0;
        var waste_upgrade_info = ``;
        if (funcs.GetUpgrade(2) === 1)
        {
            waste_multipliter = waste_multipliter / 4;
            waste_upgrade_info = ' `-75%`';
        }
        watts = funcs.CalcPower();
        if (cream <= 0)
        {
            message.channel.send(`You don't have any cream`);
            return;
        }
        if (churner <= 0)
        {
            message.channel.send(`You don't have any churners`);
            return;
        }
        if (watts < watts_per_machine)
        {
            message.channel.send(`You don't have enough watts to run any churners. You have \`${watts}\` watts and you need \`${watts_per_machine}W\` to run a churner`);
            return;
        }
        AmountPasteurized = Math.min(Math.floor(watts / watts_per_machine), churner, cream / batch_size);
        message.channel.send(`You used \`${funcs.ConvertToUnit(AmountPasteurized)}\` churners (\`${funcs.ConvertToUnit(AmountPasteurized * watts_per_machine)}W\`) and made \`${funcs.ConvertToUnit(AmountPasteurized * batch_size * output_multipliter)}\` butter.\nYou now have:\n\`${funcs.ConvertToUnit(cream - AmountPasteurized * batch_size)}\` cream \`-${funcs.ConvertToUnit(AmountPasteurized * batch_size)}\`\n\`${funcs.ConvertToUnit(butter + AmountPasteurized * batch_size * output_multipliter)}\` butter \`+${funcs.ConvertToUnit(AmountPasteurized * batch_size * output_multipliter)}\`\n\`${funcs.ConvertToUnit(waste_barrel + AmountPasteurized * waste_multipliter)}\` waste barrels \`+${funcs.ConvertToUnit(AmountPasteurized * waste_multipliter)}\`${waste_upgrade_info}\n\`${funcs.ConvertToUnit(watts - AmountPasteurized * watts_per_machine, 'K M G')}W / ${funcs.ConvertToUnit(battery * 10000, 'K M G')}W\``);
        db.run(`UPDATE data SET cream = ?, butter = ?, waste_barrel = ?, watts = ? WHERE id = ?`, [(cream - AmountPasteurized * batch_size).toFixed(2), Number((butter + AmountPasteurized * batch_size * output_multipliter)).toFixed(2), (waste_barrel + AmountPasteurized * waste_multipliter).toFixed(2), (watts - AmountPasteurized * watts_per_machine).toFixed(2), id]);
    }
}