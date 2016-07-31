import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';

const Congratulation = React.createClass({
  getInitialState() {
    return {
    };
  },
  componentWillMount() {
    Meteor.call("getChallengeGift", this.props.challengeId, (error, gift) => {
      if(error) {
        // handle error
      } else {
        this.setState({ gift });
      }
    });
  },
  finish() {
    Meteor.call('finishChallenge');
  },
  share() {
    FB.ui({
      method: 'share_open_graph',
      action_type: 'og.likes',
      action_properties: JSON.stringify({
        object: 'https://example.com/',
      })
    }, function(response){
      // Debug response (optional)
    });
  },
  render() {
    return (
      <div>
        <p>Chúc mừng, bạn đã hoàn thành phần thi.</p>
        {
          this.state.gift ? <p>Phần thưởng của bạn là {this.state.gift}</p> : ''
        }
        <button onClick={this.finish}>Hoàn thành</button>
        <button onClick={this.share}>Chia sẻ</button>
      </div>
    );
  }
});

Congratulation.propTypes = {
  challengeId: PropTypes.String,
};

export default createContainer(() => {
  return {
  }
}, Congratulation);

export default Congratulation;
