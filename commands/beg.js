const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'beg',
    description: "Begs someone for money",
    execute(vars)
    {
        var message = vars['message'];
        var args = vars['args'];
        if (args.length === 1)
        {
            funcs.Say(message, `Beg command`, `**Syntax**: beg + person\n**Description**: The beg command begs the target for money`);
            return;
        }
        var PersonName = message.content.toString().substring(vars['command length'] + 2).toLowerCase();
        var UserData = funcs.HasTag(PersonName);
        var tag = UserData[0];
        var PersonName = UserData[1];
        message.guild.members.fetch().then(fetchedMembers =>
        {
            var PeopleWithRequestedUsername;
            fetchedMembers.forEach(member =>
            {
                if (tag == null)
                {
                    PeopleWithRequestedUsername = fetchedMembers.filter(member => member.user.username.toString().toLowerCase() === PersonName || member.displayName.toString().toLowerCase() === PersonName || member.user.id.toString() === funcs.GetId(PersonName));
                }
                else
                {
                    PeopleWithRequestedUsername = fetchedMembers.filter(member =>
                        (member.user.username.toString().toLowerCase() === PersonName && member.user.discriminator.toString() === tag) ||
                        (member.displayName.toString().toLowerCase() === PersonName && member.user.discriminator.toString() === tag) ||
                        (member.user.id.toString() === funcs.GetId(PersonName) && member.user.discriminator.toString() === tag));
                }
            });
            if (PeopleWithRequestedUsername.size > 1)
            {
                message.channel.send(`There are two people with this name, please add their tag to the end of their name (with no space before it) when using this command ;)`);
            }
            else
            {
                PeopleWithRequestedUsername.forEach(PersonWithRequestedName =>
                {
                    if (PersonWithRequestedName != message.member && PersonWithRequestedName.user.username != 'Tester bot' && PersonWithRequestedName.user.username != 'Lattebot')
                    {
                        message.channel.send(`${PersonWithRequestedName} please give ${message.member} some money`);
                    }
                    else if (PersonWithRequestedName.user.username === 'Tester bot')
                    {
                        message.channel.send(`Maybe... in another lifetime`);
                    }
                    else
                    {
                        message.channel.send(`Ur dumb`);
                    }

                });
            }
        });
    }
}