import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

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
        <MuiThemeProvider>
          <List>
            <Subheader>Let's find prize! </Subheader>
            {
              this.state.listChallenge.map((challenge) => (
                <div>
                  <ListItem
                    key={challenge.challengeId} onClick={this.onChooseChallenge.bind(this, challenge.challengeId)}
                    primaryText={challenge.name}
                    secondaryText={
                      <span>
                        <span style={{color: darkBlack}}>Prize: </span>
                        {challenge.gift}
                      </span>
                    }
                    secondaryTextLines={2}
                    ></ListItem>
                  <Divider inset={true} />
                </div>
              ))
            }
          </List>
      </MuiThemeProvider>
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
