const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'report',
    description: "reports people for dumping",
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
            funcs.Say(message, `Report command`, `**Syntax**: report + @person or name or nickname\n**Description**: The report command looks at the target person, if they have dumped in the past and have not been punished for it, they will get a fine of 20% of their net worth and the person reporting will take 75% of that fine, if the target person has already been punished for their dumping or they haven't dumped, the person reporting them will get a fine of 25% of their net worth.`);
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
            else if (PeopleWithRequestedUsername.size === 0)
            {
                message.channel.send(`Nobody in this server is called \`${PersonName}\``);
            }
            else
            {
                PeopleWithRequestedUsername.forEach(PersonWithRequestedName =>
                {
                    funcs.ReportMember(message.member, PersonWithRequestedName)
                });
            }
        });
    }
}