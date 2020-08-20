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
const version = '1.2.2';
const fs = require('fs');
var upgrade_list_length;
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const { exit } = require('process');
const { clear, timeStamp } = require('console');
const sqlite = require('sqlite3').verbose();
const Canvas = require('canvas');
const { EOPNOTSUPP } = require('constants');
var p_vars;
var vars;
var Items =
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
        'buy price': 1.2,
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
var Upgrades =
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
var Quests =
{
    'higher lower game':
    {
        'reward': 2,
        'wait time': 70
    },
    'find the button':
    {
        'reward': 5,
        'wait time': 130
    },
    'punch an elderly person':
    {
        'reward': -100,
        'wait time': 0.1
    },
};
var QuestNames;
var CommandList = [];
var QuestMultipliers = [2, 5, -100];
for (const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
    CommandList.push(command.name);
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
    QuestNames = exports.GetPropertyNames(Quests);
    //console.log(bot.guilds.fetch('id'));
    //db.run(`UPDATE data SET last_quested = ?`, [0]);
});
bot.on('guildMemberAdd', async member =>
{
    var channel = member.guild.channels.cache.find(ch => ch.name === 'welcome' || ch.name === 'new-members' || ch.name === 'member-log');
    if (!channel) return;

    const canvas = Canvas.createCanvas(936, 474);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./cliff.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    /*ctx.strokeStyle = '#74037b';
    ctx.strokeRect(5, 5, canvas.width, canvas.height);*/
    var coords = [650, 400];
    var size = 37.5;
    // Pick up the pen
    ctx.beginPath();
    // Start the arc to form a circle
    ctx.arc(coords[0], coords[1], size, 0, Math.PI * 2, true);
    // Put the pen down
    ctx.closePath();
    // Clip off the region you drew on
    ctx.clip();

    // Wait for Canvas to load the image
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    // Move the image downwards vertically and constrain its height to 75, so it's a square
    ctx.drawImage(avatar, coords[0] - size, coords[1] - size, size * 2, size * 2);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

    channel.send(`Welcome to the server, ${member}!
I hope you get what you deserve...

*Yeets body off cliff*`, attachment);
});
bot.on('message', message =>
{
    //console.log(message.guild);
    var channel_name = message.channel.name;
    if (channel_name != 'testing' && token === 'NzM4NzYxMDYzNjkyMjM4ODg4.XyQm2w.qC9_uJwKQd7H8V_GjwKE7EQYw-E') return;
    if (channel_name === 'testing' && token === 'NzIyNDY2NzY1NTEwMTQ4MTc3.Xujfmw.DPxFzTa28pIJXL4uWSTIsMdXku0') return;
    if (message.author.username === 'Lattebot' || message.author.username === 'Tester bot') return;
    if (channel_name === 'the-letter-m') 
    {
        setTimeout(() =>
        {
            Mify(message);
        }, 3000);
        return;
    }
    message.content = message.content.toLowerCase();
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
                let InsertData = db.prepare(`INSERT INTO data VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);

                InsertData.run(/*id*/id,/*name*/ name,/*balance*/ 0,/*milk*/ 0,/*cow*/ 0,/*last_milked*/ 0,/*last_worked*/ 0,/*work_times*/ 0,/*land*/ 40,/*pasteurizerr*/0,/*battery*/0,/*watts*/ 0,/*solar_panel*/ 0,/*wind_turbine*/ 0,/*last_powered*/ 0,/*clean_milk*/ 0,/*animal_feed*/ 0,/*upgrades*/'0 0 0',/*seed*/0,/*corn*/0,/*farm*/0,/*grinder*/0,/*last_harvested*/0,/*planted_farm*/0,/*last_quested*/ 0);
                InsertData.finalize();
                db.close();
                MainSystem(message, db,/*id*/id, time,/*name*/ name,/*balance*/ 0,/*milk*/ 0,/*cow*/ 0,/*last_milked*/ 0,/*last_worked*/ 0,/*work_times*/ 0,/*land*/ 40,/*pasteurizerr*/0,/*battery*/0,/*watts*/ 0,/*solar_panel*/ 0,/*wind_turbine*/ 0,/*last_powered*/ 0,/*clean_milk*/ 0,/*animal_feed*/ 0,/*upgrades*/'0 0 0',/*seed*/0,/*corn*/0,/*farm*/0,/*grinder*/0,/*last_harvested*/0,/*planted_farm*/0,/*last_quested*/0);
            }
        }
        else
        {
            MainSystem(message, db, id, time, row.name, row.balance, row.milk, row.cow, row.last_milked, row.last_worked, row.work_times, row.land, row.pasteurizer, row.battery, row.watts, row.solar_panel, row.wind_turbine, row.last_powered, row.clean_milk, row.animal_feed, row.upgrades, row.seed, row.corn, row.farm, row.grinder, row.last_harvested, row.planted_farm, row.last_quested);
        }
    });
})
bot.login(token);
function MainSystem(message, db, id, time, name, balance, milk, cow, last_milked, last_worked, work_times, land, pasteurizer, battery, watts, solar_panel, wind_turbine, last_powered, clean_milk, animal_feed, upgrades, seed, corn, farm, grinder, last_harvested, planted_farm, last_quested)
{
    /*if (message.content.substring(0, 15) === `i love fortnite`)
    {
        message.channel.send(`${message.member.user} has been banned for saying:
i love fortnite`);
        message.member.ban(message.member.user);
    }
    if (message.content.substring(0, 15) === `i like fortnite`)
    {
        message.channel.send(`${message.member.user} has been banned for saying:
i like fortnite`);
        message.member.ban(message.member.user);
    }*/
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
    upgrade_list_length = Object.keys(Upgrades).length;
    let args = message.content.toLowerCase().substring(PREFIX.length).split(' ');
    vars =
    {
        'message': message,
        'prefix': PREFIX,
        'args': args,
        'db': db,
        'id': id,
        'time': time,
        'name': name,
        'balance': balance,
        'milk': milk,
        'cow': cow,
        'last milked': last_milked,
        'last worked': last_worked,
        'work times': work_times,
        'land': land,
        'ItemNames': [],
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
        'planted farm': planted_farm,
        'upgrades': upgrades,
        'player tier': 0,
        'Upgrades': Upgrades,
        'UpgradeNames': [],
        'Quests': Quests,
        'QuestNames': QuestNames,
        'last quested': last_quested,
    };
    p_vars = vars;
    vars['player tier'] = exports.GetUpgrade(0);
    Items['animal feed']['buy price'] = 1.2 + exports.GetUpgrade(1) * 1.8;
    vars['ItemNames'] = exports.GetPropertyNames(Items);
    vars['UpgradeNames'] = exports.GetPropertyNames(Upgrades);
    for (var count = 0; count < Object.keys(Quests).length; count++)
    {
        Quests[QuestNames[count]]['reward'] = QuestMultipliers[count] * exports.GetNetWoth() / 200;
    }
    p_vars = vars;
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
function Mify(message)
{
    if (message.content.length < 5)
    {
        return null;
    }
    if (message.content.substring(0, 2) === '||' && message.content.substring(message.content.length - 2, message.content.length) === '||')
    {
        return null;
    }
    var M =
        [
            `ℳ`,
            `μ`,
            `ـم`,
            `м`,
            `m`,
            `ɯ̽`,
            `ɰ`,
            `ɱ`,
            `ɯ`,
            `mʰ`,
            `ʃmʰ`,
        ];
    var new_message = `\`${message.member.user.username}\`\n`;
    for (var count = 0; count < message.content.length; count++)
    {
        var is_uppercase = false;
        if (message.content[count] == message.content[count].toUpperCase())
        {
            is_uppercase = true;
        }
        var addition = M[exports.RandomInt(0, M.length)];
        let n = message.content.charCodeAt(count);
        let strStartsWithALetter = RegExp(/^\p{L}/, 'u').test(message.content[count]);
        if (is_uppercase)
        {
            addition = addition.toUpperCase();
        }
        if (strStartsWithALetter === false)
        {
            addition = message.content[count];
        }
        new_message = new_message + addition;
    }
    message.delete();
    message.channel.send(new_message);
    return;
}
function PayRespects()
{

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
exports.Say = function (message, Title, description, colour, display_avatar)
{
    if (display_avatar === undefined)
    {
        display_avatar = false;
    }
    var name = message.member.user.username;
    if (colour === undefined)
    {
        colour = 0x3498db;
    }
    var embed;
    if (display_avatar)
    {
        embed = new MessageEmbed().setTitle(Title).setAuthor(name, message.author.displayAvatarURL()).setColor(colour).setDescription(description);
    }
    else
    {
        embed = new MessageEmbed().setTitle(Title).setColor(colour).setDescription(description);
    }

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
exports.GetItem = function ()
{
    var message = p_vars['message'];
    var args = p_vars['args'];
    var ItemNames = p_vars['ItemNames'];
    var item = '';
    var NumberPosition = -1;
    var number = -1;
    var IsMax = false;
    for (var count = 0; count < args.length; count++)
    {
        if (isNaN(exports.ConvertToNumber(args[count])) === false)
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
        number = exports.ConvertToNumber(args[1]);
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
    if (number > 0 && number < 1)
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
        if (isNaN(exports.ConvertToNumber(args[count])) === false)
        {
            NumberPosition = count;
        }
    }
    for (var count = 1; count < NumberPosition; count++)
    {
        name = name + ' ' + args[count];
    }
    name = name.substring(1);
    var number = exports.ConvertToNumber(args[NumberPosition]);
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
exports.CalcPower = function ()
{
    var battery = p_vars['battery'];
    var solar_panel = p_vars['solar panel'];
    var wind_turbine = p_vars['wind turbine'];
    var watts = p_vars['watts'];
    var time = p_vars['time'];
    var last_powered = p_vars['last powered'];
    var id = p_vars['id'];
    var db = p_vars['db'];
    if (last_powered === 0)
    {
        last_powered = time;
    }
    var new_watts = Math.min(watts + (wind_turbine * 0.03 + solar_panel * 0.1) * (time - last_powered), battery * 10000).toFixed(2);
    db.run(`UPDATE data SET watts = ?, last_powered = ? WHERE id = ?`, [new_watts, time, id]);
    return new_watts;
}
exports.ConvertToUnit = function (number, units)
{
    var is_negative = false;
    if (units === undefined)
    {
        units = `K M B T Q`;
    }
    number = Number(number);
    if (number < 0)
    {
        is_negative = true;
        number = Math.abs(number);
    }
    var SeparatedUnits = units.split(' ');
    var Divider = 1000;
    var End = -1;
    for (var count = 0; count < SeparatedUnits.length; count++)
    {
        if (number / Divider >= 1)
        {
            number = (number / 1000).toFixed(2);
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
    for (var count = 2; count > 0; count--)
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
    if (is_negative)
    {
        number = -number;
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
exports.GetUpgrade = function (upgrade_slot)
{
    var upgrades = p_vars['upgrades'];
    var id = p_vars['id'];
    var db = p_vars['db'];
    var upgrade_list = upgrades.toString().split(' ');
    if (upgrade_list.length < upgrade_list_length)
    {
        var upgrade_list_addition = '';
        for (var count = 0; count < upgrade_list_length - upgrade_list.length; count++)
        {
            upgrade_list_addition = upgrade_list_addition + ' 0';
        }
        var new_upgrade_list = upgrades + upgrade_list_addition;
        db.run(`UPDATE data set upgrades = ? WHERE id = ?`, [new_upgrade_list, id]);
        exports.UpdateVars('upgrades', new_upgrade_list);
    }
    return Number(upgrade_list[upgrade_slot]);
}
exports.GetUpgraded = function (upgrade_slot, amount)
{
    var upgrade_level = exports.GetUpgrade(upgrade_slot);
    var upgrades = p_vars['upgrades'];
    var upgrade_list = upgrades.toString().split(' ');
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
exports.ConvertToNumber = function (number_with_unit)
{
    var message = p_vars['message'];
    var number = Number(number_with_unit.substring(0, number_with_unit.length - 1));
    if (number < 0)
    {
        message.channel.send(`I don't like negative numbers. They always bring me down. :(`);
        return NaN;
    }
    if (isNaN(Number(number_with_unit)) === false)
    {
        return number_with_unit;
    }
    if (number_with_unit.length < 2)
    {
        return NaN;
    }
    if (isNaN(Number(number_with_unit.substring(0, number_with_unit.length - 1))) === true)
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
exports.RandomInt = function (min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
}
/*Stolen because i couldn't figure it out
Also, this is so beautiful i feel i'm going to nut*/
exports.GetRandomFromArray = function (arr, n)
{
    var result = new Array(n),
        length = arr.length,
        taken = new Array(length);
    if (n > length)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--)
    {
        var x = Math.floor(Math.random() * length);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --length in taken ? taken[length] : length;
    }
    return result;
}
exports.UpdateVars = function (var_name, value)
{
    vars[var_name] = value;
    p_vars[var_name] = value;
}
exports.GetPropertyNames = function (data)
{
    var PropertyNames = [];
    for (var prop in data)
    {
        var propName = prop;
        //var propVal = data[prop];
        PropertyNames.push(propName);
    }
    return PropertyNames;
}
exports.GetNetWoth = function ()
{
    var value = 0;
    var ItemNames = p_vars['ItemNames'];
    for (var count = 0; count < Object.keys(Items).length; count++)
    {
        var item_name = ItemNames[count];
        value += p_vars[item_name] * Items[item_name]['sell price'];
    }
    var UpgradeNames = p_vars['UpgradeNames'];
    for (var count = 0; count < Object.keys(Upgrades).length; count++)
    {
        var upgrade_name = UpgradeNames[count];
        var upgrade_value = exports.GetUpgrade(count);
        for (var scount = 0; scount < upgrade_value; scount++)
        {
            value += Upgrades[upgrade_name]['prices'][scount];
        }
    }
    return value;
}