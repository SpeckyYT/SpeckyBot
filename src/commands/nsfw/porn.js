module.exports = {
    name: "porn",
    description: "Gives you juicy IRL stuff ;) (taken from around 100 subreddits)",
    category: "nsfw",
    aliases: ['irl']
}

const { fetch } = require('reddit-image-fetcher');

module.exports.run = async (bot, msg) => {
    const res = await fetch({
        type: 'custom',
        subreddit: subreddits,
        total: 1
    });

    return msg.channel.send(bot.membed().setImage(res[0].image));
}

// Reference:
// https://www.reddit.com/r/NSFW411/wiki/index
const subreddits = [
    'collegesluts','milf','HotMILFs',
    'maturewoman','RealGirls',
    'LegalTeens','Just18','youngporn','Barelylegal',
    'Amateur','randomsexiness','Nsfw_Amateurs',
    'ChangingRooms','NudeSelfies','OnOff',
    'onoffcollages','lingerie','sexygirlsinjeans',
    'pokies','ThinClothing','cameltoepics',
    'Bottomless','nopanties','cfnf','tightdresses',
    'WeddingsGoneWild','nsfwskirts','girlsinleggings',
    'bikinis','realbikinis','girlsinyogapants','YogaPants',
    'tight_shorts','cameltoe','ToplessInJeans',
    'Topless_Vixens','NoTop','GirlsWearingVS',
    'Pantyfetish','panties','undies','assinthong',
    'nsfwoutfits','GirlsinSchoolUniforms','meido',
    'Upskirt','downblouse','PublicUpskirts','PussySlip',
    'DownBra','upskirtpics','HappyEmbarrassedGirls',
    'facedownassup','Feetup','Bathing','ass',
    'bigasses','pussy','rearpussy','vagina',
    'vulva','Boobies','boobs','tits','BustyPetite',
    'cumsluts','cat_girls','nsfw','nsfw2','porn',
    'camwhores','celebnsfw','countrygirls',
    'lesbians','StraightGirlsPlaying',
    'girlskissing','mmgirls','anal','buttsex',
]
