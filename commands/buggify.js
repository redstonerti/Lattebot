const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'buggify',
    description: "Writes down suggestions from users",
    execute(vars)
    {
        var message = vars['message'];
        var db = vars['db'];
        var name = message.author.tag;
        var suggestion = message.content.toString().substring(vars['command length'] + 2);
        if (suggestion.length < 30)
        {
            message.channel.send(`Please don't waste my creator's time and explain with more detail.\nUse at least \`30\` characters.\nYou only used \`${suggestion.length}\` this time.`);
            return;
        }
        let InsertData = db.prepare(`INSERT INTO bugs VALUES(?,?)`);
        InsertData.run(name, suggestion);
        InsertData.finalize();
        db.close();
        message.channel.send(`${message.author.username}, your bug was submitted successfully!\nThere's a good chance that my creator will fix it too.`)
    }
}