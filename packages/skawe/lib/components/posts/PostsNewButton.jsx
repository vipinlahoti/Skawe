import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';

const PostsNewButton = (props, context) => {

  const size = props.currentUser ? 'large' : 'sm';
  const button = <Components.Button variant="primary"><Components.Icon name="new"/> <FormattedMessage id="posts.new_post"/></Components.Button>;
  return (
    <Components.ModalTrigger size={size} title={context.intl.formatMessage({ id: 'posts.new_post' })} component={button}>
      <Components.PostsNewForm />
    </Components.ModalTrigger>
  )
}

PostsNewButton.displayName = 'PostsNewButton';

PostsNewButton.propTypes = {
  currentUser: PropTypes.object,
};

PostsNewButton.contextTypes = {
  messages: PropTypes.object,
  intl: intlShape
};

registerComponent({ name: 'PostsNewButton', component: PostsNewButton, hocs: [withCurrentUser] });
