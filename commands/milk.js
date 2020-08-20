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
        if (cow === 0)
        {
            message.channel.send(`You don't have any cows to milk`);
            return;
        }
        var milk_time = Math.min(time - last_milked, 10000);
        var MilkAddition = cow * (milk_time) / 100;
        var FeedAddition = Math.min(MilkAddition, animal_feed);
        var starting_feed_addition = FeedAddition;
        if (funcs.GetUpgrade(1) === 1)
        {
            FeedAddition = FeedAddition * 2;
        }
        MilkAddition = MilkAddition + FeedAddition;
        var FeedInfo1 = ``;
        var FeedInfo2 = ``;
        if (FeedAddition > 0)
        {
            FeedInfo1 = ` (\`${funcs.ConvertToUnit(FeedAddition, `K M B`)} extra\`)\n\`used: ${funcs.ConvertToUnit(starting_feed_addition, `K M B`)}\` animal feed`;
            FeedInfo2 = `\n\`total: ${funcs.ConvertToUnit(animal_feed - starting_feed_addition, `K M B`)}\` animal feed`;
        }
        message.channel.send(`\`got: ${funcs.ConvertToUnit(MilkAddition, `K M B`)}\` milk${FeedInfo1}\n\`total: ${funcs.ConvertToUnit(milk + MilkAddition, `K M B`)}\` milk${FeedInfo2}`);
        db.run(`UPDATE data SET milk = ?, last_milked = ?, animal_feed = ? WHERE id = ?`, [(milk + MilkAddition).toFixed(2), time, animal_feed - starting_feed_addition, id]);
    }
}