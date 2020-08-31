const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'balance',
    description: "Tells you what you have",
    async execute(vars)
    {
        /*var balance = vars['balance'];
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
        watts = funcs.CalcPower();
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
            clean_milk_info = `\n🍼 Clean milk: ${funcs.ConvertToUnit(clean_milk, 'K M B T Q')}`;
            pasteurizer_info = `\n⚙️ Pasteurizer: ${funcs.ConvertToUnit(pasteurizer, 'K M B T Q')}`;
            battery_info = `\n🔋 Battery: ${funcs.ConvertToUnit(battery, 'K M B T Q')}`;
            solar_panel_info = `\n⛅ Solar panel: ${funcs.ConvertToUnit(solar_panel, 'K M B T Q')}`;
            wind_turbine_info = `\n💨 Wind turbine: ${funcs.ConvertToUnit(wind_turbine, 'K M B T Q')}`;
            watt_info = `\n⚡ Watts: ${funcs.ConvertToUnit(watts, 'K M G T P')}W / ${funcs.ConvertToUnit(battery * 10000, 'K M G T P')}W`;
            watts_per_sec_info = `\nWatts/sec: \`${funcs.ConvertToUnit(WattsPerSec, 'KW MW TW')}\``;
        }
        if (player_tier >= 2)
        {
            animal_feed_info = `\n🌾 Animal feed: ${funcs.ConvertToUnit(animal_feed, 'K M B T Q')}`;
            corn_info = `\n🌽 Corn: ${funcs.ConvertToUnit(corn, 'K M B T Q')}`;
            seed_info = `\n🌿 Seed: ${funcs.ConvertToUnit(seed, 'K M B T Q')}`;
            grinder_info = `\n🗜️ Grinder: ${funcs.ConvertToUnit(grinder, 'K M B T Q')}`;
            farm_info = `\n🚜 Farm: ${funcs.ConvertToUnit(farm, 'K M B T Q')} (${funcs.ConvertToUnit(planted_farm, `K M B T Q`)} planted)`;
            next_corn_harvest_info = `Next full corn harvest: \`${funcs.SecToHMS(Math.max(last_harvested + 10000 - time, 0))}\``;
            next_milk_harvest_info = `Next full milk harvest: \`${funcs.SecToHMS(Math.max(last_milked + 10000 - time, 0))}\``;
        }
        funcs.Say(message, ``, `
💰 Balance: ${funcs.ConvertToUnit(balance, 'K M B T Q')} milkesh
🏅 Work rank: ${funcs.ConvertToUnit(WorkRank, 'K M B T Q')} / 18
#️⃣ Times worked: ${funcs.ConvertToUnit(work_times, 'K M B T Q')}
🧮 Tier: ${funcs.ConvertToUnit(player_tier, `K M B T Q`)}
🥛 Milk: ${funcs.ConvertToUnit(milk, 'K M B T Q')}
🐄 Cows: ${funcs.ConvertToUnit(cow, 'K M B T Q')}/${funcs.ConvertToUnit(land * 5, 'K M B T Q')}
⛳ Land: ${funcs.ConvertToUnit(land, 'K M B T Q')} / 200${clean_milk_info}${pasteurizer_info}${battery_info}${solar_panel_info}${wind_turbine_info}${animal_feed_info}${corn_info}${seed_info}${grinder_info}${farm_info}${watt_info}
-------------------------------------------------------${watts_per_sec_info}
Milk/sec: \`${funcs.ConvertToUnit(cow / 100, 'K M B T Q')}\`
${next_corn_harvest_info}
${next_milk_harvest_info}
`, undefined, true);
        //Recommended: \`${funcs.ConvertToUnit(cow / 10, 'K M G')}W\`/sec + \`${funcs.ConvertToUnit(cow * 1000, 'K M G')}W\` capacity
    */
        var menu = `_ _`;
        var message = vars['message'];
        var balance_settings = vars['balance settings'];
        var player_tier = vars['player tier'];
        var db = vars['db'];
        var args = vars['args'];
        var id = vars['id'];
        var solar_panel = vars['solar panel'];
        var wind_turbine = vars['wind turbine'];
        var max_tier = vars['max tier'];
        var watts_per_sec_info = ``;
        var next_corn_harvest_info = ``;
        var watt_info = ``;
        var next_milk_harvest_info = ``;
        var WattsPerSec = solar_panel * 0.1 + wind_turbine * 0.03;
        var time = vars['time'];
        var last_harvested = vars['last harvested'];
        var battery = vars['battery'];
        var watts = funcs.CalcPower();
        var last_milked = vars['last milked'];
        var cow = vars['cow'];
        if (player_tier >= 1)
        {
            watts_per_sec_info = `\n                 ⚡ Watts/sec: \`${funcs.ConvertToUnit(WattsPerSec, 'KW MW TW')}\``;
            watt_info = `\n                 ⚡ Watts: ${funcs.ConvertToUnit(watts, 'K M G T P')} W / ${funcs.ConvertToUnit(battery * 10000, 'K M G T P')} W`;
        }
        if (player_tier >= 2)
        {
            next_corn_harvest_info = `\n                 🌽 Next full corn harvest: \`${funcs.SecToHMS(Math.max(last_harvested + 10000 - time, 0))}\``;
            next_milk_harvest_info = `\n                 🥛 Next full milk harvest: \`${funcs.SecToHMS(Math.max(last_milked + 10000 - time, 0))}\``;
        }
        var Places = await GetLeaderboard(vars);
        /*spacing:     */
        var other_displays =
        {
            'stats': `
                 💰 Balance: ${funcs.ConvertToUnit(vars['balance'], 'K M B T Q')} milkesh
                 🧮 Tier: ${funcs.ConvertToUnit(vars['player tier'], `K M B T Q`)}${watt_info}
                 🏅 Work rank: ${funcs.ConvertToUnit(Math.min(Math.floor(vars['work times'] / 5), 18), 'K M B T Q')} / 18
                 #️⃣ Times worked: ${funcs.ConvertToUnit(vars['work times'], 'K M B T Q')}
                    `,
            'info': `
                 🥛 Milk / sec: \`${funcs.ConvertToUnit(cow / 100, 'K M B T Q')}\`${watts_per_sec_info}${next_corn_harvest_info}${next_milk_harvest_info}
            `,
            'leaderboard': `
                 💰 Milkesh: \`${Places[0]}\` / \`${Places[1]}\`
                 #️⃣ Times worked: \`${Places[2]}\` / \`${Places[3]}\`
            `,
        };
        BalanceSettings = InterpretBalanceSettings(vars, other_displays);
        if (BalanceSettings === null)
        {
            return null;
        }
        var tier_settings = BalanceSettings[0];
        var other_settings = BalanceSettings[1];
        var Items = vars['Items'];
        var ItemNames = vars['ItemNames'];
        for (var count = 0; count <= player_tier; count++)
        {
            var arrow = ``;
            if (tier_settings[count] === '1')
            {
                arrow = `:arrow_down_small:`;
            }
            else
            {
                arrow = `:arrow_forward:`;
            }
            menu += `${arrow} Tier \`${count}\`\n`;
            if (tier_settings[count] === '0')
            {
                continue;
            }
            for (var scount = 0; scount < ItemNames.length; scount++)
            {
                var name = ItemNames[scount];
                var item = Items[name];
                var cap_info = ``;
                if (item['cap'] != null)
                {
                    cap_info = ` / ${funcs.ConvertToUnit(item['cap'])}`;
                }
                if (item['tier'] === count)
                {
                    menu += `     ${item['emoji']} ${funcs.CapitalFirst(name)}: ${funcs.ConvertToUnit(vars[name], `K M B`)}${cap_info}\n`;
                }
            }
        }
        var OtherDisplaysNames = funcs.GetPropertyNames(other_displays);
        for (var count = 0; count < Object.keys(other_displays).length; count++)
        {
            var arrow = ``;
            var name = OtherDisplaysNames[count];
            if (other_settings[count] === '1')
            {
                arrow = `:arrow_down_small:`;
            }
            else
            {
                arrow = `:arrow_forward:`;
            }
            menu += `${arrow} ${funcs.CapitalFirst(name)}`;
            if (other_settings[count] === '0')
            {
                menu += `\n`;
                continue;
            }
            else
            {
                menu += other_displays[name];
            }
        }
        funcs.Say(message, ``, menu, undefined, true);
    }
}
function InterpretBalanceSettings(vars, other_displays)
{
    var balance_settings = vars['balance settings'];
    var player_tier = vars['player tier'];
    var db = vars['db'];
    var id = vars['id'];
    var message = vars['message'];
    var args = vars['args'];
    var max_tier = vars['max tier'];
    var updated_settings = balance_settings;
    balance_settings = balance_settings.split('|');
    var tier_settings = balance_settings[0];
    var other_settings = balance_settings[1];
    var separator_position = -1;
    var tier_length = tier_settings.length;
    var other_length = other_settings.length;
    for (var count = 0; count < updated_settings.length; count++)
    {
        if (updated_settings[count] === '|')
        {
            separator_position = count;
        }
    }
    if (player_tier >= tier_settings.length)
    {
        var tier_addition = ``;
        for (var count = 0; count <= player_tier - tier_length; count++)
        {
            tier_settings += `1`;
            tier_addition += `1`;
        }
        updated_settings = funcs.InsertString(updated_settings, tier_addition, separator_position);
    }
    for (var count = 0; count < Object.keys(other_displays).length - other_settings.length; count++)
    {
        updated_settings += `1`;
    }
    if (args.length < 3)
    {
        db.run(`UPDATE data SET balance_settings = ? WHERE id = ?`, [updated_settings, id]);
        return [tier_settings, other_settings];
    }
    var Results = funcs.AutoFill(message, args[1], ['open', 'close']);
    if (Results === null)
    {
        return null;
    }
    var set_to;
    var open_or_close = Results[0].toString();
    if (open_or_close === 'open')
    {
        set_to = '1';
    }
    else if (open_or_close === 'close')
    {
        set_to = '0';
    }
    var tier = Number(args[2]);
    var OtherNames = funcs.GetPropertyNames(other_displays);
    OtherNames.push('all');
    var NewResults = null;
    if (isNaN(tier))
    {
        NewResults = funcs.AutoFill(message, args[2], OtherNames);
        if (NewResults === null)
        {
            return null;
        }
        else
        {
            var word = NewResults[0].toString();
        }
    }
    if (isNaN(tier) === false)
    {
        if (tier < 0)
        {
            message.channel.send(`I don't like negative numbers`);
            return null;
        }
        else if (tier > player_tier && tier <= max_tier)
        {
            message.channel.send(`You haven't even reached that tier yet`);
            return null;
        }
        else if (tier > max_tier && tier < 10)
        {
            message.channel.send(`That tier isn't even out yet`);
            return null;
        }
        else if (tier >= 10)
        {
            message.channel.send(`There will most likely never be a tier that big`);
            return null;
        }
        updated_settings = funcs.StringReplace(updated_settings, tier, set_to);
    }
    else if (word === 'all')
    {
        for (var count = 0; count < updated_settings.length; count++)
        {
            var current_char = updated_settings[count];
            if (current_char === '1' || current_char === '0')
            {
                updated_settings = funcs.StringReplace(updated_settings, count, set_to);
            }
        }
    }
    else
    {
        var starting_position = -1;
        for (var count = 0; count < updated_settings.length; count++)
        {
            if (updated_settings[count] === '|')
            {
                starting_position = count + 1;
                break;
            }
        }
        for (var count = 0; count < OtherNames.length; count++)
        {
            if (OtherNames[count] === word)
            {
                updated_settings = funcs.StringReplace(updated_settings, starting_position + count, set_to);
            }
        }
    }
    db.run(`UPDATE data SET balance_settings = ? WHERE id = ?`, [updated_settings, id]);
    updated_settings = updated_settings.split('|');
    tier_settings = updated_settings[0];
    other_settings = updated_settings[1];
    return [tier_settings, other_settings];
}
async function GetLeaderboard(vars)
{
    var query = `SELECT CAST(id AS TEXT), balance FROM data ORDER BY balance DESC`;
    var db = vars['db'];
    var id = vars['id'];
    var promise = new Promise(reslove =>
    {
        db.all(query, [], (err, row) =>
        {
            if (err)
            {
                console.log(err);
                reslove(false);
                return;
            }
            reslove(row);
            return;
        })

    })
    var balances = await promise;
    query = `SELECT CAST(id AS TEXT), work_times FROM data ORDER BY work_times DESC`;
    promise = new Promise(reslove =>
    {
        db.all(query, [], (err, row) =>
        {
            if (err)
            {
                console.log(err);
                reslove(false);
                return;
            }
            reslove(row);
            return;
        })
    })
    var work_times = await promise;
    var balance_place = -1;
    var work_times_place = -1;
    for (var count = 0; count < balances.length; count++)
    {
        if (balances[count]['CAST(id AS TEXT)'] === id)
        {
            balance_place = count + 1;
            break;
        }
    }
    for (var count = 0; count < work_times.length; count++)
    {
        if (work_times[count]['CAST(id AS TEXT)'] === id)
        {
            work_times_place = count + 1;
            break;
        }
    }
    return [balance_place, balances.length, work_times_place, work_times.length];
}