import { Tweet } from './resolvers-types.generated';
import { DbTweet } from './db';

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
