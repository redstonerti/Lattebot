const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'balance',
    description: "Tells you what you have",
    execute(vars)
    {
        var message = vars['message'];
        var balance = vars['balance'];
        var milk = vars['milk'];
        var cow = vars['cow'];
        var land = vars['land'];
        var work_times = vars['work times'];
        var pasteurizer = vars['pasteurizer'];
        var battery = vars['battery'];
        var animal_feed = vars['animal feed'];
        var watts = vars['watts'];
        var solar_panel = vars['solar panel'];
        var wind_turbine = vars['wind turbine'];
        var clean_milk = vars['clean milk'];
        var time = vars['time'];
        var last_powered = vars['last powered'];
        var id = vars['id'];
        var db = vars['db'];
        var seed = vars['seed'];
        var planted_farm = vars['planted farm'];
        var farm = vars['farm'];
        var grinder = vars['grinder'];
        var last_milked = vars['last milked'];
        var last_harvested = vars['last harvested'];
        var corn = vars['corn'];
        var player_tier = vars['player tier'];
        watts = funcs.CalcPower(battery, solar_panel, wind_turbine, watts, time, last_powered, id, db);
        var WattsPerSec = solar_panel * 0.1 + wind_turbine * 0.03;
        var WorkRank = Math.min(Math.floor(work_times / 5), 18);
        var clean_milk_info = ``;
        var pasteurizer_info = ``;
        var battery_info = ``;
        var solar_panel_info = ``;
        var wind_turbine_info = ``;
        var watt_info = ``;
        var animal_feed_info = ``;
        var corn_info = ``;
        var seed_info = ``;
        var grinder_info = ``;
        var farm_info = ``;
        var watts_per_sec_info = ``;
        var next_corn_harvest_info = ``;
        var next_milk_harvest_info = ``;
        if (player_tier >= 1)
        {
            clean_milk_info = `\n🍼 Clean milk: ${funcs.ConvertToUnit(clean_milk, 'K M B')}`;
            pasteurizer_info = `\n⚙️ Pasteurizer: ${funcs.ConvertToUnit(pasteurizer, 'K M B')}`;
            battery_info = `\n🔋 Battery: ${funcs.ConvertToUnit(battery, 'K M B')}`;
            solar_panel_info = `\n⛅ Solar panel: ${funcs.ConvertToUnit(solar_panel, 'K M B')}`;
            wind_turbine_info = `\n💨 Wind turbine: ${funcs.ConvertToUnit(wind_turbine, 'K M B')}`;
            watt_info = `\n⚡ Watts: ${funcs.ConvertToUnit(watts, 'K M G T P')}W / ${funcs.ConvertToUnit(battery * 10000, 'K M G T P')}W`;
            watts_per_sec_info = `\nWatts/sec: \`${funcs.ConvertToUnit(WattsPerSec, 'KW MW TW')}\``;
        }
        if (player_tier >= 2)
        {
            animal_feed_info = `\n🌾 Animal feed: ${funcs.ConvertToUnit(animal_feed, 'K M B')}`;
            corn_info = `\n🌽 Corn: ${funcs.ConvertToUnit(corn, 'K M B')}`;
            seed_info = `\n🌿 Seed: ${funcs.ConvertToUnit(seed, 'K M B')}`;
            grinder_info = `\n🗜️ Grinder: ${funcs.ConvertToUnit(grinder, 'K M B')}`;
            farm_info = `\n🚜 Farm: ${funcs.ConvertToUnit(farm, 'K M B')} (${funcs.ConvertToUnit(planted_farm, `K M B`)} planted)`;
            next_corn_harvest_info = `Next full corn harvest: \`${funcs.ConvertToUnit(Math.max(last_harvested + 10000 - time, 0), `K M B`)}\` seconds`;
            next_milk_harvest_info = `Next full milk harvest: \`${funcs.ConvertToUnit(Math.max(last_milked + 10000 - time, 0), `K M B`)}\` seconds`;
        }
        funcs.Say(message, `${message.author.username}'s Profile`, `
💰 Balance: ${funcs.ConvertToUnit(balance, 'K M B')} milkesh
🏅 Work rank: ${funcs.ConvertToUnit(WorkRank, 'K M B')}/18
#️⃣ Times worked: ${funcs.ConvertToUnit(work_times, 'K M B')}
🧮 Tier: ${funcs.ConvertToUnit(player_tier, `K M B`)}
🥛 Milk: ${funcs.ConvertToUnit(milk, 'K M B')}
🐄 Cows: ${funcs.ConvertToUnit(cow, 'K M B')}/${funcs.ConvertToUnit(land * 5, 'K M B')}
⛳ Land: ${funcs.ConvertToUnit(land, 'K M B')}/200${clean_milk_info}${pasteurizer_info}${battery_info}${solar_panel_info}${wind_turbine_info}${animal_feed_info}${corn_info}${seed_info}${grinder_info}${farm_info}${watt_info}
-------------------------------------------------------${watts_per_sec_info}
Milk/sec: \`${funcs.ConvertToUnit(cow / 100, 'K M B')}\`
${next_corn_harvest_info}
${next_milk_harvest_info}
`);
        //Recommended: \`${funcs.ConvertToUnit(cow / 10, 'K M G')}W\`/sec + \`${funcs.ConvertToUnit(cow * 1000, 'K M G')}W\` capacity
    }
}