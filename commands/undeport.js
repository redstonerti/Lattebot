const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'undeport',
    description: "undeports people",
    execute(vars)
    {
        var message = vars['message'];
        var args = vars['args'];
        var db = vars['db'];
        var balance = vars['balance'];
        var id = vars['id'];
        if (args.length === 1)
        {
            funcs.Say(message, `Undeport command`, `**Syntax**: undeport + @person or name or nickname\n**Description**: The undeport command does the opposite of the deport command. It removes the role 'deported' from the target, and removes 1 milkesh from the sender's balance while showing an equally amazing image and scolding at the person using it`);
            return;
        }
        if (args[1] == "myself")
        {
            funcs.RemoveRole(message, message.member, 'deported', db, balance, id);
        }
        else
        {
            var PersonName = message.content.toString().substring(vars['command length'] + 2).toLowerCase();
            var UserData = funcs.HasTag(PersonName);
            var tag = UserData[0];
            var PersonName = UserData[1].toString();
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
                    message.channel.send('There are two people with this name, in this case please add their tag to the end of their name (with no space before it) when using this command ;)');
                }
                else
                {
                    PeopleWithRequestedUsername.forEach(PersonWithRequestedName =>
                    {
                        funcs.RemoveRole(message, PersonWithRequestedName, 'deported', db, balance, id);
                    });
                }
            });
        }
    }
}