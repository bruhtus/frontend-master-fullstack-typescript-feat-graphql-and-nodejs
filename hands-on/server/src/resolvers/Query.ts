import { TwitterResolverContext } from '../resolvers';
import { QueryResolvers } from '../resolvers-types.generated';

const queryTwitterResolver: QueryResolvers<TwitterResolverContext> = {
  currentUser: () => {
    return {
      id: '123',
      name: 'John Doe',
      handle: 'johndoe',
      coverUrl: '',
      avatarUrl: '',
      createdAt: '',
      updatedAt: '',
    };
  },
  suggestions: (_, __, { db }) => {
    return db.getAllSuggestions();
  },
};

export default queryTwitterResolver;
