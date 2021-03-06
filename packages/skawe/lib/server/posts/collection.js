import { Connectors, extendCollection } from 'meteor/vulcan:core';
import Posts from '../../modules/posts/collection.js';
import Categories from '../../modules/categories/collection.js';
import {
  rateLimit,
  upvoteOwnPost,
  createNotifications,
  incrementUserPostCount,
  PostsRemoveOperations,
} from './callbacks/index.js';

// stupid workaround because filter cannot be async for some reason
let categories;
Meteor.startup(async ()=> {
  categories = await Connectors.find(Categories, {})
});

extendCollection(Posts, {
  callbacks: {
    create: {
      validate: [rateLimit],
      after: [upvoteOwnPost],
      async: [createNotifications, incrementUserPostCount],
    },
    delete: {
      async: [PostsRemoveOperations],
    },
  },
  customFilters: [
    {
      name: '_byCategory',
      arguments: 'slug: String',
      filter: ({ filterArguments }) => {
        const { slug } = filterArguments;
        // TODO: make this work async
        // const category = await Connectors.get(Categories, { slug });
        const category = categories.find(c => c.slug === slug);
        return {
          selector: { categoriesIds: category._id },
        };
      },
    },
  ],
});
