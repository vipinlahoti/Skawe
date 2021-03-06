import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardLogo = ({ logoUrl, siteTitle }) => {
  if (logoUrl) {
    return (
      <Link to={{ pathname: '/accounts/dashboard' }} className="navbar-brand">
        <img src={logoUrl} alt={siteTitle} />
      </Link>
    )

  } else {
    return (
      <Link to={{ pathname: '/accounts/dashboard' }} className="navbar-brand">
        {siteTitle}
      </Link>
    )
  }
}

registerComponent({ name: 'DashboardLogo', component: DashboardLogo });
