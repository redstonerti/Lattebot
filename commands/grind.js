const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'grind',
    description: "Turns corn into animal feed",
    execute(vars)
    {
        var message = vars['message'];
        var grinder = vars['grinder'];
        var watts = vars['watts'];
        var corn = vars['corn'];
        var animal_feed = vars['animal feed'];
        var db = vars['db'];
        var id = vars['id'];
        var battery = vars['battery'];
        var solar_panel = vars['solar panel'];
        var wind_turbine = vars['wind turbine'];
        var time = vars['time'];
        var last_powered = vars['last powered'];
        var MessageInfo = ``;
        var AmountPasteurized = 0;
        watts = funcs.CalcPower(battery, solar_panel, wind_turbine, watts, time, last_powered, id, db);
        if (corn <= 0)
        {
            message.channel.send(`You don't have any corn`);
            return;
        }
        if (grinder <= 0)
        {
            message.channel.send(`You don't have any grinders`);
            return;
        }
        if (watts < 1000)
        {
            message.channel.send(`You don't have enough watts to run any grinders. You have \`${watts}\` watts and you need \`1000W\` to run a grinder`);
            return;
        }
        AmountPasteurized = Math.min(Math.floor(watts / 1000), grinder, corn / 100);
        message.channel.send(`You used \`${funcs.ConvertToUnit(AmountPasteurized, 'K M B')}\` grinders (\`${funcs.ConvertToUnit(AmountPasteurized * 1000, 'K M G')}W\`) and made \`${funcs.ConvertToUnit(AmountPasteurized * 100, 'K M B')}\` animal feed.\nYou now have:\n\`${funcs.ConvertToUnit(corn - AmountPasteurized * 100, 'K M B')}\` corn\n\`${funcs.ConvertToUnit(animal_feed + AmountPasteurized * 100, 'K M B')}\` animal feed\n\`${funcs.ConvertToUnit(watts - AmountPasteurized * 1000, 'K M G')}W / ${funcs.ConvertToUnit(battery * 10000, 'K M G')}W\``);
        db.run(`UPDATE data SET corn = ? WHERE id = ?`, [(corn - AmountPasteurized * 100).toFixed(2), id]);
        db.run(`UPDATE data SET animal_feed = ? WHERE id = ?`, [Number((animal_feed + AmountPasteurized * 100)).toFixed(2), id]);
        db.run(`UPDATE data SET watts = ? WHERE id = ?`, [(watts - AmountPasteurized * 1000).toFixed(2), id]);
    }
}