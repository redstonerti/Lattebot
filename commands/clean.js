const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'clean',
    description: "Turns milk into clean milk",
    execute(vars)
    {
        var message = vars['message'];
        var pasteurizer = vars['pasteurizer'];
        var watts = vars['watts'];
        var milk = vars['milk'];
        var clean_milk = vars['clean milk'];
        var db = vars['db'];
        var id = vars['id'];
        var battery = vars['battery'];
        var solar_panel = vars['solar panel'];
        var wind_turbine = vars['wind turbine'];
        var time = vars['time'];
        var last_powered = vars['last powered'];
        var MessageInfo = ``;
        var AmountPasteurized = 0;
        watts = funcs.CalcPower();
        if (milk <= 0)
        {
            message.channel.send(`You don't have any milk`);
            return;
        }
        if (pasteurizer <= 0)
        {
            message.channel.send(`You don't have any pasteurizers`);
            return;
        }
        if (watts < 1000)
        {
            message.channel.send(`You don't have enough watts to run any pasteurizers. You have \`${watts}\` watts and you need \`1000W\` to run a pasteurizer`);
            return;
        }
        AmountPasteurized = Math.min(Math.floor(watts / 1000), pasteurizer, milk / 100);
        message.channel.send(`You used \`${funcs.ConvertToUnit(AmountPasteurized, 'K M B')}\` pasteurizers (\`${funcs.ConvertToUnit(AmountPasteurized * 1000, 'K M G')}W\`) and made \`${funcs.ConvertToUnit(AmountPasteurized * 100, 'K M B')}\` clean milk.\nYou now have:\n\`${funcs.ConvertToUnit(milk - AmountPasteurized * 100, 'K M B')}\` milk\n\`${funcs.ConvertToUnit(clean_milk + AmountPasteurized * 100, 'K M B')}\` clean milk\n\`${funcs.ConvertToUnit(watts - AmountPasteurized * 1000, 'K M G')}W / ${funcs.ConvertToUnit(battery * 10000, 'K M G')}W\``);
        db.run(`UPDATE data SET milk = ? WHERE id = ?`, [(milk - AmountPasteurized * 100).toFixed(2), id]);
        db.run(`UPDATE data SET clean_milk = ? WHERE id = ?`, [(clean_milk + AmountPasteurized * 100).toFixed(2), id]);
        db.run(`UPDATE data SET watts = ? WHERE id = ?`, [(watts - AmountPasteurized * 1000).toFixed(2), id]);
    }
}