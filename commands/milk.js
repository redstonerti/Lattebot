const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'milk',
    description: "milks your cows",
    execute(vars)
    {
        var message = vars['message'];
        var id = vars['id'];
        var db = vars['db'];
        var cow = vars['cow'];
        var milk = vars['milk'];
        var time = vars['time'];
        var last_milked = vars['last milked'];
        var animal_feed = vars['animal feed'];
        var waste_deficiency = funcs.GetWasteDeficiency();
        if (cow === 0)
        {
            message.channel.send(`You don't have any cows to milk`);
            return;
        }
        var milk_time = Math.min(time - last_milked, 10000);
        var MilkAddition = cow * (milk_time) / 100;
        MilkAddition = MilkAddition - MilkAddition * waste_deficiency / 100;
        var FeedAddition = Math.min(MilkAddition, animal_feed);
        var starting_feed_addition = FeedAddition;
        if (funcs.GetUpgrade(1) === 1)
        {
            FeedAddition = FeedAddition * 2;
        }
        MilkAddition = MilkAddition + FeedAddition;
        var FeedInfo1 = ``;
        var FeedInfo2 = ``;
        var WasteInfo = ``;
        if (FeedAddition > 0)
        {
            FeedInfo1 = ` (\`${funcs.ConvertToUnit(FeedAddition)} extra\`)\n\`used: ${funcs.ConvertToUnit(starting_feed_addition)}\` animal feed`;
            FeedInfo2 = `\n\`total: ${funcs.ConvertToUnit(animal_feed - starting_feed_addition)}\` animal feed`;
        }
        if (waste_deficiency > 0)
        {
            WasteInfo = `\n\`-${waste_deficiency}%\` from waste`;
        }
        message.channel.send(`\`got: ${funcs.ConvertToUnit(MilkAddition)}\` milk${FeedInfo1}\n\`total: ${funcs.ConvertToUnit(milk + MilkAddition)}\` milk${FeedInfo2}${WasteInfo}`);
        db.run(`UPDATE data SET milk = ?, last_milked = ?, animal_feed = ? WHERE id = ?`, [(milk + MilkAddition).toFixed(2), time, animal_feed - starting_feed_addition, id]);
    }
}