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
        var ItemNames = vars['ItemNames'];
        var land = vars['land'];
        var Items = vars['Items'];
        var CowMax = land * 5;
        var ItemStuff = funcs.GetItem(message, args, ItemNames);
        if (ItemStuff === null)
        {
            return;
        }
        item = ItemStuff[0].toString();
        var NumberInList = ItemStuff[2];
        var IsMax = ItemStuff[3];
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
        var HasEnough = true;
        var CowDeletionAmount = 0;
        if (amount > CurrentItemAmount)
        {
            HasEnough = false;
            amount = CurrentItemAmount;
        }
        total = amount * SellPrice;
        var CowDeletion = ``;
        if (item === `land`)
        {
            if ((land - amount) * 5 < cow)
            {
                CowDeletionAmount = cow - (land - amount) * 5;
                CowDeletion = `\nBtw, because you sold too much land, you don't have enough space for \`${funcs.ConvertToUnit(CowDeletionAmount, `K M B`)}\` cows so i had to sell them.\nYou got \`${funcs.ConvertToUnit(CowDeletionAmount * 123, `K M B`)} milkesh\` for selling those cows`;
                db.run(`UPDATE data SET cow = ? WHERE id = ?`, [cow - CowDeletionAmount, id]);
                db.run(`UPDATE data SET balance = ? WHERE id = ?`, [(balance + CowDeletionAmount * 123).toFixed(2), id]);
            }
        }
        if (HasEnough == false)
        {
            message.channel.send(`You don't have enough \`${item}\`, but that's alright, i bought it all for \`${funcs.ConvertToUnit(total, `K M B`)}\` milkesh\nYou now have \`${funcs.ConvertToUnit(balance + CurrentItemAmount * SellPrice, `K M B`)}\` milkesh` + CowDeletion);
            db.run(`UPDATE data SET ${item.replace(' ', '_')} = ? WHERE id = ?`, [0, id]);

        }
        else
        {
            message.channel.send(`You sold \`${funcs.ConvertToUnit(amount, `K M B`)} ${item}\` for \`${funcs.ConvertToUnit(total, `K M B`)}\` milkesh\nYou now have \`${funcs.ConvertToUnit(balance + total, `K M B`)}\` milkesh` + CowDeletion);
            db.run(`UPDATE data SET ${item.replace(' ', '_')} = ? WHERE id = ?`, [CurrentItemAmount - amount, id]);
        }
        db.run(`UPDATE data SET balance = ? WHERE id = ?`, [(balance + total).toFixed(2), id]);
    }
}