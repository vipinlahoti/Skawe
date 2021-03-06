/*
Callbacks to:

- Remove a user's instances when it's deleted
*/

import Users from 'meteor/vulcan:users';
import { Instances } from '../../../modules/instances/index.js'


/**
 * @summary Increment the user's instance count
 */
export function incrementUserInstanceCount(instance) {
  var userId = instance.document.userId;
  Users.update({ _id: userId }, { $inc: {instanceCount: 1} });
}

//////////////////////////////////////////////////////
// instances.remove.sync                                //
//////////////////////////////////////////////////////

export function InstancesRemoveOperations(instance) {
  Users.update({ _id: instance.document.userId }, { $inc: { 'instanceCount': -1 } });
  return instance;
}

//////////////////////////////////////////////////////
// users.remove.async                               //
//////////////////////////////////////////////////////

export function UsersRemoveDeleteInstances(user, options) {
  if (options.deleteInstances) {
    Instances.remove({ userId: user._id });
  } else {
    // not sure if anything should be done in that scenario yet
    // Instances.update({userId: userId}, {$set: {author: '\[deleted\]'}}, {multi: true});
  }
}
// addCallback('users.remove.async', UsersRemoveDeleteInstances);
