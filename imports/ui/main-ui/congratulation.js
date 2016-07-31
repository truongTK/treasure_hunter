import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {blue500, Indigo, blue50, indigo900} from 'material-ui/styles/colors';

const style = {
  width: 110,
  margin: 10
};

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
        <MuiThemeProvider>
          <RaisedButton label="Finish" style={style} onClick={this.finish}/>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <RaisedButton label="Share" secondary={true}  style={style} onClick={this.share}/>
        </MuiThemeProvider>
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
