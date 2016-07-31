import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';

const style = {
  margin: 12,
};

export default class NotLogin extends Component {
  render() {
    return (
      <div>
        NOT LOGIN. PLEASE LOGIN
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
