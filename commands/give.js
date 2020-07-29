const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'give',
    description: "You can give someone something",
    execute(vars)
    {
        var message = vars['message'];
        var args = vars['args'];
        var db = vars['db'];
        var id = vars['id'];
        var balance = vars['balance'];
        if (args.length === 1)
        {
            funcs.Say(message, `Give command`, `**Syntax**: give + @person or name or nickname + amount + item type(optional)\n**Description**: The give command transfers the amount and type of items specified from the sender to the target. If no item type is given, it will default to Milkesh`);
            return;
        }
        var CommandStuff = funcs.GetName(args);
        var PersonName = CommandStuff[0];
        var AmountToTransfer = Number(CommandStuff[1]);
        var ItemType = CommandStuff[2];
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
                        (member.user.id.toString() === PersonName.substring(3, 21) && member.user.discriminator.toString() === tag));
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
                    if (PersonWithRequestedName === message.member)
                    {
                        message.channel.send(`${message.member.user.username} you're dumb`);
                        return;
                    }
                    else if (PersonWithRequestedName.user.username === 'Tester bot' || PersonWithRequestedName.user.username === 'Lattebot')
                    {
                        message.channel.send(`I don't need your poor infested ${ItemType}`);
                        return;
                    }
                    if (balance >= AmountToTransfer && AmountToTransfer >= 0)
                    {
                        let query = `SELECT * FROM data WHERE id = ?`;
                        db.get(query, [PersonWithRequestedName.id], (err, row) =>
                        {
                            if (err)
                            {
                                console.log(err);
                                return;
                            }
                            if (row === undefined)
                            {
                                console.log(`row was undefined`);
                                let InsertData = db.prepare(`INSERT INTO data VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
                                InsertData.run(PersonWithRequestedName.id, PersonWithRequestedName.user.tag, (AmountToTransfer).toFixed(2),/*milk*/ 0,/*cow*/ 0,/*last_milked*/ 0,/*milk_storage*/ 0,/*last_worked*/ 0,/*work_times*/ 0,/*land*/ 40,/*pasteurizerr*/0,/*battery*/0,/*watts*/ 0,/*solar_panel*/ 0,/*wind_turbine*/ 0,/*last_powered*/ 0,/*clean_milk*/ 0,/*animal_feed*/ 0,/*upgrades*/'0 0 0',/*seed*/0,/*corn*/0,/*farm*/0,/*grainery*/0,/*last_harvested*/0,/*corn_storage*/0,/*planted_farm*/0,/*seed_storage*/0);
                                InsertData.finalize();
                                db.close();
                                db.run(`UPDATE data SET balance = ? WHERE id = ?`, [(balance - AmountToTransfer).toFixed(2), id]);
                                message.channel.send(`${message.member.user.username} now has \`${funcs.ConvertToUnit(balance - AmountToTransfer, `K M B`)} ${ItemType}\`\n${PersonWithRequestedName.user.username} now has \`${funcs.ConvertToUnit(row.balance + AmountToTransfer, `K M B`)} ${ItemType}\``);
                                return;
                            }
                            else
                            {
                                db.run(`UPDATE data SET balance = ? WHERE id = ?`, [(balance - AmountToTransfer).toFixed(2), id]);
                                db.run(`UPDATE data SET balance = ? WHERE id = ?`, [(row.balance + AmountToTransfer).toFixed(2), PersonWithRequestedName.id]);
                                message.channel.send(`${message.member.user.username} now has \`${funcs.ConvertToUnit(balance - AmountToTransfer, `K M B`)} ${ItemType}\`\n${PersonWithRequestedName.user.username} now has \`${funcs.ConvertToUnit(row.balance + AmountToTransfer, `K M B`)} ${ItemType}\``);
                            }
                        });
                    }
                    else
                    {
                        if (AmountToTransfer > 0)
                        {
                            message.channel.send(`${message.member.user.username} you don't have enough money`);
                        }
                        else
                        {
                            message.channel.send(`${message.member.user.username} you can't fool me`);
                        }
                    }
                });
            }
        });
    }
}