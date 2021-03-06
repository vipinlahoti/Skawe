import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import NoSSR from 'react-no-ssr';

const BackofficeIndex = () => { 
  return (
  <div>
    <p>Welcome to backoffice</p>
    {/** AccountsLoginForm is SSR only */}
    <div>
      <NoSSR>
        <Components.AccountsLoginForm />
      </NoSSR>
    </div>
  </div>
);};
registerComponent({ name: 'VulcanBackofficeIndex', component: BackofficeIndex, hocs: [] });

export default BackofficeIndex;
