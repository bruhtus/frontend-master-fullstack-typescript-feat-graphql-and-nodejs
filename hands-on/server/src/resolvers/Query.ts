import { TwitterResolverContext } from '../resolvers';
import { QueryResolvers } from '../resolvers-types.generated';

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
};

export default queryTwitterResolver;
