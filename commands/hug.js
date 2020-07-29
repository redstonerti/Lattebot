const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'hug',
    description: "hugs someone",
    execute(vars)
    {
        var message = vars['message'];
        var args = vars['args'];
        if (args.length === 1)
        {
            funcs.Say(message, `Hug command`, `**Syntax**: hug + @person or name or nickname\n**Description**: Hug someone!`);
            return;
        }
        if (args[1] === "myself")
        {
            message.channel.send(`Wow, what a disgrace to humankind. You can't even find ONE person that would hug you so you lowered yourself to hugging *yourself*. Jk love yourself!`);
        }
        else
        {
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
                            (member.user.tag.toString() === PersonName && member.user.discriminator.toString() === tag));
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
                        if (PersonWithRequestedName == message.member)
                        {
                            message.channel.send(`Wow, what a disgrace to humankind. You can't even find ONE person that would hug them so you lowered yourself to hugging *yourself*. Jk love yourself!`);
                        }
                        else if (PersonWithRequestedName.user.username === 'Tester bot' || PersonWithRequestedName.user.username === 'Lattebot')
                        {
                            message.channel.send(`\`${message.member.user.username}\` ` + ' ❤️ (\\*\\´ω\\`)人(\\´ω\\`\\*) ❤️ ' + ` \`${PersonWithRequestedName.user.username}\`\n\n❤️ You really did that for me? ❤️ \`*sob*\` i've never \`*sob*\` been loved before, thank you ${message.member.user.username}\n\`*cries in javascript*\``);
                        }
                        else
                        {
                            message.channel.send(`\`${message.member.user.username}\` ` + ' ❤️ (\\*\\´ω\\`)人(\\´ω\\`\\*) ❤️ ' + ` \`${PersonWithRequestedName.user.username}\``);
                        }

                    });
                }
            });
        }
    }
}