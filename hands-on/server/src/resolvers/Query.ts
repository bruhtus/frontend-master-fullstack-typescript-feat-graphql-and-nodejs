import { TwitterResolverContext } from '../resolvers';
import { QueryResolvers } from '../resolvers-types.generated';
import { tweetTransform } from '../transforms';

const queryTwitterResolver: QueryResolvers<TwitterResolverContext> = {
  currentUser: (_, __, { db }) => {
    const [firstUser] = db.getAllUsers();
    // Note:
    // we need to add the guard so that there is no possibility that first user
    // is null, otherwise typescript and graphql server will yell at us.
    if (!firstUser) {
      throw new Error(
        'currentUser was requested, but there are no users in the database'
      );
    }
    return firstUser;
  },

  suggestions: (_, __, { db }) => {
    return db.getAllSuggestions();
  },

  tweets: (
    _,
    __,
    { db, dbTweetToFavoriteCountMap, dbUserCache, dbTweetCache }
  ) => {
    db.getAllUsers().forEach((user) => {
      dbUserCache[user.id] = user;
    });

    db.getAllFavorites().forEach((favorite) => {
      const count = dbTweetToFavoriteCountMap[favorite.tweetId] || 0;
      dbTweetToFavoriteCountMap[favorite.tweetId] = count + 1;
    });

    return db.getAllTweets().map((t) => {
      dbTweetCache[t.id] = t;
      return tweetTransform(t);
    });
  },
};

export default queryTwitterResolver;
