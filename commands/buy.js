const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'buy',
    description: "Allows you to buy things",
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
        var corn_storage = vars['corn storage'];
        var planted_farm = vars['planted farm'];
        var seed_storage = vars['seed storage'];
        var last_milked = vars['last milked'];
        var last_harvested = vars['last harvested'];
        var milk_storage = vars['milk storage'];
        var ItemNames = vars['ItemNames'];
        var land = vars['land'];
        var planted_farm = vars['planted farm'];
        var Items = vars['Items'];
        var CowMax = land * 5;
        var upgrades = vars['upgrades'];
        var seed = vars['seed'];
        var corn = vars['corn'];
        var ItemStuff = funcs.GetItem();
        var MyTier = funcs.GetUpgrade(0);
        if (ItemStuff === null)
        {
            return;
        }
        item = ItemStuff[0].toString();
        var ItemTier = Items[item]['tier'];
        var NumberInList = ItemStuff[2];
        var IsMax = ItemStuff[3];
        var BuyPrice = Items[item]['buy price'];
        var amount = 0;
        if (IsMax === true)
        {
            amount = Math.floor(balance / BuyPrice);
        }
        else
        {
            amount = ItemStuff[1];
        }
        if (args.length === 1)
        {
            funcs.Say(message, `Buy command`, `**Syntax**: buy + amount + item\n**Description**: The buy command lets you buy things from the shop with milkesh`);
            return;
        }
        if (Items[item]['buy price'] === null)
        {
            message.channel.send(`Bruh you can't buy that item`);
            return;
        }
        if (MyTier < ItemTier)
        {
            message.channel.send(`Lol u thought u could buy something that isn't at ur tier yet :rofl:\nThat item is at tier \`${ItemTier}\` but u are only tier \`${MyTier}\``);
            return;
        }
        if (item === `cow`)
        {
            amount = Math.floor(amount);
            if (cow >= CowMax)
            {
                message.channel.send(`You already have the max amount of cows(${CowMax})`);
                return;
            }
        }
        else if (item === `land`)
        {
            amount = Math.floor(amount);
            if (land >= 200)
            {
                message.channel.send(`You already have the max amount of land(200)`);
                return;
            }
        }
        if (amount < 0)
        {
            message.channel.send(`You can't fool me`);
            return;
        }
        if (balance < BuyPrice)
        {
            message.channel.send(`You don't have enough money for 1 ${item}. It costs: \`${BuyPrice}\` milkesh and you only have \`${balance}\` milkesh`);
            return;
        }
        var CurrentItemAmount = Number(vars[item.toString()]);
        var IsAtCap = ``;
        if (amount + CurrentItemAmount > CowMax && item === `cow`)
        {
            amount = Math.min(CowMax - CurrentItemAmount, Math.floor(balance / BuyPrice));
            IsAtCap = `\nYou're now at the max!`;
        }
        else if (amount + CurrentItemAmount > 200 && item === `land`)
        {
            amount = Math.min(200 - CurrentItemAmount, Math.floor(balance / BuyPrice));
            IsAtCap = `\nYou're now at the max!`;
        }
        var total = BuyPrice * amount;
        if (total > balance)
        {
            amount = Math.floor(balance / BuyPrice);
            total = BuyPrice * amount;
            message.channel.send(`You don't even have enough money, but that's alright, i bought you \`${funcs.ConvertToUnit(amount, `K M B`)} ${item}\` for \`${funcs.ConvertToUnit(total, `K M B`)}\` milkesh\nYou now have \`${funcs.ConvertToUnit(balance - total, `K M B`)}\` milkesh` + IsAtCap);
        }
        else
        {
            total = BuyPrice * amount;
            message.channel.send(`You bought \`${funcs.ConvertToUnit(amount, `K M B`)} ${item}\` for \`${funcs.ConvertToUnit(total, `K M B`)}\` milkesh\nYou now have \`${funcs.ConvertToUnit(balance - total, `K M B`)}\` milkesh` + IsAtCap);
        }
        db.run(`UPDATE data SET ${item.replace(' ', '_')} = ? WHERE id = ?`, [(CurrentItemAmount + amount).toFixed(2), id]);
        db.run(`UPDATE data SET balance = ? WHERE id = ?`, [(balance - total).toFixed(2), id]);
    }
}