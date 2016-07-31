import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';

export default class NotLogin extends Component {
  onLoginFb() {
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        console.log('Logged in.');
      }
      else {
        FB.login();
      }
    });
  }
  render() {
    return (
      <div>
        NOT LOGIN. PLEASE LOGIN
        <button onClick={this.onLoginFb}>Log in by facebook</button>
      </div>
    );
  }
};

NotLogin.propTypes = {
};

export default createContainer(() => {
  return {
  }
}, NotLogin);
