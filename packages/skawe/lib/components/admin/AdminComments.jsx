import React from 'react';
import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';
import { Comments } from '../../modules/comments/collection.js';

const AdminComments = () => (
  <div className="admin-comments">
    <Components.HeadTags title="Comments" description="Comments Page" />
    
    <h5 className="title-5 mb-1">Admin Comments</h5>
    <div className="instances__list">
      <Components.Datatable
        collection={Comments}
        options={{
          fragmentName: 'CommentItemAdmin',
        }}
        columns={[
          { name: 'createdAt' },
          { name: 'postedAt' },
          { name: 'body' },
          { name: 'postId', label: 'Post' },
          { name: 'userId', label: 'User' }
        ]}
        showEdit={false}
        showNew={false}
      />
    </div>
  </div>
);

const accessOptions = {
  groups: ['admins'],
  redirect: '/',
  message: 'Sorry, you do not have the rights to access this page.',
};

registerComponent('AdminComments', AdminComments, [withAccess, accessOptions]);

export default AdminComments;
