const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
const clean = require('./clean.js');
module.exports = {
    name: 'bal',
    description: "Tells you how much money you have",
    execute(vars)
    {
        var message = vars['message'];
        var bal = vars['bal'];
        var milk = vars['milk'];
        var cow = vars['cow'];
        var land = vars['land'];
        var work_times = vars['work_times'];
        var pasteurizer = vars['pasteurizer'];
        var battery = vars['battery'];
        var watts = vars['watts'];
        var solar_panel = vars['solar_panel'];
        var wind_turbine = vars['wind_turbine'];
        var clean_milk = vars['clean_milk'];
        var time = vars['time'];
        var last_powered = vars['last_powered'];
        var id = vars['id'];
        var db = vars['db'];
        watts = funcs.CalcPower(battery, solar_panel, wind_turbine, watts, time, last_powered, id, db);
        var WattsPerSec = solar_panel * 0.1 + wind_turbine * 0.03;
        var WorkRank = Math.min(Math.floor(work_times / 5), 18);
        funcs.Say(message, `${message.author.username}'s Profile`, `
        💰 Balance: ${funcs.ConvertToUnit(bal, 'K M B')} milkesh
        🏅 Work rank: ${funcs.ConvertToUnit(WorkRank, 'K M B')}/18
        #️⃣ Times worked: ${funcs.ConvertToUnit(work_times, 'K M B')}
        🥛 Milk: ${funcs.ConvertToUnit(milk, 'K M B')}
        🍼 Clean milk: ${funcs.ConvertToUnit(clean_milk, 'K M B')}
        🐄 Cows: ${funcs.ConvertToUnit(cow, 'K M B')}/${funcs.ConvertToUnit(land * 5, 'K M B')}
        ⛳ Land: ${funcs.ConvertToUnit(land, 'K M B')}/200
        ⚙️ Pasteurizer: ${funcs.ConvertToUnit(pasteurizer, 'K M B')}
        🔋 Battery: ${funcs.ConvertToUnit(battery, 'K M B')}
        ⛅ Solar panel: ${funcs.ConvertToUnit(solar_panel, 'K M B')}
        💨 Wind turbine: ${funcs.ConvertToUnit(wind_turbine, 'K M B')}
        ⚡ Watts: ${funcs.ConvertToUnit(watts, 'KW MW GW TW PW')} / ${funcs.ConvertToUnit(battery * 10000, 'KW MW GW TW PW')}
        ----------------------------------------------
        Watts/sec: \`${funcs.ConvertToUnit(WattsPerSec, 'KW MW TW')}\`
        Milk/sec: \`${funcs.ConvertToUnit(cow / 100, 'K M B')}\`
        Recommended: \`${funcs.ConvertToUnit(cow / 10, 'K M G')}W\`/sec + \`${funcs.ConvertToUnit(cow * 1000, 'K M G')}W\` capacity
        `);
    }
}