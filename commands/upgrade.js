const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'upgrade',
    description: "upgrades shit",
    execute(vars)
    {
        var message = vars['message'];
        var args = vars['args'];
        var db = vars['db'];
        var id = vars['id'];
        var balance = vars['balance'];
        var upgrades = vars['upgrades'];
        var player_tier = vars['player tier'];
        var UpgradeNames = vars['UpgradeNames'];
        var Upgrades = vars['Upgrades'];
        var upgrade_name = funcs.AutoFill(message, message.content.substring(vars['command length'] + 2), UpgradeNames, true);
        var MyTier = funcs.GetUpgrade(upgrades, 0, db, id);
        if (upgrade_name === null)
        {
            return null;
        }
        upgrade_name = upgrade_name[0].toString();
        var upgrade_tier = Upgrades[upgrade_name]['tier'];
        var upgrade = Upgrades[upgrade_name];
        var upgrade_max_level = upgrade['prices'].length;
        var upgrade_level = funcs.GetUpgrade(upgrades, upgrade['slot'], db, id);
        var current_upgrade_price = upgrade['prices'][upgrade_level];
        if (MyTier < upgrade_tier)
        {
            message.channel.send(`Lol u thought u could buy something that isn't at ur tier yet :rofl:\nThat upgrade is at tier \`${upgrade_tier}\` but u are only tier \`${MyTier}\``);
            return;
        }
        if (upgrade_level >= upgrade_max_level)
        {
            message.channel.send(`You have already completed this upgrade (\`max level: ${upgrade_max_level}\`) love ;)`);
            return;
        }
        if (balance >= current_upgrade_price)
        {
            message.channel.send(`You just upgraded ${upgrade_name} to \`${upgrade_level + 1}\`!\nYou spent \`${funcs.ConvertToUnit(current_upgrade_price, `K M B`)}\` milkesh\nYou now have \`${funcs.ConvertToUnit(balance - current_upgrade_price, `K M B`)}\` milkesh`);
            db.run(`UPDATE data SET balance = ?, upgrades = ? WHERE id = ?`, [balance - current_upgrade_price, funcs.GetUpgraded(upgrades, upgrade['slot'], 1), id]);
            return;
        }
        else
        {
            message.channel.send(`You don't have enough money for that hun :(\n${upgrade_name} level \`${upgrade_level + 1}\` costs \`${funcs.ConvertToUnit(current_upgrade_price, `K M B`)}\`\nbut you only have \`${funcs.ConvertToUnit(balance, `K M b`)}\``);
        }
    }
}