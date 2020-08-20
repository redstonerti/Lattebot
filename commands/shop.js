const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'shop',
    description: "Shows you all the available items for sale",
    execute(vars)
    {
        var message = vars['message'];
        var Items = vars['Items'];
        var ItemNames = vars['ItemNames'];
        var shop = `\n\n`
        var ItemCount = Object.keys(Items).length;
        var TierList = [[0]];
        var player_tier = vars['player tier'];
        var TierPrices = vars['TierPrices'];
        var db = vars['db'];
        var id = vars['id'];
        var args = vars['args'];
        var upgrades = vars['upgrades'];
        var ShopType = funcs.AutoFill(message, message.content.substring(vars['command length'] + 2), ['items', 'upgrades'], true);
        var Upgrades = vars['Upgrades'];
        var UpgradeNames = vars['UpgradeNames'];
        var UpgradeCount = Object.keys(Upgrades).length;
        var Strikethrough = ``;
        var MaxTier = 0;
        if (ShopType === null)
        {
            return null;
        }
        ShopType = ShopType[0].toString();
        if (ShopType != 'items' && ShopType != 'upgrades')
        {
            return null;
        }
        for (var count = 1; count <= player_tier + 1; count++)
        {
            TierList.push([count]);
        }
        if (ShopType === 'items')
        {
            for (var count = 0; count < ItemCount; count++)
            {
                var tier = Items[ItemNames[count]]['tier'];
                if (tier <= player_tier + 1)
                {
                    TierList[tier].push(ItemNames[count]);
                }
            }
        }
        else if (ShopType === 'upgrades')
        {
            for (var count = 0; count < UpgradeCount; count++)
            {
                var tier = Upgrades[UpgradeNames[count]]['tier'];
                if (tier <= player_tier + 1)
                {
                    TierList[tier].push(UpgradeNames[count]);
                }
            }
        }
        for (var count = 0; count < Object.keys(TierList).length; count++)
        {
            var BoughtOrPrice = ``;
            if (Object.keys(TierList[count]).length > 1)
            {
                if (player_tier >= count)
                {
                    BoughtOrPrice = `**PURCHASED ✅**`;
                }
                else
                {
                    BoughtOrPrice = `**Price: $${funcs.ConvertToUnit(Upgrades['tier']['prices'][count - 1], `K M B`)}**`;
                }
                shop = shop + `**TIER ${count}** | ${BoughtOrPrice}\n\n`;
            }
            if (count > player_tier && Object.keys(TierList[count]).length > 1)
            {
                shop = shop + `~~`;
                Strikethrough = `~~`;
            }
            for (var scount = 1; scount < Object.keys(TierList[count]).length; scount++)
            {
                var item;
                var upgrade;
                var UniqueAttribute = ``;
                var name = funcs.CapitalFirst(TierList[count][scount]);
                if (ShopType === 'items')
                {
                    item = Items[TierList[count][scount]];
                }
                else if (ShopType === 'upgrades')
                {
                    upgrade = Upgrades[TierList[count][scount]];
                }
                if (ShopType === 'items')
                {
                    if (item['unique attribute'] != '')
                    {
                        UniqueAttribute = `, \`${item['unique attribute']}\``;
                    }
                }
                if (ShopType === 'items')
                {
                    var BuyInfo = ``;
                    var SellInfo = ``;
                    if (item['buy price'] != null)
                    {
                        BuyInfo = ` \`Buy: ${funcs.ConvertToUnit(item['buy price'], `K M B`)}\``;
                    }
                    if (item['sell price'] != null)
                    {
                        SellInfo = ` \`Sell: ${funcs.ConvertToUnit(item['sell price'], `K M B`)}\``;
                    }
                    if (BuyInfo != `` && SellInfo != ``)
                    {
                        BuyInfo += `,`;
                    }
                    shop = shop + `${item['emoji']} ${name} |${BuyInfo}${SellInfo}${UniqueAttribute}\n\n`;
                }
                else if (ShopType === 'upgrades')
                {
                    var CurrentLevel = funcs.GetUpgrade(upgrade['slot']);
                    var Prices = upgrade['prices'];
                    var PriceOrCompleted = ``;
                    if (CurrentLevel < Prices.length)
                    {
                        PriceOrCompleted = `\`Price: ${funcs.ConvertToUnit(Prices[CurrentLevel], `K M B`)}\``;
                    }
                    else
                    {
                        PriceOrCompleted = `***COMPLETED***`;
                    }
                    shop = shop + `${upgrade['emoji']} ${name} | ${PriceOrCompleted}\nCurrent level: \`${CurrentLevel} of ${Prices.length}\`\n${upgrade['description']}\n\n`;
                }
            }
        }
        shop = shop.substring(0, shop.length - 1) + Strikethrough;
        funcs.Say(message, `${funcs.CapitalFirst(ShopType)} Shop`, shop);
    }
}