const { Client, MessageAttachment, MessageEmbed, version } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'help',
    description: "explains what the bot does",
    execute(vars)
    {
        var ItemNames = vars['ItemNames'];
        var QuestNames = vars['QuestNames'];
        var CommandList = vars['CommandList'];
        var prefix = vars['prefix'];
        const Info =
        {
            //Commands
            'version': `**Version: ${vars['version']}**
This is the biggest update in lattebot's history and i know i say that a lot but i... i might have an addiction now...
Bruh i just kept adding a punch of stuff, procrastinating and then adding a bunch more so now we have tier 3, which is over double the size of previous tiers and a lot more complicated

Also there is a new server setting now called 'welcoming' which can toggle on and off welcome messages.

I totally forgot all the stuff in this update because it's been a month in 'developement' but if you want to learn more about tier 3 i made a guide for it
just type ;help tier 3
Have fun!

:)`,
            'balance': `**Syntax:**
balance + (optional){ open / close + tier / category name / all }

**Description:**
Balance shows you stuff about you. What you own, how you rank against others or statistics.

You can open or close any category with the keywords open and close
just write ${prefix}balance open / close and then the thing you want to open / close

That could be one of three things. all, a number (it will act on the corresponding tier) or a category name

Of course all of this can be shortened. For example, \`${prefix}balance open 1\` -> \`${prefix}ba o 1\`
\`${prefix}balance close all\` -> \`${prefix}ba c a\`
\`${prefix}balance open leaderboard\` -> \`${prefix}ba o l\`
            `,
            'clear': `**Syntax:**
clear + number of messages 

**Description:**
Clears all vermin in a number of messages radius
`,
            'deport': `**Syntax:**
deport + @person or name or nickname

**Description:**
The deport command adds the role 'deported' to the target, and adds 10 milkesh to the sender's balance while showing an amazing image and thank the person using it
`,
            'undeport': `**Syntax:**
undeport + @person or name or nickname

**Description:**
The undeport command does the opposite of the deport command. It removes the role 'deported' from the target, and removes 10 milkesh from the sender's balance while showing an equally amazing image and scolding at the person using it
`,
            'hug': `**Syntax:**
hug + @person or name or nickname

**Description:**
Hug someone!
`,
            'give': `**Syntax:**
give + @person or name or nickname + amount + item type(optional)

**Description:**
The give command transfers the amount and type of items specified from the sender to the target. If no item type is given, it will default to Milkesh
`,
            'beg': `**Syntax:**
beg +  @person or name or nickname

**Description:**
The beg command begs the target for money
`,
            'shop': `**Syntax:**
shop + items or upgrades

**Description:**
The item shop displays all the items that are currently in the game and the upgrades shop displays all upgrades.
`,
            'buy': `**Syntax:**
buy + amount(optional) + item

**Description:**
The buy command lets you buy things from the shop with milkesh
`,
            'sell': `**Syntax:**
sell + amount(optional) item

**Description:**
The sell command lets you sell things from the shop with milkesh
`,
            'milk': `**Syntax:**
milk

**Description:**
When you use this command, you go to all your cows, squeeze their udders and collect their milk. Each cow  produces 0.01 milk/sec and each cow can store a maximum of 100L of milk.
`,
            'work': `**Syntax:**
work

**Description:**
Every time you work, you get milkesh. You start out with 40, and every 5 times you get a 20 milkesh raise. The maximum amount of money you can get is 400 / shift and you can work every 1 minute.
`,
            'clean': `**Syntax:**
clean

**Description:**
Uses 1000W and 100 milk / pasteurizer and creates 100 clean milk.
`,
            'upgrade': `**Syntax:**
upgrade + thing you want to upgrade

**Description:**
You can upgrade anything in the upgrades shop with this command
`,
            'leaderboard': `**Syntax:**
leaderboard + [amount (\`up to 20\`)] + [sorted thing]

**Description**: The leaderboard command shows you the players that have the highest or lowest of ANY value\n\n**Examples:** \`leaderboard 5 balance\` => \`${prefix}l 5 balance\`\n \`leaderboard 20 milk\` => \`l 20 m\`
`,
            'milk': `**Description:**
Milk is produced by cows and it can be either sold or turned into clean milk to be sold for more money.

**Lore:**
🥛Milk is a white, nutrient-rich liquid food produced in the mammary glands of mammals. It is the primary source of nutrition for infant mammals (including humans who are breastfed) before they are able to digest other types of food.
`,
            'churn': `**Syntax:**
\`${prefix}churn\`

**Description:**
Uses 1000W and 100 cream / churner and creates 100 butter and 30 waste as a by-product.
`,
            'creamify': `**Syntax:**
\`${prefix}creamify\`

**Description:**
Uses 1000W and 100 clean milk / centrifuge and creates 100 cream.
`,
            'crush': `**Syntax:**
\`${prefix}crush\`

**Description:**
Uses 1000W and 100 sugarcane / mill and creates 400 sugar.
`,
            'mix': `**Syntax:**
\`${prefix}mix\`

**Description:**
Uses 1250W, 100 cream and 400 sugar / mixer and creates 400 ice cream and 50 waste barrels.
`,
            'filter': `**Syntax:**
\`${prefix}filter\`

**Description:**
Uses 25KW / waste filter and destroys 10 waste barrels.
`,
            'dump': `**Syntax:**
\`${prefix}dump\`

**Description:**
Dumps all your waste barrels into the ocean. This is the easy way out of the waste problem but watch out, if someone cataches you, you will be heavily fined and they will be rewarded greatly.
`,
            'report': `**Syntax:**
\`${prefix}report + @person or name or nickname\`

**Description:**
If you see someone dumping their waste into the ocean, you can report them to receive a big reward and they will be heavily fined. If you falsely accuse someone, you will be fined instead.
`,
            'clean milk': `Clean milk is 3X more valuable than milk. You can make it with a pasteurizer.`,
            'cow': `Cows are the buidling blocks of your empire. Each cow produces 0.01 milk/sec and has a maximum capacity of 100L of milk. Every 5 cows you need to have one piece of land.`,
            'land': `Every piece of land can house 5 cows`,
            'pasteurizer': `Pasteurizers turn milk into clean milk. They convert 10W + 1 milk into 1 clean milk. Each pasteurizer has a maximum capacity of 100 milk to 100 clean milk. That means that in order to have maximum efficiency (to be able to clean every litre of milk with one command) you need 1 pasteurizer / cow`,
            'battery': `In order to use any machine, you will need to be able to store power. Each battery can store 1000W (1KW) of power.`,
            'solar panel': `Solar panels produce power (0.1W / sec).`,
            'wind turbine': `Wind turbines produce (0.03W / sec)`,
            'animal feed': `Animal feed increases your cow's output. Without it upgraded 50K milk + 25K animal feed = 75K milk collected from cows. With upgraded animal feeding it's 50K milk + 25K animal feed = 100K milk`,
            'corn': `Corn can be bought from the shop or produced by farms and it's use is to turn it into animal feed with a grinder`,
            'seed': `Seeds can be bought from the shop or produced by farms when you harvest corn or sugarcane and they're used to plant corn and sugarcane in farms. You get about 1.2 seeds / item that you harvest`,
            'grinder': `Grinders work in the exact same way as pasteurizers. They use 1000W to turn 100 corn into 100 animal feed`,
            'farm': `Farms produce corn or sugarcane and seeds. They need to be replanted every time you harvest them but they give you more 1.2x the seeds you used to plant them. You need 100 seeds to fully plant a farm. If you haven't waited until the full harvest, you can harvest and replant a part of your farms.`,
            'sugar': `Sugar is produced by mills converting sugarcane into sugar and is used to make ice cream in a mixer`,
            'sugarcane': `Sugarcane is produced by farms just like corn and is used to make sugar in a mill`,
            'ice cream': `Ice cream is the most profitable item in tier 3 assuring a profit of \`11.4 / raw milk\`. It is made in a mixer using sugar and cream and stored in a freezer`,
            'butter': `Butter assures a profit of \`4.76 / raw milk\`. It is made in a churner using cream`,
            'cream': `Cream is produced by centrifuges converting clean milk into cream and is used to make butter in a and ice cream in a mixer`,
            'mill': `Converts 100 sugarcane into 400 sugar using 1000W. \`${prefix}crush\` command`,
            'freezer': `Stores 1500 ice cream`,
            'waste filter': `Deletes 10 waste barrels using 25KW. \`${prefix}filter\` command\n\n(the liquid precessing upgrade reduces waste production by 75%)`,
            'centrifuge': `Converts 100 clean milk into 100 cream using 1000W. \`${prefix}creamify\` command`,
            'churner': `Converts 100 cream into 100 butter using 1000W and producing 30 waste barrels. \`${prefix}churn\` command`,
            'mixer': `Converts 100 cream and 400 sugar into 400 ice cream using 1250W and producing 50 waste barrels. \`${prefix}mix\` command`,
            'waste barrel': `Every time you have 1.5x more waste barrels as before, your cows produce 1% less milk. So at \`1.5^6\` (11.39) waste barrels you lose \`6%\` of your milk. You can remove waste barrels by either dumping them all into the ocean or actually filtering them with a waste filter. Careful though, if someone sees you and reports you for dumping, you will be fined and they will be rewarded.\n\n(the liquid precessing upgrade reduces waste production by 75%)`,
            'higher lower game': `Lattebot thinks of a natural number from 1 - 10000 and you have to guess it. He will help you by telling you if your guess was higher or lower than his number.`,
            'punch an elderly person': `Feeling vicious? Punch an elderly for a massive prize!`,
            'find the button': `You are an expressionless face on a grid. There are a few emojis in there too. Every time you move or search, one emoji will be active. In every game there is a different pattern of what emojis will be active. Your goal is to search an emoji while it's active.`,
            'starting guide':
                `
This is a game about making money primarily from cows. First, you need to work for Lattebot. He will give you 20 milkesh at the beginning but will give you a 10 milkesh raise every 5 times you work.

Once you get up to 130 milkesh, you can buy your first cow. It will start producing milk and you can get it with the ${prefix}milk command. You can also sell that milk to get milkesh. 

This is fine until you reach 200 cows. At that point you are going to need to buy more land. You start out with 40 land and each piece of land can house 5 cows.

After you reach the land cap too (200 land), you are going to want to start buying some pasteurizers and some power generation and storage.

Buy batteries to store your power and solar panels or wind turbines to produce it. You will need this power to pasteurize your milk with the ${prefix}clean command. You will use your pasteurizers to clean it and turn it into clean milk which is 3x more expensive (to sell)
-------------------------------------------------------
**\`TL;DR\`**
If no money and no cow, start with:
${prefix}work
Collect more until you can buy a cow :relaxed:
then
${prefix}milk to get milk
${prefix}sell milk to get more money $$$
and then you buy land
more cow
upgrade tier
buy solar
buy battery
buy pasteurizers
${prefix}clean milk`,
            'how to get a gf': `
Be a chad
...
or workout
...
or don't be me...
*sob*
you know, i once found this beatiful app written in ruby on rails, *sob* we went on a few dates *sob* but she eventually dumped me and said we were incompatible
:sob:`,
            'tier 3': `
There are 2 paths you can choose, butter and ice cream
butter is less expensive, complicated and profitable and ice cream is the opposite
i will now show the process of making them

**Butter:**
1 clean milk + centrifuge = 1 cream \`${prefix}creamify\`
1 cream + churner = 1 butter + 0.3 waste barrels\`${prefix}churn\`

**Ice cream:**
1 clean milk + centrifuge = cream \`${prefix}creamify\`
1 farm produces 100 sugarcane / farm cycle
1 sugarcane + mill = 4 sugar \`${prefix}crush\`
1 cream + 4 sugar + mixer = 4 ice cream + 0.5 waste barrels \`${prefix}mix\`
1 freezer stores 1500 ice cream
`,
            'autofill': `
It tries to guess ur shit
**Example:**
${prefix}he au = help autofill
${prefix}buy m mi= buy max milk`,
            'roadmap': `You can sign up for milanote [here](https://www.milanote.com/refer/rcBwWuNB5PWEzbiijF "big brain")
and look at the milanote roadmap [here](https://app.milanote.com/1JIXFg1A7IWS4Z?p=RPYHur6CMy1 "big brain")`,
            'bok choy': `Bok choy(American English), pak choi(British English), or pok choi(Brassica rapa subsp.chinensis) is a type of Chinese cabbage.Chinensis varieties do not form heads and have green leaf blades with lighter bulbous bottoms instead, forming a cluster reminiscent of mustard greens.Chinensis varieties are popular in southern China and Southeast Asia.Being winter- hardy, they are increasingly grown in Northern Europe.Now considered a subspecies of Brassica rapa, this group was originally classified as its own species under the name Brassica chinensis by Carl Linnaeus.[citation needed]They are a member of the family of Brassicaceae or Cruciferae, also commonly known as the mustards, the crucifers, or the cabbage family.
** Benefits **: Raw Chinese cabbage is 95 % water, 2 % carbohydrates, 1 % protein and less than 1 % fat(table).In a 100 gram amount, raw Chinese cabbage supplies 13 calories and is a rich source(20 % or more of the Daily Value, DV) of vitamin A(30 % DV), vitamin C(54 % DV) and vitamin K(44 % DV), while providing folate, vitamin B6 and calcium in moderate amounts(10–17 % DV).
        Chinese cabbage was ranked #2 for nutrient density out of 41 nutrient - rich plant foods.`,
            'tier': `Buying tiers is a vital part of progression. They allow you to buy more advanced items and upgrades`,
        };
        var HelpNameList = funcs.GetPropertyNames(Info);
        var message = vars['message'];
        var args = vars['args'];
        if (args.length === 1)
        {
            var item_help_info = ``;
            for (var count = 0; count < ItemNames.length; count++)
            {
                item_help_info = item_help_info + `, \`${ItemNames[count]}\``;
            }
            var quest_help_info = ``;
            for (var count = 0; count < QuestNames.length; count++)
            {
                quest_help_info = quest_help_info + `, \`${QuestNames[count]}\``;
            }
            var command_help_info = ``;
            for (var count = 0; count < CommandList.length; count++)
            {
                command_help_info = command_help_info + `, \`${CommandList[count]}\``;
            }
            item_help_info = item_help_info.substring(2);
            quest_help_info = quest_help_info.substring(2);
            command_help_info = command_help_info.substring(2);
            funcs.Say(message, '',
                `
-------------------**COMMANDS**------------------

${command_help_info}

-----------------------**ITEMS**-----------------------

${item_help_info}

-----------------------**QUESTS**-----------------------

${quest_help_info}

-----------------------**MISC**------------------------

**Guides** \`how to get a gf\`, \`starting guide\`, \`autofill\`, \`tier 3\`

**Lattebot related** [Donate](https://ko-fi.com/redstonerti#paymentModal "thanks man"), [Add to your server](https://discord.com/oauth2/authorize?client_id=722466765510148177&scope=bot&permissions=8 "big brain"), [Roadmap](https://app.milanote.com/1JIXFg1A7IWS4Z?p=RPYHur6CMy1 "massive brain"), [top.gg](https://top.gg/bot/722466765510148177 "humongous noggin")

**Random stuff** \`bok choy\`, \`version\`
`);
        }
        else
        {
            var HelpName = message.content.substring(vars['command length'] + 2);
            var ResultList = funcs.AutoFill(HelpName, HelpNameList, true);
            if (ResultList === null) return;
            funcs.Say(message, '', Info[ResultList]);
        }
    }
}