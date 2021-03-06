import { Components, registerComponent, withMulti, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Categories } from '../../modules/categories/index.js';
import { withApollo } from 'react-apollo';
import get from 'lodash/get';

const CategoriesMenu = props => {
  const { match, results } = props;

  let menuItems = [
    {
      to: '/docs',
      labelId: 'categories.all',
    },
  ];

  if (results) {
    menuItems = [
      ...menuItems,
      ...results.map(({ name, slug }) => {
        return {
          to: {
            pathname: `/docs/category/${slug}`,
          },
          label: name,
          linkProps: {
            isActive: () => get(match, 'params.slug') === slug,
          },
        };
      }),
    ];
  }

  return (
    <div className="categories-list">
      <Components.Dropdown
        buttonProps={{ variant: 'flat' }}
        labelId={'categories'}
        id="categories-dropdown"
        menuItems={menuItems}
      />
    </div>
  );
};

const options = {
  collection: Categories,
  fragmentName: 'CategoryItem',
  limit: 0,
  queryOptions: {
    pollInterval: 0,
  },
};

registerComponent({
  name: 'CategoriesMenu',
  component: CategoriesMenu,
  hocs: [withRouter, withApollo, [withMulti, options], withCurrentUser],
});
