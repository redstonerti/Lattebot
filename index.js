/*Useful shit

GETTING AN OBJECT'S LENGTH NO MATTER HOW DUMB IT WANTS TO BE:
Object.keys(array).length;

Close all:
Ctrl + K + 1

Open all:
Ctrl + K + J

Custom emojis:
bot.emojis.cache.forEach(emoji =>
{
    console.log(emoji.name);
    console.log(emoji.id);
});
var latteland = guilds.get('722462513375215627');
var testing_server = guilds.get('752779913937027122');
var general_channel = testing_server.channels.cache.find(channel => channel.name === 'general');
general_channel.send(`Emoji: <:ohgod:739035071507464314>`);
*/
const Discord = require('discord.js');
const bot = new Discord.Client();
const { token } = require("./token.json");
const DEFAULT_PREFIX = ';';
const version = '1.2.4';
const fs = require('fs');
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const sqlite = require('sqlite3').verbose();
const Canvas = require('canvas');
const TIME_OF_RESPECT = [24, 00, 00];
const SHOW_SERVERS = true;
const SHOW_MEMBERS = false;
var p_vars;
var vars;
var DefaultVariables =
{

};
var Items =
{
    'milk': {
        'buy price': null,
        'sell price': 0.80,
        'tier': 0,
        'emoji': '🥛',
        'cap': null,
        'cap calculation': null,
        'unique attribute': ''
    },
    'clean milk': {
        'buy price': 2.52,
        'sell price': 2.4,
        'tier': 1,
        'emoji': '🍼',
        'cap': null,
        'cap calculation': null,
        'unique attribute': ''
    },
    'cow': {
        'buy price': 130,
        'sell price': 123,
        'tier': 0,
        'emoji': '🐄',
        'cap': null,
        'cap calculation': `land * 5`,
        'unique attribute': ''
    },
    'land': {
        'buy price': 500,
        'sell price': 476,
        'tier': 0,
        'emoji': '⛳',
        'cap': 200,
        'cap calculation': null,
        'unique attribute': ''
    },
    'pasteurizer': {
        'buy price': 220,
        'sell price': 209,
        'tier': 1,
        'emoji': '⚙️',
        'cap': null,
        'cap calculation': null,
        'unique attribute': ''
    },
    'battery': {
        'buy price': 2000,
        'sell price': 1904,
        'tier': 1,
        'emoji': '🔋',
        'cap': null,
        'cap calculation': null,
        'unique attribute': '10KW capacity'
    },
    'solar panel': {
        'buy price': 150,
        'sell price': 142,
        'tier': 1,
        'emoji': '⛅',
        'cap': null,
        'cap calculation': null,
        'unique attribute': '0.1W / sec'
    },
    'wind turbine': {
        'buy price': 50,
        'sell price': 47,
        'tier': 1,
        'emoji': '💨',
        'cap': null,
        'cap calculation': null,
        'unique attribute': '0.03W / sec'
    },
    'animal feed': {
        'buy price': 1.2,
        'sell price': null,
        'tier': 2,
        'emoji': '🌾',
        'cap': null,
        'cap calculation': null,
        'unique attribute': ''
    },
    'corn': {
        'buy price': 2.4,
        'sell price': null,
        'tier': 2,
        'emoji': '🌽',
        'cap': null,
        'cap calculation': null,
        'unique attribute': ''
    },
    'seed': {
        'buy price': 0.3,
        'sell price': null,
        'tier': 2,
        'emoji': '🌿',
        'cap': null,
        'cap calculation': null,
        'unique attribute': ''
    },
    'grinder': {
        'buy price': 780,
        'sell price': 742,
        'tier': 2,
        'emoji': '🗜️',
        'cap': null,
        'cap calculation': null,
        'unique attribute': ''
    },
    'farm': {
        'buy price': 970,
        'sell price': 923,
        'tier': 2,
        'emoji': '🚜',
        'cap': null,
        'cap calculation': null,
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
        'reward': null,
        'wait time': 70
    },
    'find the button':
    {
        'reward': null,
        'wait time': 130
    },
    'punch an elderly person':
    {
        'reward': null,
        'wait time': 0.1
    },
};
var GuildSettings =
{
    'prefix': DEFAULT_PREFIX,
    'reaction images': true,
    'allowed channels': [],
};
var QuestNames;
var CommandList = [];
var QuestMultipliers = [2, 5, -10];
for (const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
    CommandList.push(command.name);
}
bot.on('ready', async () =>
{
    let db = new sqlite.Database('./database.db', sqlite.OPEN_READWRITE);
    console.log('This bot is online!');
    bot.user.setPresence(
        {
            activity: {
                name: 'default prefix is ' + DEFAULT_PREFIX
            }, status: 'online'
        }
    )
    PayRespects();
    QuestNames = exports.GetPropertyNames(Quests);
    let query = `SELECT * FROM data WHERE is_default = ? `;
    var Row;
    var promise = new Promise((resolve =>
    {
        db.get(query, [1], (err, row) =>
        {
            Row = row;
            if (err)
            {
                console.log(err);
                resolve(true);
                return;
            }
            resolve(row);
        });
    }))
    var has_error = await promise;
    if (!has_error) 
    {
        console.log(`You fucking dumbass.You didn't make the default row.`);
        return;
    }
    DefaultVariables = Row;
    bot.guilds.cache.forEach(guild =>
    {
        let query = `SELECT * FROM servers WHERE id = ? `;
        var Row;
        var promise = new Promise(async resolve =>
        {
            db.get(query, [guild.id], (err, row) =>
            {
                Row = row;
                if (err)
                {
                    console.log(err);
                    resolve(false);
                    return;
                }
                if (row === undefined)
                {
                    console.log(`server ${guild.name} was undefined`);
                    let InsertData = db.prepare(`INSERT INTO servers VALUES(?,?,?,?,?)`);
                    InsertData.run(guild.id, guild.name, guild.memberCount, '{}', '');
                    InsertData.finalize();
                    db.close();
                    resolve(false);
                    return;
                }
                resolve(row);
            });
            var server = await promise;
            if (server)
            {
                console.log(`no`);
                return;
            }
            db.run(`UPDATE servers SET name = ?, members = ? WHERE id = ?`, [guild.name, guild.memberCount, guild.id]);
        })
    });
    query = `SELECT CAST(id AS TEXT) FROM servers`;
    var promise = new Promise(resolve =>
    {
        db.all(query, [], (err, row) =>
        {
            if (err)
            {
                console.log(err);
                resolve(false);
                return;
            }
            resolve(row);
        });
    })
    var Ids = await promise;
    if (!Ids)
    {
        return;
    }
    var guilds = bot.guilds.cache;
    for (var count = 0; count < Ids.length; count++)
    {
        var guild_id = Ids[count]['CAST(id AS TEXT)'];
        if (guilds.get(guild_id) === undefined)
        {
            db.run(`DELETE from servers where id = ?`, [guild_id]);
        }
    }
    //db.run(`UPDATE servers SET settings = ?`, ['{}']);
});
bot.on('guildMemberAdd', async member =>
{
    if (bot.user.username === 'Tester bot') return;
    if (member.guild === null) return;
    if (SHOW_MEMBERS)
    {
        console.log(`member ${member.user.username} entered guild ${member.guild.name}`);
    }
    let db = new sqlite.Database('./database.db', sqlite.OPEN_READWRITE);
    var channel = member.guild.channels.cache.find(ch => ch.name === 'welcome' || ch.name === 'new-members' || ch.name === 'member-log' || ch.name === 'milk-hall');
    if (!channel) return;

    const canvas = Canvas.createCanvas(936, 474);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./cliff.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

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

    if (!channel) return;
    channel.send(`Welcome to the server, ${member}!
I hope you get what you deserve...

*Yeets body off cliff*`, attachment);
});
bot.on('guildMemberRemove', async member =>
{
    if (member.guild === null) return;
    if (SHOW_MEMBERS)
    {
        console.log(`member ${member.user.username} left guild ${member.guild.name}`);
    }
    if (bot.user.username === 'Tester bot') return;
    let db = new sqlite.Database('./database.db', sqlite.OPEN_READWRITE);
    var guild = member.guild;
    var id = guild.id;
    let query = `SELECT * FROM servers WHERE id = ?`;
    var dead_people = '';
    var promise = new Promise((resolve) =>
    {
        db.get(query, [id], (err, row) =>
        {
            if (err)
            {
                console.log(err);
                resolve(null);
                return;
            }
            if (row === undefined)
            {
                console.log(`row was undefined`);
                let InsertData = db.prepare(`INSERT INTO servers VALUES(?,?,?)`);
                InsertData.run(/*id*/id, /*name*/guild.name, /*dead_people*/'');
                InsertData.finalize();
                db.close();
                resolve('');
            }
            else
            {
                resolve(row.dead_people);
            }
        });
    });
    dead_people = await promise;
    var People = '';
    if (dead_people.length > 0)
    {
        People = dead_people.split(' | ');
    }
    var member_id = member.id;
    var is_on_list = false;
    for (var count = 0; count < People.length; count++)
    {
        var Properties = People[count].split(' ');
        var person_id = Properties[0];
        if (person_id === member_id)
        {
            is_on_list = true;
        }
    }
    if (is_on_list === false)
    {
        var new_dead = '';
        if (dead_people.length > 0)
        {
            new_dead += ' | ';
        }
        new_dead += member.id;
        new_dead += ' ';
        new_dead += member.user.username;
        new_dead += ' ';
        new_dead += new Date().getTime();
        db.run(`UPDATE servers SET dead_people = ? where id = ?`, [dead_people + new_dead, id]);
    }
    var channel = member.guild.channels.cache.find(ch => ch.name === 'milk-hall' || ch.name === 'testing');
    if (!channel) return;
    var guild = channel.guild;
    var emoji;
    var grief = ``;
    if (guild.name === 'Kingdom of Latteland' || guild.name === 'Lattebot testing and support')
    {
        emoji = guild.emojis.cache.find(emoji => emoji.name === "milgodsad");
        channel.send(`:sob: ${member.user.tag} ${emoji} is gone no-\n\n**STFU MEE6 WITH YOUR ZAML SHIT.\nWe just lost ${member.user.username} and you're over here zamling. Piss off.\nNo shit you were too zaml. Look at what you've done to them.**\n\n\n\n\n\n*h-hello? yeah i just blacked out for 20 seconds*`);
    }
    else
    {
        emoji = ':sob:';
        channel.send(`:sob: ${member.user.tag} ${emoji} is gone. A moment of silence for the dead /- _ -\ `);
    }
});
bot.on('guildCreate', async guild =>
{
    if (SHOW_SERVERS)
    {
        console.log(`Entered a new guild! ${guild.name}`);
    }
    let db = new sqlite.Database('./database.db', sqlite.OPEN_READWRITE);
    let InsertData = db.prepare(`INSERT INTO servers VALUES(?,?,?,?,?)`);
    InsertData.run(guild.id, guild.name, guild.memberCount, '{}', '');
    InsertData.finalize();
    db.close();
});
bot.on('guildDelete', async guild =>
{
    if (SHOW_SERVERS)
    {
        console.log(`Left guild ${guild.name} :(`);
    }
    let db = new sqlite.Database('./database.db', sqlite.OPEN_READWRITE);
    db.run(`DELETE from servers WHERE id = ? `, [guild.id]);
});
bot.on('message', async message =>
{
    var prefix = DEFAULT_PREFIX;
    var is_dm = true;
    var guild_settings;
    var guild = message.guild;
    var db = new sqlite.Database('./database.db', sqlite.OPEN_READWRITE);
    var channel_name = message.channel.name;
    if (message.author.bot) return;
    if (message.guild != null)
    {
        //if (channel_name.substring(0, 7) != 'testing' && bot.user.username === 'Tester bot') return;
        if (channel_name.substring(0, 7) === 'testing' && bot.user.username === 'Lattebot') return;
        if (channel_name === 'the-letter-m') 
        {
            setTimeout(() =>
            {
                Mify(message);
            }, 3000);
            return;
        }
        var is_dm = false;
    }
    if (!is_dm)
    {
        var query = `SELECT * FROM servers WHERE id = ? `;
        var promise = new Promise((resolve =>
        {
            db.get(query, [guild.id], (err, row) =>
            {
                if (err)
                {
                    console.log(err);
                    resolve(false);
                }
                resolve(row);
            });
        }))
        var GuildData = await promise;
        if (!GuildData)
        {
            return;
        }
        var original_guild_data = GuildData['settings'];
        guild_settings = JSON.parse(GuildData['settings']);
        var original_guild_settings = JSON.stringify(guild_settings);
        var GuildSettingsNames = exports.GetPropertyNames(GuildSettings);
        for (var count = 0; count < GuildSettingsNames.length; count++)
        {
            var setting_name = GuildSettingsNames[count];
            if (guild_settings[setting_name] === undefined)
            {
                guild_settings[setting_name] = GuildSettings[setting_name];
            }
        }
        var stringified_guild_settings = JSON.stringify(guild_settings);
        if (original_guild_data === '{}')
        {
            db.run(`UPDATE servers SET settings = ? WHERE id = ?`, [stringified_guild_settings, guild.id]);
        }
    }
    prefix = guild_settings['prefix'];
    var reaction_images = guild_settings['reaction images'];
    var allowed_channels = guild_settings['allowed channels'];
    var is_allowed = true;
    if (allowed_channels.length > 0)
    {
        is_allowed = false;
        for (var count = 0; count < allowed_channels.length; count++)
        {
            if (channel_name === allowed_channels[count])
            {
                is_allowed = true;
            }
        }
    }
    {
        if (message.content.toLowerCase().substring(0, 5) === 'send ')
        {
            if (!message.content.includes('@'))
            {
                message.channel.send(message.content.substring(5));
            }
        }
        else if (message.content.toLowerCase().substring(0, 6) === 'putin ')
        {
            if (!message.content.includes('@'))
            {
                message.channel.send(`put out ${message.content.toLowerCase().substring(6)} `);
            }
        }
        else if (message.content.toLowerCase() === 'noice' && reaction_images)
        {
            const attachment = new MessageAttachment('./noice.png');
            message.channel.send(attachment);
        }
        else if (message.content.toLowerCase() === 'bruh' && reaction_images)
        {
            const attachment = new MessageAttachment('./bruh.png');
            message.channel.send(attachment);
        }
    }
    if (!is_allowed) return;
    message.content = message.content.toLowerCase();
    if (prefix === ';')
        if (message.content.substring(0, 3) === ';-;')
            return null;
    if (message.content.substring(0, prefix.length) != prefix)
        return null;
    var time = Math.round(new Date().getTime() / 1000);
    var id = message.author.id;
    var name = message.author.tag;
    query = `SELECT * FROM data WHERE id = ? `;
    var Variables = DefaultVariables;
    Variables['id'] = id;
    Variables['name'] = name;
    Variables['is_default'] = 0;
    var DefaultData = [];
    var question_marks = ``;
    var VariableNames = exports.GetPropertyNames(Variables);
    for (var count = 0; count < Object.keys(Variables).length; count++)
    {
        DefaultData.push(Variables[VariableNames[count]]);
        question_marks += `,? `;
    }
    question_marks = question_marks.substring(1);
    var Row;
    var promise = new Promise((resolve =>
    {
        db.get(query, [id], (err, row) =>
        {
            if (err)
            {
                console.log(err);
                resolve(true);
            }
            else
            {
                if (row === undefined)
                {
                    console.log(`row was undefined`);
                    let InsertData = db.prepare(`INSERT INTO data VALUES(${question_marks})`);
                    InsertData.run(DefaultData);
                    InsertData.finalize();
                    db.close();
                    resolve(Variables);
                }
                else
                {
                    resolve(row);
                }
            }
        });
    }))
    var has_error = await promise;
    if (has_error === true) 
    {
        return;
    }
    else
    {
        Row = has_error;
    }
    DefaultData[0] = 0;
    DefaultData[1] = 0;
    DefaultData[2] = '';
    let args = message.content.toLowerCase().substring(prefix.length).split(' ');
    vars =
    {
        'message': message,
        'prefix': prefix,
        'args': args,
        'db': db = new sqlite.Database('./database.db', sqlite.OPEN_READWRITE),
        'time': time,
        'ItemNames': [],
        'Items': Items,
        'version': version,
        'command length': 0,
        'is dm': is_dm,
        'player tier': 0,
        'Upgrades': Upgrades,
        'UpgradeNames': [],
        'Quests': Quests,
        'QuestNames': QuestNames,
        'DefaultData': DefaultData,
        'question marks': question_marks,
        'Variables': Variables,
        'guild settings': guild_settings,
    };
    for (var count = 0; count < Object.keys(Variables).length; count++)
    {
        var variable_name = VariableNames[count];
        vars[variable_name.replace('_', ' ')] = Row[variable_name];
    }
    var ItemNames = exports.GetPropertyNames(Items);
    var NewItems = Items
    var max_tier = -1;
    for (var count = 0; count < Object.keys(Items).length; count++)
    {
        var item_name = ItemNames[count];
        var cap_calc = Items[item_name]['cap calculation'];
        if (Items[item_name]['tier'] > max_tier)
        {
            max_tier = Items[item_name]['tier'];
        }
        if (cap_calc === null)
        {
            continue;
        }
        var item = cap_calc.split(' * ')[0];
        var amount = Number(cap_calc.split(' * ')[1]);
        NewItems[item_name]['cap'] = vars[item] * amount;
    }
    vars['id'] = message.author.id;
    vars['max tier'] = max_tier;
    vars['Items'] = NewItems;
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
    var ResultList = exports.AutoFill(message, args[0], CommandList);
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

})
bot.login(token);
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
    let db = new sqlite.Database('./database.db', sqlite.OPEN_READWRITE);
    let query = `SELECT CAST(id AS TEXT), CAST(dead_people AS TEXT) FROM servers`;
    var time = new Date().getTime();
    setTimeout(function () 
    {
        db.all(query, [], (err, row) =>
        {
            if (err)
            {
                console.log(err);
                return;
            }
            var guilds = bot.guilds.cache;
            for (var count = 0; count < row.length; count++)
            {
                var guild_id = row[count]['CAST(id AS TEXT)'].toString();
                var guild = guilds.get(guild_id);
                if (!guild) continue;
                var channel = guild.channels.cache.find(ch => ch.name === 'graveyard');
                if (channel)
                {
                    var message = ``;
                    var dead_people = row[count]['CAST(dead_people AS TEXT)'].toString();
                    var People = '';
                    if (dead_people.length > 0)
                    {
                        People = dead_people.split(' | ');
                    }
                    for (var count = 0; count < People.length; count++)
                    {
                        var person = People[count].split(' ');
                        var leave_time = person[person.length - 1];
                        var time_gone = time - leave_time;
                        var days_gone = exports.SecToHMS(time_gone / 1000);
                        var person_name = ``;
                        var days_or_day = ``;
                        for (var scount = 1; scount < person.length - 1; scount++)
                        {
                            person_name += `${person[scount]} `;
                        }
                        person_name = person_name.substring(0, person_name.length - 1);
                        message += `Rip **\`${person_name}\`**. It's been \`${days_gone}\` ${days_or_day} since they left us. :sob:\n`;
                    }
                    if (message.length > 0)
                    {
                        channel.send(message);
                    }
                }
            }
        });
        PayRespects();
    }, exports.SecondsUntilTime(TIME_OF_RESPECT) * 1000 + 2000);
}
exports.Say = function (message, Title, description, colour, display_avatar, second_title, second_description, third_title, third_description)
{
    if (display_avatar === undefined)
    {
        display_avatar = false;
    }
    var name = message.author.username;
    if (colour === undefined)
    {
        colour = 0x3498db;
    }
    var embed = new MessageEmbed().setTitle(Title).setDescription(description);
    if (display_avatar)
    {
        embed.setAuthor(name, message.author.displayAvatarURL()).setColor(colour);
    }
    if (second_description != undefined && second_title != undefined)
    {
        embed.addField(second_title, second_description, true);
    }
    if (third_description != undefined && third_title != undefined)
    {
        embed.addField(third_title, third_description, true);
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
    var ResultList = exports.AutoFill(message, item, ItemNames);
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
exports.GetName = function ()
{
    var args = p_vars['args'];
    var message = p_vars['message'];
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
    var number = -1;
    if (NumberPosition > 1)
    {
        number = exports.ConvertToNumber(args[NumberPosition]);
    }
    else
    {
        message.channel.send(`You have to specify a number after the name. e.g.\`;give ${args[1]} 4\``);
        return null;
    }
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
    if (ShowList === undefined)
    {
        ShowList = true;
    }
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
    var upgrade_list_length = exports.GetPropertyNames(p_vars['Upgrades']);
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
exports.SecToHMS = function (seconds)
{
    seconds = Number(seconds);
    seconds = Math.floor(seconds);
    var hour_min_sec = ``;
    var years = Math.floor(seconds / 31536000);
    if (years > 0)
    {
        hour_min_sec = hour_min_sec + years.toString() + `y `;
    }
    seconds = seconds - years * 31536000;
    var months = Math.floor(seconds / 2592000);
    if (months > 0)
    {
        hour_min_sec = hour_min_sec + months.toString() + `m `;
    }
    seconds = seconds - months * 2592000;
    var weeks = Math.floor(seconds / 604800);
    if (weeks > 0)
    {
        hour_min_sec = hour_min_sec + weeks.toString() + `w `;
    }
    seconds = seconds - weeks * 604800;
    var days = Math.floor(seconds / 86400);
    if (days > 0)
    {
        hour_min_sec = hour_min_sec + days.toString() + `d `;
    }
    seconds = seconds - days * 86400;
    var hours = Math.floor(seconds / 3600);
    if (hours > 0)
    {
        hour_min_sec = hour_min_sec + hours.toString() + `h `;
    }
    seconds = seconds - hours * 3600;
    var minutes = Math.floor(seconds / 60);
    if (minutes > 0)
    {
        hour_min_sec = hour_min_sec + minutes.toString() + `m `;
    }
    seconds = seconds - minutes * 60;
    if (seconds >= 0)
    {
        hour_min_sec = hour_min_sec + seconds.toString() + `s`;
    }
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
        'T': 1000000000000,
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
exports.SecondsUntilTime = function ([hours, minutes, seconds])
{
    var current_time = new Date();
    var difference_in_hours = (hours - current_time.getHours());
    var difference_in_minutes = (minutes - current_time.getMinutes());
    var difference_in_seconds = (seconds - current_time.getSeconds());
    if (difference_in_minutes < 0)
    {
        difference_in_minutes += 60;
        difference_in_hours -= 1;
    }
    if (difference_in_seconds < 0)
    {
        difference_in_seconds += 60;
        difference_in_minutes -= 1;
    }
    var seconds_until_respect = difference_in_hours * 3600 + difference_in_minutes * 60 + difference_in_seconds;
    return Math.max(0, seconds_until_respect);
}
exports.InsertString = function (string1, string2, position)
{
    return string1.substring(0, position) + string2 + string1.substring(position);
}