import Skawe from 'meteor/skawe:lib';
import Users from 'meteor/skawe:users';
import SkaweEmail from 'meteor/skawe:email';

Skawe.notifications = {};

Skawe.notifications.create = (userIds, notificationName, data) => {

  // if userIds is not an array, wrap it in one
  if (!Array.isArray(userIds)) userIds = [userIds];

  userIds.forEach(userId => {

    const user = Users.findOne(userId);
    const email = SkaweEmail.emails[notificationName];
    const properties = email.getProperties(data);
    const subject = email.subject(properties);
    const html = SkaweEmail.getTemplate(email.template)(properties);

    const userEmail = Users.getEmail(user);

    if (!!userEmail) {
      SkaweEmail.buildAndSendHTML(Users.getEmail(user), subject, html);
    } else {
      console.log(`// Couldn't send notification: admin user ${user._id} doesn't have an email`); // eslint-disable-line
    }
  });

};

if (typeof Skawe.settings.collection !== 'undefined') {
  Skawe.settings.collection.addField({
    fieldName: 'emailNotifications',
    fieldSchema: {
      type: Boolean,
      optional: true,
      defaultValue: true,
      form: {
        group: 'notifications',
        instructions: 'Enable email notifications for new posts and new comments (requires restart).'
      }
    }
  });
}

