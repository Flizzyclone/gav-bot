const Discord = require('discord.js');
    
let stageOne = [new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
            .setCustomId("introOne_nameEnter")
            .setLabel("Enter Your Name")
            .setStyle("PRIMARY"),
    ])]

let stageOneDisabled = [new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
            .setCustomId("introOne_nameEnter")
            .setLabel("Enter Your Name")
            .setStyle("PRIMARY")
            .setDisabled(true),
    ])]

let stageTwo = [new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
            .setCustomId("introTwo_18")
            .setLabel("18")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introTwo_19")
            .setLabel("19")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introTwo_20")
            .setLabel("20")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introTwo_21")
            .setLabel("21")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introTwo_22")
            .setLabel("22")
            .setStyle("PRIMARY"),
    ]),new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
            .setCustomId("introTwo_23")
            .setLabel("23")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introTwo_24")
            .setLabel("24")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introTwo_25")
            .setLabel("25")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introTwo_26")
            .setLabel("26")
            .setStyle("PRIMARY")
    ])]

let stageThree = [new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
            .setCustomId("introThree_homosexual")
            .setLabel("Homosexual")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introThree_bisexual")
            .setLabel("Bisexual")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introThree_pansexual")
            .setLabel("Pansexual")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introThree_queer")
            .setLabel("Queer")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introThree_unlabeled")
            .setLabel("Unlabeled")
            .setStyle("PRIMARY"),
    ]),new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
            .setCustomId("introThree_asexual")
            .setLabel("Asexual")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introThree_demisexual")
            .setLabel("Demisexual")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introThree_heterosexual")
            .setLabel("Heterosexual")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introThree_androsexual")
            .setLabel("Androsexual")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introThree_gynesexual")
            .setLabel("Gynesexual")
            .setStyle("PRIMARY")
    ]),new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
            .setCustomId("introThree_ceterosexual")
            .setLabel("Ceterosexual")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introThree_graysexual")
            .setLabel("Graysexual")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introThree_omnisexual")
            .setLabel("Omnisexual")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introThree_questioning")
            .setLabel("Sexuality Questioning")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introThree_other")
            .setLabel("Other")
            .setStyle("PRIMARY")
    ])]

let stageFour = [new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
            .setCustomId("introFour_homoromantic")
            .setLabel("Homoromantic")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introFour_biromantic")
            .setLabel("Biromantic")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introFour_panromantic")
            .setLabel("Panromantic")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introFour_queer")
            .setLabel("Queer")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introFour_unlabeled")
            .setLabel("Unlabeled")
            .setStyle("PRIMARY"),
    ]),new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
            .setCustomId("introFour_aromantic")
            .setLabel("Aromantic")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introFour_demiromantic")
            .setLabel("Demiromantic")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introFour_heteroromantic")
            .setLabel("Heteroromantic")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introFour_androromantic")
            .setLabel("Androromantic")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introFour_gyneromantic")
            .setLabel("Gyneromantic")
            .setStyle("PRIMARY")
    ]),new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
            .setCustomId("introFour_ceteroromantic")
            .setLabel("Ceteroromantic")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introFour_grayromantic")
            .setLabel("Grayromantic")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introFour_omniromantic")
            .setLabel("Omniromantic")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introFour_questioning")
            .setLabel("Romantically Questioning")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introFour_other")
            .setLabel("Other")
            .setStyle("PRIMARY")
    ])]

let stageFive = [new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
            .setCustomId("introFive_male")
            .setLabel("Male")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introFive_female")
            .setLabel("Female")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introFive_nonBinary")
            .setLabel("Non-Binary")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introFive_transMale")
            .setLabel("Transgender Male")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introFive_transFemale")
            .setLabel("Transgender Female")
            .setStyle("PRIMARY"),
    ]),new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
            .setCustomId("introFive_demiboy")
            .setLabel("Demiboy")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introFive_demigirl")
            .setLabel("Demigirl")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introFive_genderfluid")
            .setLabel("Genderfluid")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introFive_genderqueer")
            .setLabel("Genderqueer")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introFive_genderflux")
            .setLabel("Genderflux")
            .setStyle("PRIMARY")
    ]),new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
            .setCustomId("introFive_questioning")
            .setLabel("Gender Questioning")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introFive_other")
            .setLabel("Other")
            .setStyle("PRIMARY")
    ])]

let stageSix = [new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
            .setCustomId("introSix_hehim")
            .setLabel("He/Him")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introSix_sheher")
            .setLabel("She/Her")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introSix_theythem")
            .setLabel("They/Them")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introSix_any")
            .setLabel("Any Pronouns")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introSix_ask")
            .setLabel("Ask Pronouns")
            .setStyle("PRIMARY"),
    ]),new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
            .setCustomId("introSix_other")
            .setLabel("Other")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introSix_no")
            .setLabel("No Pronouns")
            .setStyle("PRIMARY")
    ])]

let stageSeven = [new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
            .setCustomId("introSeven_northam")
            .setLabel("North America")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introSeven_europe")
            .setLabel("Europe")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introSeven_asia")
            .setLabel("Asia")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introSeven_africa")
            .setLabel("Africa")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introSeven_southam")
            .setLabel("South America")
            .setStyle("PRIMARY"),
    ]),new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
            .setCustomId("introSeven_middleeast")
            .setLabel("Middle East")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introSeven_oceania")
            .setLabel("Oceania")
            .setStyle("PRIMARY")
    ])]

let stageEight = [new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
            .setCustomId("introEight_deepPurple")
            .setLabel("Deep Purple")
            .setEmoji("765292955031306281")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introEight_hotPink")
            .setLabel("Hot Pink")
            .setEmoji("765292954910457868")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introEight_lavender")
            .setLabel("Lavender")
            .setEmoji("765292954775584800")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introEight_lavenderTea")
            .setLabel("Lavender Tea")
            .setEmoji("765292954872709161")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introEight_prettyInPink")
            .setLabel("Pretty in Pink")
            .setEmoji("765292955052933132")
            .setStyle("PRIMARY")
    ]),new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
            .setCustomId("introEight_pastelViolet")
            .setLabel("Pastel Violet")
            .setEmoji("765292955258191882")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introEight_skyBlue")
            .setLabel("Sky Blue")
            .setEmoji("765292955345879060")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introEight_oceanBlue")
            .setLabel("Ocean Blue")
            .setEmoji("765292955320844378")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introEight_tiffanyBlue")
            .setLabel("Tiffany Blue")
            .setEmoji("765292955363049482")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introEight_aquamarine")
            .setLabel("Aquamarine")
            .setEmoji("765292955216117781")
            .setStyle("PRIMARY")
    ]),new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
            .setCustomId("introEight_cyan")
            .setLabel("Cyan")
            .setEmoji("765292955031961604")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introEight_forestGreen")
            .setLabel("Forest Green")
            .setEmoji("765292955153465345")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introEight_honey")
            .setLabel("Honey")
            .setEmoji("765292955119779880")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introEight_flameOrange")
            .setLabel("Flame Orange")
            .setEmoji("765292955099332688")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introEight_mahogany")
            .setLabel("Mahogany")
            .setEmoji("765292957678698526")
            .setStyle("PRIMARY")
    ]),new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
            .setCustomId("introEight_darkRed")
            .setLabel("Dark Red")
            .setEmoji("765292955040350258")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introEight_default")
            .setLabel("Default")
            .setStyle("PRIMARY")
    ])]
    
let stageNine = [new Discord.MessageActionRow()
    .addComponents([
        new Discord.MessageButton()
            .setCustomId("introNine_yes")
            .setLabel("Yes")
            .setStyle("PRIMARY"),
        new Discord.MessageButton()
            .setCustomId("introNine_no")
            .setLabel("No")
            .setStyle("PRIMARY"),
    ])]

    module.exports = { stageOne, stageOneDisabled, stageTwo, stageThree, stageFour, stageFive, stageSix, stageSeven, stageEight, stageNine }