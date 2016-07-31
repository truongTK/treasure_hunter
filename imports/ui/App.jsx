import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';

import {Challenges} from '../api/challenges.js';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import NotLogin from './main-ui/not-login';
import ChallengeList from './main-ui/challenge-list';
import Moving from './main-ui/moving';
import Challenge from './main-ui/challenge';
import Congratulation from './main-ui/congratulation';

// layout of app
const App = React.createClass({
  // loginWithFacebook() {
  //   Meteor.loginWithFacebook(
  //     {requestPermissions: ['public_profile']}
  //     , (err) => {
  //       console.log(err);
  //     }
  //   );
  // },

  renderMain(user) {
    if (!user) {// not login
      return (<NotLogin />);
    } else if (!user.state || !user.state.challengeId) {
      // not join any chalenge. send all challenge around.
      return (<ChallengeList user={user}/>);
    } else if (user.state.status === 'FINDING') {
      return (<Moving state={user.state}/>);
    } else if (user.state.status === 'ANSWERING') {
      return (<Challenge state={user.state}/>);
    } else if (user.state.status === 'CONGRATULATION') {
      return (<Congratulation challengeId={user.state.challengeId}/>);
    }
  },

  render() {
    return (
      <div className="container">
        <AccountsUIWrapper />
        {this.renderMain(this.props.user)}
      </div>
    );
  }
});

App.propTypes = {
  user: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('userProfile');
  return {
    user: Meteor.user(),
  }
}, App);
