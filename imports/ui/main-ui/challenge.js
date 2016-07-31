import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';

const Challenge = React.createClass({
  getInitialState() {
    return {
    };
  },
  componentWillMount() {
    Meteor.call('getChallengeQuestion', this.props.state.challengeId, this.props.state.step, (error, question) => {
      if(error) {
        // handle error
      } else {
        this.setState({ question });
      }
    });
  },

  answer() {
    const answer = ReactDOM.findDOMNode(this.refs.input).value;
    Meteor.call('answerChallenge', this.props.state.challengeId, this.props.state.step, answer, (error, result) => {
      if (error) {
        // handle error
      } else {
        if (!result) {
          // handle when wrong answer
        }
      }
    });
  },

  render() {
    return (
      <div>
        {
          this.state.question ? <p> Câu hỏi: {this.state.question} </p> : <p>WAITING</p>
        }
        <input ref="input"/>
        <button onClick={this.answer}>Trả lời</button>
      </div>
    );
  }
});

Challenge.propTypes = {
  state: PropTypes.object,
};

export default createContainer(() => {
  return {
  }
}, Challenge);

export default Challenge;
