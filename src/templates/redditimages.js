const { fetch } = require('reddit-image-fetcher');

module.exports.redditImages = (
    {
        addSubreddit,
        removeSubreddit,
        subreddit,
        total,
        type,

        nsfw,
        spoiler
    }
) =>
    async function(bot,msg){
        if(typeof nsfw == 'undefined') nsfw = msg.channel.isNSFW();

        if(Array.isArray(subreddit)) type = 'custom';

        const posts = await fetch({
            addSubreddit,
            removeSubreddit,
            subreddit,
            total: total || 20,
            type
        })

        const post = posts
        .filter(p => p.NSFW ? nsfw : true)
        .filter(p => p.spoiler ? spoiler : true)
        .pick();

        if(!post) return bot.cmdError('No post found');

        return msg.channel.send(
            bot.embed()
            .setAuthor(`r/${post.subreddit}`)
            .setColor('RANDOM')
            .setFooter(`Upvotes: ${post.upvotes}`)
            .setImage(post.image)
            .setTimestamp(new Date(post.createdUtc * 1000))
            .setTitle(post.title)
            .setURL(post.postLink)
        )
    }
