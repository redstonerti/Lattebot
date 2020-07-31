/*Useful shit

GETTING AN OBJECT'S LENGTH NO MATTER HOW DUMB IT WANTS TO BE:
Object.keys(array).length;

Close all:
Ctrl + K + 1

Open all:
Ctrl + K + J

Milanote referral link: https://www.milanote.com/refer/rcBwWuNB5PWEzbiijF
Milanote page: https://app.milanote.com/1JIXFg1A7IWS4Z?p=RPYHur6CMy1
*/
const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'NzIyNDY2NzY1NTEwMTQ4MTc3.Xujfmw.DPxFzTa28pIJXL4uWSTIsMdXku0';
const PREFIX = ';';
const version = '1.2.1';
const fs = require('fs');
const upgrade_list_length = 2;
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const { exit } = require('process');
const sqlite = require('sqlite3').verbose();
for (const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}
bot.on('ready', () =>
{
    console.log('This bot is online!');
    let db = new sqlite.Database('./database.db', sqlite.OPEN_READWRITE);
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: 'Prefix is ;',
        }
    })
    //db.run(`UPDATE data SET seed_storage = ?`, [0]);
});
bot.on('message', message =>
{
    message.content = message.content.toLowerCase();
    if (message.author.username === 'Lattebot' || message.author.username === 'Tester bot') return;
    let time = Math.round(new Date().getTime() / 1000);
    let id = message.author.id;
    let name = message.author.tag;
    let db = new sqlite.Database('./database.db', sqlite.OPEN_READWRITE);
    let query = `SELECT * FROM data WHERE id = ?`;
    db.get(query, [id], (err, row) =>
    {
        if (err)
        {
            console.log(err);
            return;
        }
        if (row === undefined)
        {
            if (message.content.substring(0, 1) === ';')
            {
                console.log(`row was undefined`);
                let InsertData = db.prepare(`INSERT INTO data VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);

                InsertData.run(/*id*/id,/*name*/ name,/*balance*/ 0,/*milk*/ 0,/*cow*/ 0,/*last_milked*/ 0,/*milk_storage*/ 0,/*last_worked*/ 0,/*work_times*/ 0,/*land*/ 40,/*pasteurizerr*/0,/*battery*/0,/*watts*/ 0,/*solar_panel*/ 0,/*wind_turbine*/ 0,/*last_powered*/ 0,/*clean_milk*/ 0,/*animal_feed*/ 0,/*upgrades*/'0 0 0',/*seed*/0,/*corn*/0,/*farm*/0,/*grinder*/0,/*last_harvested*/0,/*corn_storage*/0,/*planted_farm*/0,/*seed_storage*/0);
                InsertData.finalize();
                db.close();
                MainSystem(message, db,/*id*/id, time,/*name*/ name,/*balance*/ 0,/*milk*/ 0,/*cow*/ 0,/*last_milked*/ 0,/*milk_storage*/ 0,/*last_worked*/ 0,/*work_times*/ 0,/*land*/ 40,/*pasteurizerr*/0,/*battery*/0,/*watts*/ 0,/*solar_panel*/ 0,/*wind_turbine*/ 0,/*last_powered*/ 0,/*clean_milk*/ 0,/*animal_feed*/ 0,/*upgrades*/'0 0 0',/*seed*/0,/*corn*/0,/*farm*/0,/*grinder*/0,/*last_harvested*/0,/*corn_storage*/0,/*planted_farm*/0,/*seed_storage*/0);
            }

        }
        else
        {
            MainSystem(message, db, id, time, row.name, row.balance, row.milk, row.cow, row.last_milked, row.milk_storage, row.last_worked, row.work_times, row.land, row.pasteurizer, row.battery, row.watts, row.solar_panel, row.wind_turbine, row.last_powered, row.clean_milk, row.animal_feed, row.upgrades, row.seed, row.corn, row.farm, row.grinder, row.last_harvested, row.corn_storage, row.planted_farm, row.seed_storage);
        }
    });
})
bot.login(token);
function MainSystem(message, db, id, time, name, balance, milk, cow, last_milked, milk_storage, last_worked, work_times, land, pasteurizer, battery, watts, solar_panel, wind_turbine, last_powered, clean_milk, animal_feed, upgrades, seed, corn, farm, grinder, last_harvested, corn_storage, planted_farm, seed_storage)
{
    if (message.content.toLowerCase().substring(0, 5) === 'send ')
    {
        if (exports.HasAt(message) === false)
        {
            message.channel.send(message.content.substring(5));
        }
    }
    else if (message.content.toLowerCase().substring(0, 6) === 'putin ')
    {
        if (exports.HasAt(message) === false)
        {
            message.channel.send(`put out ${message.content.toLowerCase().substring(6)}`);
        }
    }
    else if (message.content === 'noice')
    {
        if (exports.HasAt(message) === false)
        {
            const attachment = new MessageAttachment('./noice.png');
            message.channel.send(attachment);
        }
    }
    else if (message.content === 'bruh')
    {
        if (exports.HasAt(message) === false)
        {
            const attachment = new MessageAttachment('./bruh.png');
            message.channel.send(attachment);
        }
    }
    const ItemNames =
        [
            `milk`,
            `clean milk`,
            `cow`,
            `land`,
            `pasteurizer`,
            `battery`,
            `solar panel`,
            `wind turbine`,
            `animal feed`,
            `corn`,
            `seed`,
            `grinder`,
            `farm`

        ];
    const Items =
    {
        'milk': {
            'buy price': null,
            'sell price': 0.80,
            'tier': 0,
            'emoji': '🥛',
            'unique attribute': ''
        },
        'clean milk': {
            'buy price': 2.52,
            'sell price': 2.4,
            'tier': 1,
            'emoji': '🍼',
            'unique attribute': ''
        },
        'cow': {
            'buy price': 130,
            'sell price': 123,
            'tier': 0,
            'emoji': '🐄',
            'unique attribute': ''
        },
        'land': {
            'buy price': 500,
            'sell price': 476,
            'tier': 0,
            'emoji': '⛳',
            'unique attribute': ''
        },
        'pasteurizer': {
            'buy price': 220,
            'sell price': 209,
            'tier': 1,
            'emoji': '⚙️',
            'unique attribute': ''
        },
        'battery': {
            'buy price': 2000,
            'sell price': 1904,
            'tier': 1,
            'emoji': '🔋',
            'unique attribute': '10KW capacity'
        },
        'solar panel': {
            'buy price': 150,
            'sell price': 142,
            'tier': 1,
            'emoji': '⛅',
            'unique attribute': '0.1W / sec'
        },
        'wind turbine': {
            'buy price': 50,
            'sell price': 47,
            'tier': 1,
            'emoji': '💨',
            'unique attribute': '0.03W / sec'
        },
        'animal feed': {
            'buy price': 1.2 + exports.GetUpgrade(upgrades, 1, db, id) * 1.8,
            'sell price': null,
            'tier': 2,
            'emoji': '🌾',
            'unique attribute': ''
        },
        'corn': {
            'buy price': 2.4,
            'sell price': null,
            'tier': 2,
            'emoji': '🌽',
            'unique attribute': ''
        },
        'seed': {
            'buy price': 0.3,
            'sell price': null,
            'tier': 2,
            'emoji': '🌿',
            'unique attribute': ''
        },
        'grinder': {
            'buy price': 780,
            'sell price': 742,
            'tier': 2,
            'emoji': '🗜️',
            'unique attribute': ''
        },
        'farm': {
            'buy price': 970,
            'sell price': 923,
            'tier': 2,
            'emoji': '🚜',
            'unique attribute': ''
        },
    };
    const UpgradeNames =
        [
            `tier`,
            `animal feeding`,
        ];
    const Upgrades =
    {
        'tier':
        {
            'prices': [50000, 750000],
            'tier': 0,
            'emoji': '🧮',
            'slot': 0,
            'description': 'Upgrading your tier will unlock more items in the item shop and more upgrades in the upgrades shop. It is essential for progression.'
        },
        'animal feeding':
        {
            'prices': [500000],
            'tier': 2,
            'emoji': '🌾',
            'slot': 1,
            'description': `This upgrade makes animal feed twice as effective. Each animal feed will give you 2 extra milk instead of 1. However it will also increase it's price in the shop by 1.8 milkesh.`
        },

    };
    let args = message.content.toLowerCase().substring(PREFIX.length).split(' ');
    const vars =
    {
        'message': message,
        'args': args,
        'db': db,
        'id': id,
        'time': time,
        'name': name,
        'balance': balance,
        'milk': milk,
        'cow': cow,
        'last milked': last_milked,
        'milk storage': milk_storage,
        'last worked': last_worked,
        'work times': work_times,
        'land': land,
        'ItemNames': ItemNames,
        'Items': Items,
        'version': version,
        'pasteurizer': pasteurizer,
        'battery': battery,
        'watts': watts,
        'last powered': last_powered,
        'solar panel': solar_panel,
        'wind turbine': wind_turbine,
        'clean milk': clean_milk,
        'command length': 0,
        'animal feed': animal_feed,
        'corn': corn,
        'seed': seed,
        'farm': farm,
        'grinder': grinder,
        'last harvested': last_harvested,
        'corn storage': corn_storage,
        'seed storage': seed_storage,
        'planted farm': planted_farm,
        'upgrades': upgrades,
        'player tier': exports.GetUpgrade(upgrades, 0, db, id),
        'Upgrades': Upgrades,
        'UpgradeNames': UpgradeNames
    };
    const CommandList =
        [
            `ping`,
            `help`,
            `clear`,
            `deport`,
            `undeport`,
            `balance`,
            `beg`,
            `give`,
            `hug`,
            `shop`,
            `buy`,
            `sell`,
            `milk`,
            `work`,
            `clean`,
            `upgrade`,
            `grind`,
            `harvest`,
            `plant`,
            `donate`,
            `suggest`,
            `buggify`
        ];
    if (message.content[0] != ';')
        return null;
    var ResultList = exports.AutoFill(message, args[0], CommandList, true);
    if (ResultList === null)
    {
        return null;
    }
    ResultList = ResultList[0];
    if (ResultList.length === 1)
    {
        vars['command length'] = args[0].length;
        bot.commands.get(ResultList.toString()).execute(vars);
    }
}
exports.HasAt = function (message)
{
    for (var count = 0; count < message.content.length; count++)
    {
        if (message.content[count] === '@')
        {
            return true;
        }
    }
    return false;
}
exports.Say = function (message, Title, description)
{
    let embed = new MessageEmbed().setTitle(Title).setColor(0x3498db).setDescription(description);
    message.channel.send(embed);
}
exports.GetId = function (FullId)
{
    var IdPosMin = 1000000000;
    var IdPosMax = -1;
    for (var count = 0; count < FullId.length; count++)
    {
        if (isNaN(Number(FullId[count])) == false)
        {
            if (count < IdPosMin)
            {
                IdPosMin = count;
            }
            if (count > IdPosMax)
            {
                IdPosMax = count;
            }
        }
    }
    IdPosMax += 1;
    return FullId.toString().substring(IdPosMin, IdPosMax);
}
exports.HasTag = function (name)
{
    var TagPosition = -1;
    var tag;
    for (var count = 0; count < name.length; count++)
    {
        let char = name.charAt(count);
        if (char === '#')
        {
            TagPosition = count;
        }
    }
    if (TagPosition >= 0)
    {
        tag = name.substring(TagPosition + 1, TagPosition + 5);
    }
    var NewName = "";
    if (TagPosition >= 0)
    {
        NewName = name.substring(0, TagPosition);
    }
    else
    {
        NewName = name;
    }
    return [tag, NewName];
}
exports.GetItem = function (message, args, ItemNames)
{
    var item = '';
    var NumberPosition = -1;
    var number = -1;
    var IsMax = false;
    for (var count = 0; count < args.length; count++)
    {
        if (exports.ConvertToNumber(message, args[count]) === null)
        {
            return null;
        }
        if (isNaN(exports.ConvertToNumber(message, args[count])) === false)
        {
            NumberPosition = count;
        }
    }
    item = item.substring(1);
    if (NumberPosition < 0)
    {
        item = message.content.substring(args[0].length + 2);
        var MaxOrAllList = exports.AutoFill(message, args[1], [`max`, `all`], false);
        if (MaxOrAllList === null)
        {
            return null;
        }
        MaxOrAllList = MaxOrAllList[0];
        if (MaxOrAllList.length === 1)
        {
            IsMax = true;
            item = item.substring(args[1].length + 1);
        }
        number = 1;
    }
    else
    {
        item = message.content.substring(args[0].length + args[1].length + 3);
        number = exports.ConvertToNumber(message, args[1]);
    }
    var NumberInList = 0;
    var ResultList = exports.AutoFill(message, item, ItemNames, true);
    if (ResultList === null)
    {
        return null;
    }
    NumberInList = ResultList[1];
    ResultList = ResultList[0];
    if (number < 0)
    {
        message.channel.send(`${message.member.user.username} you can't fool me`);
        return null;
    }
    if (number >= 0 && number < 1)
    {
        message.channel.send(`Wtf is the point of that?`);
        return null;
    }
    number = Math.floor(number);
    if (NumberInList === null)
    {
        return null;
    }
    if (NumberInList < 0)
    {
        message.channel.send(`I don't sell ${item}`);
        return null;
    }
    return [ResultList, number, NumberInList, IsMax];
}
exports.GetName = function (args)
{
    var name = '';
    var NumberPosition = -1;
    for (var count = 0; count < args.length; count++)
    {
        if (isNaN(Number(args[count])) === false)
        {
            NumberPosition = count;
        }
    }
    for (var count = 1; count < NumberPosition; count++)
    {
        name = name + ' ' + args[count];
    }
    name = name.substring(1);
    var number = args[NumberPosition];
    var command = 'milkesh';
    if (args.length - 1 != NumberPosition)
    {
        command = args[NumberPosition + 1];
    }
    return [name, number, command];
}
exports.AddRole = function (message, member, RoleName, db, balance, id)
{
    let { cache } = message.guild.roles;
    let role = cache.find(role => role.name.toLowerCase() == RoleName);
    if (role)
    {
        if (member.roles.cache.has(role.id))
        {
            message.channel.send(`${member.user.username} 's already deported`);
            return;
        }
        else
        {
            member.roles.add(role)
                .catch(err =>
                {
                    console.log(err);
                    message.channel.send('Something went wrong when adding this role\nPlease make sure that the deported role is under the Lattebot role');
                });
        }
        const attachment = new MessageAttachment('./deported.png');
        message.channel.send(`${member.user.username} ` + `you have been **DEPORTED!**\nThe Soviet Union thanks ${message.member.user.username} for their cooperation\nYour new balance: ${exports.ConvertToUnit(balance + 10, `K M B`)}`, attachment);
        db.run(`UPDATE data SET balance = ? WHERE id = ?`, [(balance + 10).toFixed(2), id]);
    }
    else
    {
        console.log('i didn\'t find the role');
        message.channel.send(`Hey the role doesn't exist`);
    }


}
exports.RemoveRole = function (message, member, RoleName, db, balance, id)
{
    let { cache } = message.guild.roles;

    let role = cache.find(role => role.name.toLowerCase() == RoleName);
    if (role)
    {
        if (member.roles.cache.has(role.id))
        {
            member.roles.remove(role)
                .catch(err =>
                {
                    console.log(err);
                    message.channel.send('Something went wrong when removing this role\nPlease make sure that the deported role is under the Lattebot role');
                });
        }
        else
        {
            message.channel.send(`${member.user.username} ` + 'is not deported...yet');
            return;
        }
        const attachment = new MessageAttachment('./undeported.png');
        message.channel.send(`${member.user.username} ` + `you have been undeported :)\nThe Soviet Union will punish ${message.member.user.username} for adding more immigrants to the country\nYour new balance: ${exports.ConvertToUnit(balance - 10, `K M B`)}`, attachment);
        db.run(`UPDATE data SET balance = ? WHERE id = ?`, [(balance - 10).toFixed(2), id]);
    }
    else
    {
        console.log('i didn\'t find the role');
        message.channel.send(`Hey the role doesn't exist`);
    }
}
exports.CalcPower = function (battery, solar_panel, wind_turbine, watts, time, last_powered, id, db)
{
    if (last_powered === 0)
    {
        last_powered = time;
    }
    db.run(`UPDATE data SET watts = ? WHERE id = ?`, [Math.min(watts + (wind_turbine * 0.03 + solar_panel * 0.1) * (time - last_powered), battery * 10000).toFixed(2), id]);
    db.run(`UPDATE data SET last_powered = ? WHERE id = ?`, [time, id]);
    return Math.min(watts + (wind_turbine * 0.03 + solar_panel * 0.1) * (time - last_powered), battery * 10000).toFixed(2);
}
exports.ConvertToUnit = function (number, units)
{
    number = Number(number);
    var SeparatedUnits = units.split(' ');
    var Divider = 1000;
    var End = -1;
    for (var count = 0; count < SeparatedUnits.length; count++)
    {
        if (number / Divider >= 1)
        {
            number = (number / 1000).toFixed(3);
            End += 1;
        }
        else
        {
            break;
        }
    }
    if (number === -0)
    {
        number = 0;
    }
    var HasFixed = false;
    number = Number(number);
    for (var count = 3; count > 0; count--)
    {
        var decimal = number.toFixed(count).toString();
        decimal = decimal.substring(decimal.length - 1);
        if (decimal != '0')
        {
            number = number.toFixed(count);
            HasFixed = true;
            break;
        }
    }
    if (HasFixed === false)
    {
        number = number.toFixed(0);
    }
    if (End >= 0)
    {
        return `${number}${SeparatedUnits[End]}`;
    }
    else
    {
        return number;
    }
}
exports.AutoFill = function (message, phrase, PhraseList, ShowList)
{
    var NumberInList = -1;
    var ResultList = [];
    for (var count = 0; count < Object.keys(PhraseList).length; count++)
    {
        if (phrase == null)
        {
            phrase = '';
        }
        StartOfWord = PhraseList[count].substring(0, phrase.length);
        if (StartOfWord === phrase)
        {
            ResultList.push(PhraseList[count]);
            NumberInList = count;
        }
    }
    if (ResultList.length > 1)
    {
        for (var count = 0; count < ResultList.length; count++)
        {
            if (ResultList[count] === phrase)
            {
                ResultList = [phrase];
            }
        }
    }

    if (ResultList.length != 1 && ShowList === true)
    {
        var ListOfThings = ``;
        if (ResultList.length > 1)
        {
            for (var count = 0; count < ResultList.length; count++)
            {
                ListOfThings = ListOfThings + `, \`${ResultList[count]}\``
            }
            ListOfThings = ListOfThings.substring(2);
        }
        else
        {
            for (var count = 0; count < Object.keys(PhraseList).length; count++)
            {
                ListOfThings = ListOfThings + `, \`${PhraseList[count]}\``
            }
            ListOfThings = ListOfThings.substring(2);
        }
        if (phrase === '')
        {
            phrase = ' ';
        }
        message.channel.send(`There are \`${ResultList.length}\` things that start with \`${phrase}\`. Maybe be a bit more specific? Here's the list:
${ListOfThings}
        `)
        return null;
    }
    return [ResultList, NumberInList];
}
exports.StringReplace = function (string, position, character)
{
    if (position != 0)
    {
        return string.substring(0, position) + character + string.substring(position + 1);
    }
    else
    {
        return character + string.substring(1);
    }
}
exports.CapitalFirst = function (string)
{
    return string.charAt(0).toUpperCase() + string.substring(1);
}
exports.GetUpgrade = function (upgrades, upgrade_slot, db, id)
{
    var upgrade_list = upgrades.toString().split(' ');
    if (upgrade_list.length < upgrade_list_length)
    {
        var upgrade_list_addition = '';
        for (var count = 0; count < upgrade_list_length - upgrade_list.length; count++)
        {
            upgrade_list_addition = upgrade_list_addition + ' 0';
        }
        db.run(`UPDATE data set upgrades = ? WHERE id = ?`, [upgrades + upgrade_list_addition, id]);
    }
    return Number(upgrade_list[upgrade_slot]);
}
exports.GetUpgraded = function (upgrades, upgrade_slot, amount)
{

    var upgrade_list = upgrades.toString().split(' ');
    var upgrade_level = Number(upgrade_list[upgrade_slot]);
    upgrade_level += amount;
    var new_upgrade_list = '';
    for (var count = 0; count < upgrade_list.length; count++)
    {
        if (count != upgrade_slot)
        {
            new_upgrade_list = new_upgrade_list + ' ' + upgrade_list[count].toString();
        }
        else
        {
            new_upgrade_list = new_upgrade_list + ' ' + upgrade_level.toString();
        }
    }
    new_upgrade_list = new_upgrade_list.substring(1);
    return new_upgrade_list.toString();
}
exports.SecToHMS = function (sec_amount)
{
    var hour_min_sec = ``;
    var hours = Math.floor(sec_amount / 3600);
    if (hours > 0)
    {
        hour_min_sec = hour_min_sec + hours.toString() + `h `;
    }
    sec_amount = sec_amount - hours * 3600;
    var minutes = Math.floor(sec_amount / 60);
    if (minutes > 0)
    {
        hour_min_sec = hour_min_sec + minutes.toString() + `m `;
    }
    sec_amount = sec_amount - minutes * 60;
    sec_amount = Math.floor(sec_amount);
    hour_min_sec = hour_min_sec + sec_amount.toString() + `s`;
    return hour_min_sec;
}
exports.ConvertToNumber = function (message, number_with_unit)
{
    var number = Number(number_with_unit.substring(0, number_with_unit.length - 1));
    if (number < 0)
    {
        message.channel.send(`I don't like negative numbers. They always bring me down. :(`);
        return null;
    }
    if (isNaN(Number(number_with_unit)) === false)
    {
        return number_with_unit;
    }
    if (isNaN(Number(number_with_unit.substring(0, number_with_unit.length - 1))) == true)
    {
        return NaN;
    }
    var unit = number_with_unit.substring(number_with_unit.length - 1).toUpperCase();
    var Units =
    {
        'K': 1000,
        'M': 1000000,
        'B': 1000000000,
        'T': 1000000000000
    };
    var multiplier = Units[unit];
    if (multiplier === undefined)
    {
        message.channel.send(`\`${unit}\` is not a unit`);
        return NaN;
    }
    number = number * multiplier;
    return number;
}