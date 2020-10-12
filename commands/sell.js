const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'sell',
    description: "Allows you to sell things",
    execute(vars)
    {
        var message = vars['message'];
        var args = vars['args'];
        var db = vars['db'];
        var id = vars['id'];
        var time = vars['time'];
        var balance = vars['balance'];
        var milk = vars['milk'];
        var cow = vars['cow'];
        var last_milked = vars['last milked'];
        var milk_storage = vars['milk storage'];
        var ice_cream = vars['ice cream'];
        var ItemNames = vars['ItemNames'];
        var land = vars['land'];
        var freezer = vars['freezer'];
        var Items = vars['Items'];
        var CowMax = land * 5;
        var ItemStuff = funcs.GetItem();
        if (ItemStuff === null)
        {
            return;
        }
        item = ItemStuff[0].toString();
        var IsMax = ItemStuff[2];
        var SellPrice = Items[item]['sell price'];
        var amount = 0;
        var CurrentItemAmount = Number(vars[item.toString()]);
        if (IsMax === true)
        {
            amount = CurrentItemAmount;
        }
        else
        {
            amount = ItemStuff[1];
        }
        if (args.length === 1)
        {
            funcs.Say(message, `Sell command`, `**Syntax**: sell + amount + item\n**Description**: The sell command lets you sell things from the shop with milkesh`);
            return;
        }
        if (amount < 0)
        {
            message.channel.send(`You can't fool me`);
            return;
        }
        if (Items[item]['sell price'] === null)
        {
            message.channel.send(`Bruh you can't sell that item`);
            return;
        }
        if (item === `cow`)
        {
            amount = Math.floor(amount);
        }
        if (CurrentItemAmount <= 0)
        {
            message.channel.send(`You don't have any ${item}`);
            return;
        }
        if (amount > CurrentItemAmount)
        {
            HasEnough = false;
            amount = CurrentItemAmount;
        }
        var HasEnough = true;
        var CowDeletionAmount = 0;
        var IceCreamDeletionAmount = 0;
        total = amount * SellPrice;
        var CowDeletion = ``;
        var IceCreamDeletion = ``;
        if (item === `land`)
        {
            if ((land - amount) * 5 < cow)
            {
                CowDeletionAmount = cow - (land - amount) * 5;
                CowDeletion = `\nBtw, because you sold too much land, you don't have enough space for \`${funcs.ConvertToUnit(CowDeletionAmount)}\` cows so i had to sell them.\nYou got \`${funcs.ConvertToUnit(CowDeletionAmount * 123)} milkesh\` for selling those cows`;
                db.run(`UPDATE data SET cow = ? WHERE id = ?`, [cow - CowDeletionAmount, id]);
                db.run(`UPDATE data SET balance = ? WHERE id = ?`, [(balance + CowDeletionAmount * 123).toFixed(2), id]);
            }
        }
        if (item === `freezer`)
        {
            if ((freezer - amount) * 1500 < ice_cream)
            {
                IceCreamDeletionAmount = ice_cream - (freezer - amount) * 1500;
                IceCreamDeletion = `\nBtw, because you sold too many freezers, you don't have enough space for \`${funcs.ConvertToUnit(IceCreamDeletionAmount)}\` ice cream so i had to sell it.\nYou got \`${funcs.ConvertToUnit(IceCreamDeletionAmount * 2.85)} milkesh\` for selling that ice cream`;
                db.run(`UPDATE data SET ice_cream = ? WHERE id = ?`, [ice_cream - IceCreamDeletionAmount, id]);
                db.run(`UPDATE data SET balance = ? WHERE id = ?`, [(balance + IceCreamDeletionAmount * 2.85).toFixed(2), id]);
            }
        }
        if (HasEnough == false)
        {
            message.channel.send(`You don't have enough \`${item}\`, but that's alright, i bought it all for \`${funcs.ConvertToUnit(total)}\` milkesh\nYou now have \`${funcs.ConvertToUnit(balance + CurrentItemAmount * SellPrice)}\` milkesh` + CowDeletion + IceCreamDeletion);
            db.run(`UPDATE data SET ${item.replace(' ', '_')} = ? WHERE id = ?`, [0, id]);
        }
        else
        {
            message.channel.send(`You sold \`${funcs.ConvertToUnit(amount)} ${item}\` for \`${funcs.ConvertToUnit(total)}\` milkesh\nYou now have \`${funcs.ConvertToUnit(balance + total)}\` milkesh` + CowDeletion + IceCreamDeletion);
            db.run(`UPDATE data SET ${item.replace(' ', '_')} = ? WHERE id = ?`, [CurrentItemAmount - amount, id]);
        }
        db.run(`UPDATE data SET balance = ? WHERE id = ?`, [(balance + total).toFixed(2), id]);
    }
}