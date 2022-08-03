import { Favorite, Tweet } from './resolvers-types.generated';
import { DbTweet } from './db';
import { DbFavorite } from './db';
import { DbTrend } from './db';
import { Trend } from './resolvers-types.generated';

// Note:
// author is related record that is a field of typed User and that is going to
// require its own transform.
export const tweetTransform = (t: DbTweet): Omit<Tweet, 'author'> => {
  return {
    id: t.id,
    body: t.message,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  };
};

export const favoriteTransform = (
  t: DbFavorite
): Omit<Favorite, 'user' | 'tweet'> => {
  return {
    id: t.id,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  };
};

export const trendTransform = (t: DbTrend): Trend => {
  const { tweetCount } = t;
  if (t.kind === 'topic') {
    const { topic, quote } = t;
    return { tweetCount, topic, quote };
  } else {
    const { hashtag } = t;
    return { tweetCount, hashtag };
  }
};
