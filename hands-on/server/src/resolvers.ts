import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';
import Tweet from './resolvers/Tweet';
import { Resolvers } from './resolvers-types.generated';
import Db, { DbTweet, DbUser } from './db';

export interface TwitterResolverContext {
  db: Db;
  dbTweetCache: Record<string, DbTweet>;
  dbTweetToFavoriteCountMap: Record<string, number>;
  dbUserCache: Record<string, DbUser>;
}

const resolvers: Resolvers<TwitterResolverContext> = {
  Query,
  Mutation,
  User,
  Tweet,
};

export default resolvers;
