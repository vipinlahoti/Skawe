import Grudr from 'meteor/grudr:lib';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Grudr.components.Header />
        {this.props.children}
        <Grudr.components.MiniCreateForm />
        <Grudr.components.MiniFooter
          variant="bg-primary"
          className="center-xs"
          title="Sign up for the Skawe Cloud Newsletter"
        />
        <Grudr.components.Footer />        
      </React.Fragment>
    )
  }
}

Layout.contextTypes = {
  currentUser: PropTypes.object,
};

Grudr.registerComponent('Layout', Layout);
