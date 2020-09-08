const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'deport',
    description: "deports people",
    execute(vars)
    {
        if (vars['is dm']) 
        {
            vars['message'].channel.send(`❌ This command cannot be used in dms as it relies on being in a guild to function ❌`);
            return;
        }
        var args = vars['args'];
        var message = vars['message'];
        var db = vars['db'];
        var balance = vars['balance'];
        var id = vars['id'];
        if (args.length === 1)
        {
            funcs.Say(message, `Deport command`, `**Syntax**: deport + @person or name or nickname\n**Description**: The deport command adds the role 'deported' to the target, and adds 1 milkesh to the sender's balance while showing an amazing image and thank the person using it`);
        }
        if (args[1] === 'myself' || args[1] === 'mysel' || args[1] === 'myse' || args[1] === 'mys' || args[1] === 'my' || args[1] === 'm')
        {
            funcs.AddRole(message, message.member, 'deported', db, balance, id);
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
                        funcs.AddRole(message, PersonWithRequestedName, 'deported', db, balance, id);
                    });
                }
            });
        }
    }
}