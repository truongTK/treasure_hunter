import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';

const ChallengeList = React.createClass({
  getInitialState() {
    return {
      listChallenge: [],
    };
  },
  componentWillMount() {
    Meteor.call("getChallengeList", (error, listChallenge) => {
      if(error) {
        // handle error
      } else {
        this.setState({ listChallenge });
      }
    });
  },
  onChooseChallenge(challengeId) {
    Meteor.call('chooseChallenge', challengeId);
  },
  render() {
    return (
      <div>
        {
          this.state.listChallenge.map((challenge) => (
            <div key={challenge.challengeId} onClick={this.onChooseChallenge.bind(this, challenge.challengeId)}> - {challenge.name}: {challenge.gift}</div>
          ))
        }
      </div>
    );
  }
});
ChallengeList.propTypes = {
  user: PropTypes.object,
};

export default createContainer(() => {
  return {
  }
}, ChallengeList);

export default ChallengeList;
