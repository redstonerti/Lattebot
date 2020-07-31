const { Client, MessageAttachment, MessageEmbed, version } = require('discord.js');
const funcs = require("../index.js");
module.exports = {
    name: 'help',
    description: "explains what the bot does",
    execute(vars)
    {
        var ItemNames = vars['ItemNames'];
        const Info =
        {
            //Commands
            'version': `**Version: ${vars['version']}**
This is a medium sized QoL update.
You can now buy and sell things by adding units after them. For example, ;buy 10000 cow can now be written as ;buy 10K cow
There are 2 new commands, buggify and suggest. Buggify is for bugs and suggest for suggestions.
Just write ;suggest and whatever you write after that will be sent to me.
The same applies to ;buggify.

Also, now all numbers no matter how big or small will only show decimals when needed.
For example, if you have exactly 1 million milkesh, the number will be 1M not 1.00M
If you have 1001000 milkesh, it will be written as 1.001M

There is also now a roadmap in milanote. Type ;help roadmap to get access to it.

If you type ;help, there will be a direct link to add lattebot to your server under Misc -> Lattebot related

:)`,


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
This command uses power, pasteurizers and milk to make clean milk. Each pasteurizer uses 1000W + 100 milk and creates 100 clean milk.
`,


            'upgrade': `**Syntax:**
upgrade + thing you want to upgrade

**Description:**
You can upgrade anything in the upgrades shop with this command
`,


            //Items
            'milk': `**Description:**
Milk is produced by cows and it can be either sold or turned into clean milk to be sold for more money.

**Lore:**
🥛Milk is a white, nutrient-rich liquid food produced in the mammary glands of mammals. It is the primary source of nutrition for infant mammals (including humans who are breastfed) before they are able to digest other types of food.
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


            'seed': `Seeds can be bought from the shop or produced by farms when you harvest corn and they're used to plant corn in farms. You get about 1.2 seeds / corn that you harvest`,


            'grinder': `Grinders work in the exact same way as pasteurizers. They use 1000W to turn 100 corn into 100 animal feed`,


            'farm': `Farms produce corn and seeds. They need to be replanted every time you harvest them but they give you more 1.2x the seeds you used to plant them. If you haven't waited until the full harvest, you can harvest and replant a part of your farms.`,


            //Guides
            'starting guide':
                `
This is a game about making money primarily from cows. First, you need to work for Lattebot. He will give you 20 milkesh at the beginning but will give you a 10 milkesh raise every 5 times you work.

Once you get up to 130 milkesh, you can buy your first cow. It will start producing milk and you can get it with the ;milk command. You can also sell that milk to get milkesh. 

This is fine until you reach 200 cows. At that point you are going to need to buy more land. You start out with 40 land and each piece of land can house 5 cows.

After you reach the land cap too (200 land), you are going to want to start buying some pasteurizers and some power generation and storage.

Buy batteries to store your power and solar panels or wind turbines to produce it. You will need this power to pasteurize your milk with the ;clean command. You will use your pasteurizers to clean it and turn it into clean milk which is 3x more expensive (to sell)
-------------------------------------------------------
**\`TL;DR\`**
If no money and no cow, start with:
;work
Collect more until you can buy a cow :relaxed:
then
;milk to get milk
;sell milk to get more money $$$
and then you buy land
more cow
upgrade tier
buy solar
buy battery
buy pasteurizers
;clean milk`,


            'how to get a gf': `
Be a chad
...
or workout
...
or don't be me...
*sob*
you know, i once found this beatiful app written in ruby on rails, *sob* we went on a few dates *sob* but she eventually dumped me and said we were incompatible
:sob:`,


            'autofill': `
It tries to guess ur shit
**Example:**
;he au = help autofill
;bu m mi= buy max milk`,


            //Lattebot related
            'roadmap': `You can sign up for milanote [here](https://www.milanote.com/refer/rcBwWuNB5PWEzbiijF "big brain")
and look at the milanote roadmap [here](https://app.milanote.com/1JIXFg1A7IWS4Z?p=RPYHur6CMy1 "big brain")`,

            //Random shit
            'bok choy': `Bok choy(American English), pak choi(British English), or pok choi(Brassica rapa subsp.chinensis) is a type of Chinese cabbage.Chinensis varieties do not form heads and have green leaf blades with lighter bulbous bottoms instead, forming a cluster reminiscent of mustard greens.Chinensis varieties are popular in southern China and Southeast Asia.Being winter- hardy, they are increasingly grown in Northern Europe.Now considered a subspecies of Brassica rapa, this group was originally classified as its own species under the name Brassica chinensis by Carl Linnaeus.[citation needed]They are a member of the family of Brassicaceae or Cruciferae, also commonly known as the mustards, the crucifers, or the cabbage family.

** Benefits **: Raw Chinese cabbage is 95 % water, 2 % carbohydrates, 1 % protein and less than 1 % fat(table).In a 100 gram amount, raw Chinese cabbage supplies 13 calories and is a rich source(20 % or more of the Daily Value, DV) of vitamin A(30 % DV), vitamin C(54 % DV) and vitamin K(44 % DV), while providing folate, vitamin B6 and calcium in moderate amounts(10–17 % DV).
        Chinese cabbage was ranked #2 for nutrient density out of 41 nutrient - rich plant foods.`,

            'tier': `Buying tiers is a vital part of progression.They allow you to buy more advanced items and upgrades`,
        };
        const HelpNameList =
            [
                'clear',
                'deport',
                'undeport',
                'hug',
                'give',
                'beg',
                'shop',
                'buy',
                'sell',
                'milk',
                'work',
                'clean',
                'how to get a gf',
                'starting guide',
                'bok choy',
                'version',
                'clean milk',
                'cow',
                'land',
                'pasteurizer',
                'battery',
                'solar panel',
                'wind turbine',
                'autofill',
                `animal feed`,
                `corn`,
                `seed`,
                `grinder`,
                `farm`,
                `tier`,
                `upgrade`,
                `roadmap`,
            ];
        var message = vars['message'];
        var args = vars['args'];
        if (args.length === 1)
        {
            var item_help_info = ``;
            for (var count = 0; count < ItemNames.length; count++)
            {
                item_help_info = item_help_info + `, \`${ItemNames[count]}\``;
            }
            item_help_info = item_help_info.substring(2);
            funcs.Say(message, '',
                `
-------------------**COMMANDS**------------------

**General** \`clear\`, \`deport\`, \`undeport\`, \`hug\`, \`donate\`, \`suggest\`, \`buggify\`

**Economy** \`give\`, \`beg\`, \`shop\`, \`buy\`, \`sell\`, \`milk\`, \`work\`, \`clean\` \`tier\`, \`upgrade\`

-----------------------**ITEMS**-----------------------

${item_help_info}

-----------------------**MISC**------------------------

**Guides** \`how to get a gf\`, \`starting guide\`, \`autofill\`

**Lattebot related** [Add to your server](https://discord.com/oauth2/authorize?client_id=722466765510148177&scope=bot&permissions=8 "big brain"), \`roadmap\` 

**Random stuff** \`bok choy\`, \`version\`
`);
        }
        else
        {
            var HelpName = message.content.substring(vars['command length'] + 2);
            var ResultList = funcs.AutoFill(message, HelpName, HelpNameList, true);
            if (ResultList === null)
            {
                return;
            }
            ResultList = ResultList[0];
            if (ResultList.length === 1)
            {
                funcs.Say(message, '', Info[ResultList]);
            }
        }
    }
}