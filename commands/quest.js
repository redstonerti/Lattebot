const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'quest',
    description: "interesting",
    execute(vars)
    {
        var message = vars['message'];
        var args = vars['args'];
        var Quests = vars['Quests'];
        var QuestNames = vars['QuestNames'];
        var db = vars['db'];
        var id = vars['id'];
        var last_quested = vars['last quested'];
        var time = vars['time'];
        var balance = vars['balance'];
        if (time - last_quested < 300)
        {
            message.channel.send(`Sorry but you have \`${funcs.SecToHMS(300 - (time - last_quested))}\` left before you can start another quest.`);
            return;
        }
        var ValidResponses =
            [
                `1`,
                `2`,
                `3`,
            ];
        var is_valid = false;
        var quest_options = funcs.GetRandomFromArray(QuestNames, 3);
        for (var count = 0; count < quest_options.length; count++)
        {
            ValidResponses.push(quest_options[count]);
        }
        var quest_options_display = `Write \`1, 2, 3 or the name of the quest\` to start\nWrite \`x\` to end quest selection or to end the quest\n`;
        for (var count = 0; count < quest_options.length; count++)
        {
            var quest_name = quest_options[count];
            quest_options_display += `**${count + 1}.** ${funcs.CapitalFirst(quest_name)}\nReward: \`${funcs.ConvertToUnit(Math.abs(Quests[quest_name]['reward']), `K M B`)}\`\nTime: \`${funcs.SecToHMS(Quests[quest_name]['wait time'])}\`\n\n`;
        }
        funcs.Say(message, `Quest options`, quest_options_display);
        // `m` is a message object that will be passed through the filter function
        const filter = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, { time: 30000 });
        var StopReason = `time`;
        var quest;
        collector.on('collect', m =>
        {
            m.content = m.content.toLowerCase();
            if (m.content.substring(0, 1) === 'x')
            {
                StopReason = `requested end`;
                collector.stop();
                return;
            }
            if (m.content.substring(0, 1) === ';')
            {
                StopReason = ``;
                collector.stop();
                return;
            }
            var quest_accepted;
            var IsNum = false;
            if (isNaN(Number(m.content)))
            {
                quest_accepted = funcs.AutoFill(message, m.content, quest_options, true);
                if (quest_accepted === null)
                {
                    return;
                }
                else
                {
                    quest_accepted = quest_accepted[0].toString();
                }
            }
            else
            {
                IsNum = true;
                quest_accepted = Number(m.content);
                if (quest_accepted > 3)
                {
                    m.channel.send(`There are only three quests to choose from.`);
                    return;
                }
                if (quest_accepted < 1)
                {
                    m.channel.send(`No zeros and no negative numbers`);
                    return;
                }
            }
            for (var count = 0; count < ValidResponses.length; count++)
            {
                if (quest_accepted === ValidResponses[count] || `${quest_accepted}` === ValidResponses[count])
                {
                    is_valid = true;
                }
            }
            if (is_valid === false)
            {
                message.channel.send(`NO. That isn't a quest`);
                StopReason = ``;
                collector.stop();
                return;
            }
            if (IsNum)
            {
                quest = quest_options[quest_accepted - 1];
            }
            else
            {
                quest = quest_accepted;
            }
            StopReason = ``;
            collector.stop();
        });

        collector.on('end', collected =>
        {
            if (StopReason === `requested end`)
            {
                return;
            }
            if (StopReason === `time`)
            {
                message.channel.send(`Bruh no. I've been waiting for \`30\` seconds. I'm not a waitor.`);
            }
            if (quest != undefined)
            {
                StartQuest(message, Quests, vars, quest);
                db.run(`UPDATE data SET last_quested = ? WHERE id = ?`, [Math.round(new Date().getTime() / 1000), id]);
            }
        });

    }
}
function StartQuest(message, Quests, vars, quest)
{
    var WaitTime = Quests[quest]['wait time'];
    const filter = m => m.author.id === message.author.id;
    var db = vars['db'];
    var id = vars['id'];
    var balance = vars['balance'];
    var StopReason = `time`;
    var time = Math.round(new Date().getTime() / 1000);
    var start_time = Math.round(new Date().getTime() / 1000);
    var won_game = false;
    var end_message = ``;
    var reward = Quests[quest]['reward'];
    const collector = message.channel.createMessageCollector(filter, { time: WaitTime * 1000 });
    switch (quest)
    {
        case 'punch an elderly person':
            won_game = true;
            StopReason = ``;
            end_message = `Wow, you really are a piece of shit.\nYou really thought i was going to give you \`${funcs.ConvertToUnit(Math.abs(Quests[quest]['reward']), `K M B`)}\` milkesh for punching an elderly???\nGo jump off a bridge.`;
            break;
        case 'higher lower game':
            var number = funcs.RandomInt(1, 10000);
            message.channel.send(`I just thought of a natural number from \`1 - 10,000\`.\nIf you guess a number higher than mine, i'll say lower.\nIf you guess a number lower than mine, i'll say higher.\n\nYou have \`${WaitTime}\` seconds to guess what it is.`);
            collector.on('collect', m =>
            {
                m.content = m.content.toLowerCase();
                if (m.content.substring(0, 1) === 'x')
                {
                    StopReason = `requested end`;
                    collector.stop();
                    return;
                }
                time = Math.round(new Date().getTime() / 1000);
                var guess = Number(m.content);
                if (isNaN(guess))
                {
                    message.channel.send(`I said number`);
                    return;
                }
                if (Math.floor(guess) < guess)
                {
                    message.channel.send(`I said natural`);
                    return;
                }
                if (guess === number)
                {
                    end_message = `***CORRECT!***`;
                    won_game = true;
                    StopReason = ``;
                    collector.stop();
                    return;
                }
                if (guess > number)
                {
                    message.channel.send(`Lower`);
                }
                else
                {
                    message.channel.send(`Higher`);
                }
            });
            break;
        case 'find the button':
            message.channel.send(`Move with \`WASD\` search with \`Q\``);
            var MapDetails =
            {
                'width': funcs.RandomInt(10, 15),
                'height': funcs.RandomInt(10, 15),
                'background': `⬛`,
                'perimeter': null,
                'band colour': ``,
                'player': `😑`,
                'decorations':
                    [
                        `🏺`, `⚱️`,
                        `🌲`, `🎄`,
                        `🍋`, `🍐`,
                        `⭐`, `🌟`,
                        `💿`, `📀`
                    ],
            };
            const Colours =
                [
                    `⬜`, `0xe6e7e8`,
                    `🟦`, `0x55acee`,
                    `🟥`, `0xdd2e44`,
                    `🟩`, `0x78b159`,
                    `🟧`, `0xffac33`,
                    `🟨`, `0xfdcb58`,
                    `🟪`, `0xaa8ed6`,
                    `🟫`, `0xc1694f`,
                ];
            var colour_picked = funcs.RandomInt(0, (Colours.length / 2)) * 2;
            var band_colour = Colours[colour_picked + 1];
            MapDetails['perimeter'] = Colours[colour_picked];
            var player_pos = [Math.floor(MapDetails['height'] / 2), Math.floor(MapDetails['width'] / 2)];
            var MapData = GenerateMap(MapDetails);
            var map = MapData[0];
            var DecorationMap = MapData[1];
            var DecorationStates = MapData[2];
            var Displaydata = GenerateString(MapDetails, map, player_pos);
            var map_string = Displaydata[0];
            var currently_on_cell = Displaydata[1];
            var has_found_button = false;
            var button_decoration = null;
            var searches_left = 3;
            var grid_area = Math.floor(MapDetails['height'] - 2) * (MapDetails['width'] - 2);
            var moves_left = 0;
            var count = 1;
            while (grid_area > 0)
            {
                count += 0.5;
                grid_area -= count;
                moves_left++;
            }
            moves_left = Math.floor(moves_left);

            funcs.Say(message, `FIND MY BUTTON`, `You have: \`${funcs.SecToHMS(WaitTime)}\`, \`${searches_left}\` searches and \`${moves_left}\` moves\nCurrently on cell: ${currently_on_cell}\n` + map_string, band_colour, true);
            collector.on('collect', m =>
            {
                m.content = m.content.toLowerCase();
                if (m.content.substring(0, 1) === 'x')
                {
                    StopReason = `requested end`;
                    collector.stop();
                    return;
                }
                time = Math.round(new Date().getTime() / 1000);
                var Updates = UpdateMap(message, MapDetails, map, m.content.substring(0, 1), player_pos, DecorationStates, DecorationMap, button_decoration);
                if (Updates != null)
                {
                    map = Updates[0];
                    player_pos = Updates[1];
                    DecorationStates = Updates[2];
                    has_found_button = Updates[3];
                    button_decoration = Updates[4];
                    if (Updates[5])
                    {
                        searches_left--;
                    }
                    else
                    {
                        moves_left--;
                    }
                    if (searches_left === 0 && has_found_button === false)
                    {
                        StopReason = `searches`;
                        won_game = false;
                        collector.stop();
                        return;
                    }
                    if (moves_left === 0 && has_found_button === false)
                    {
                        StopReason = `moves`;
                        won_game = false;
                        collector.stop();
                        return;
                    }
                    if (has_found_button === false)
                    {
                        Displaydata = GenerateString(MapDetails, map, player_pos);
                        map_string = Displaydata[0];
                        currently_on_cell = Displaydata[1];
                        funcs.Say(message, `FIND MY BUTTON`, `Time left: \`${funcs.SecToHMS(WaitTime - (time - start_time))}\`\nSearches left: \`${searches_left}\`\nMoves left: \`${moves_left}\`\nCurrently on cell: ${currently_on_cell}\n` + map_string, band_colour, true);
                    }
                    else
                    {
                        end_message = `Thank you for finding my button. :smile:\nI will be eternally grateful`;
                        StopReason = ``;
                        won_game = true;
                        collector.stop();
                        return;
                    }

                }
            });
            break;
    }
    collector.on('end', collected =>
    {
        if (StopReason === `requested end`)
        {
            message.channel.send(`Quitter.`);
            return;
        }
        if (StopReason === `time` && WaitTime > 0)
        {
            message.channel.send(`Time's up! You had \`${funcs.SecToHMS(WaitTime - (time - start_time))}\` left but you screwed it up.`);
            return;
        }
        if (StopReason === `searches`)
        {
            message.channel.send(`Bruh, you ran out of searches.\nBetter luck next time ¯\\_(ツ)_/¯`);
            return;
        }
        if (StopReason === `moves`)
        {
            message.channel.send(`Bruh, you ran out of moves.\nBetter luck next time ¯\\_(ツ)_/¯`);
            return;
        }
        if (won_game === false)
        {
            return;
        }
        var lost_or_gained = ``;
        if (reward > 0)
        {
            lost_or_gained = `gained`;
        }
        else
        {
            lost_or_gained = `lost`;
        }
        var time_info = ``;
        if (time > 0)
        {
            time_info = `You had \`${funcs.SecToHMS(WaitTime - (time - start_time))}\` left\n`;
        }
        message.channel.send(`${end_message}\n\n${time_info}You ${lost_or_gained} \`${funcs.ConvertToUnit(reward, `K M B`)}\`\nYou now have \`${funcs.ConvertToUnit(balance + reward, `K M B`)}\``);
        db.run(`UPDATE data SET balance = ? WHERE id = ?`, [balance + reward, id]);
    });
}
function UpdateMap(message, MapDetails, map, action, player_pos, DecorationStates, DecorationMap, button_decoration)
{
    var is_valid = false;
    var is_searching = false;
    var has_found_button = false;
    switch (action)
    {
        case 'w':
            is_valid = true;
            player_pos[0] = Math.max(1, player_pos[0] - 1);
            break;
        case 'a':
            is_valid = true;
            player_pos[1] = Math.max(1, player_pos[1] - 1);
            break;
        case 's':
            is_valid = true;
            player_pos[0] = Math.min(MapDetails['height'] - 2, player_pos[0] + 1);
            break;
        case 'd':
            is_valid = true;
            player_pos[1] = Math.min(MapDetails['width'] - 2, player_pos[1] + 1);
            break;
        case 'q':
            is_valid = true;
            is_searching = true;
            break;
    }
    if (is_valid === false)
    {
        message.channel.send(`You can only use \`WASD\` and \`Q\``);
        return null;
    }
    var current_decoration = -1;
    if (button_decoration != null)
    {
        map[button_decoration[0]][button_decoration[1]] = MapDetails['decorations'][button_decoration[2]];
    }
    for (var count = 0; count < DecorationStates.length; count++)
    {
        var state = DecorationStates[count];
        var decoration = DecorationMap[count];
        if (state > 0)
        {
            DecorationStates[count]--;
        }
        else
        {
            map[decoration[0]][decoration[1]] = MapDetails['decorations'][decoration[2] + 1];
            button_decoration = decoration;
            DecorationStates[count] = DecorationStates.length - 1;
        }
    }
    if (is_searching)
    {
        for (var count = 0; count < DecorationStates.length; count++)
        {
            if (DecorationStates[count] === DecorationStates.length - 2)
            {
                current_decoration = count;
            }
        }
        var old_button_decoration = DecorationMap[current_decoration];
        if (player_pos[0] === old_button_decoration[0] && player_pos[1] === old_button_decoration[1])
        {
            has_found_button = true;
        }
    }
    return [map, player_pos, DecorationStates, has_found_button, button_decoration, is_searching];
}
function GenerateMap(MapDetails)
{
    var map = [];
    var DecorationMap = GenerateDecorations(MapDetails);
    var DecorationStates = [];
    var current_decoration = 0;
    for (var count = 0; count < DecorationMap.length; count++)
    {
        DecorationStates.push(count);
    }
    for (var count = 0; count < MapDetails['height']; count++)
    {
        var row = [];
        for (var scount = 0; scount < MapDetails['width']; scount++)
        {
            var char = '';
            var decoration = null;
            if (current_decoration < DecorationMap.length)
            {
                decoration = DecorationMap[current_decoration];
            }
            if (count === 0 || count === MapDetails['height'] - 1 || scount === 0 || scount === MapDetails['width'] - 1)
            {
                char = MapDetails['perimeter'];
            }
            else if (decoration != null)
            {
                if (count === decoration[0] && scount === decoration[1])
                {
                    char = MapDetails['decorations'][decoration[2]];
                    current_decoration += 1;
                }
                else
                {
                    char = MapDetails['background'];
                }
            }
            else
            {
                char = MapDetails['background'];
            }
            row.push(char);
        }
        map.push(row);
        row = [];
    }
    DecorationStates = funcs.GetRandomFromArray(DecorationStates, DecorationStates.length);
    return [map, DecorationMap, DecorationStates];
}
function GenerateString(MapDetails, map, player_pos)
{
    var map_string = ``;
    var currently_on_cell;
    for (var count = 0; count < map.length; count++)
    {
        for (var scount = 0; scount < map[count].length; scount++)
        {
            if (count === player_pos[0] && scount === player_pos[1])
            {
                map_string += MapDetails['player'];
                currently_on_cell = map[count][scount];
            }
            else
            {
                map_string += map[count][scount];
            }

        }
        map_string += `\n`;
    }
    return [map_string, currently_on_cell];
}
function GenerateDecorations(MapDetails)
{
    var DecorationMap = [];
    var decoration_amount = 2 + Math.floor(((MapDetails['width'] - 2) * (MapDetails['height']) - 2) / 7);
    var Positions = [];
    for (var count = 1; count < MapDetails['height'] - 1; count++)
    {
        for (var scount = 1; scount < MapDetails['width'] - 1; scount++)
        {
            Positions.push([count, scount, funcs.RandomInt(0, (MapDetails['decorations'].length / 2)) * 2]);
        }
    }
    DecorationMap = funcs.GetRandomFromArray(Positions, decoration_amount);
    var is_sorted = false;
    var num1 = 0;
    var num2 = 0;
    var num3 = 0;
    var num4 = 0;
    var decor1 = [];
    var decor2 = [];
    while (is_sorted === false)
    {
        is_sorted = true;
        for (var count = 0; count < DecorationMap.length - 1; count++)
        {
            num1 = DecorationMap[count + 1][0];
            num2 = DecorationMap[count][0];
            decor1 = DecorationMap[count + 1];
            decor2 = DecorationMap[count];
            if (num1 < num2)
            {
                DecorationMap[count] = decor1;
                DecorationMap[count + 1] = decor2;
                is_sorted = false;
            }
        }
    }
    is_sorted = false;
    while (is_sorted === false)
    {
        is_sorted = true;
        for (var count = 0; count < DecorationMap.length - 1; count++)
        {
            num1 = DecorationMap[count + 1][0];
            num2 = DecorationMap[count][0];
            num3 = DecorationMap[count + 1][1];
            num4 = DecorationMap[count][1];
            decor1 = DecorationMap[count + 1];
            decor2 = DecorationMap[count];
            if (num3 < num4 && num1 === num2)
            {
                DecorationMap[count] = decor1;
                DecorationMap[count + 1] = decor2;
                is_sorted = false;
            }
        }
    }
    return DecorationMap;
}