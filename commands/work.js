const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'work',
    description: "Makes you work for Lattebot",
    execute(vars)
    {
        var message = vars['message'];
        var db = vars['db'];
        var last_worked = vars['last worked'];
        var time = vars['time'];
        var balance = vars['balance'];
        var work_times = vars['work times'];
        var id = vars['id'];
        if (last_worked === 0)
        {
            last_worked = time - 61;
        }
        if (time - last_worked < 60)
        {
            message.channel.send(`Look, i know you love me ${message.member.user.username} but don't be a workaholic. It's only been \`${time - last_worked}s\` since you last worked for me.`);
            return;
        }
        var reward = 0;
        reward = 40 + Math.min(Math.floor((work_times + 1) / 5) * 20, 380);
        var RankMessage = ``;
        if ((work_times + 1) % 5 === 0 && Math.floor((work_times + 1) / 5) * 20 < 380)
        {
            RankMessage = `\nBtw, you just upgraded your rank to level ${Math.floor((work_times + 1) / 5)}`;
        }
        message.channel.send(`Thank you for working for me ${message.member.user.username}. Here's \`${funcs.ConvertToUnit(reward, `K M B`)}\` milkesh for your efforts\nYou now have \`${funcs.ConvertToUnit(balance + reward, `K M B`)}\` milkesh` + RankMessage);
        db.run(`UPDATE data SET balance = ? WHERE id = ?`, [(balance + reward).toFixed(2), id]);
        db.run(`UPDATE data SET work_times = ? WHERE id = ?`, [work_times + 1, id]);
        db.run(`UPDATE data SET last_worked = ? WHERE id = ?`, [time, id]);
    }
}