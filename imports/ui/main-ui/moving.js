import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import GoogleMap from './google-map';
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

const chip_styles = {
  margin: 4,
};


const Moving = React.createClass({
  getInitialState() {
    return {
    };
  },
  componentWillMount() {
    Meteor.call('getNextPosition', this.props.state.challengeId, this.props.state.step, (error, postion) => {
      if (error) {
        // handle error
      } else {
        this.setState({
          postion,
        },() => {this.refresh()});
      }
    });
  },
  refresh() {
    const currentLocation = Geolocation.latLng();
    if (currentLocation) {
      var geocoder = new google.maps.Geocoder;
      var service = new google.maps.DistanceMatrixService;
      service.getDistanceMatrix({
        origins: [currentLocation],
        destinations: [this.state.postion.location],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
      }, (response, status) =>{
        if (status === 'OK') {
          const distance = response.rows[0].elements[0].distance;
          if (distance.value < 10000) {// < 100m -> accept take challenge
            Meteor.call('takeChallenge', currentLocation);
          }
          this.setState({
            distanceText: distance.text,
          });
        }
      });
    }
  },
  surrender() {
    Meteor.call('surrender');
  },
  render() {
    if (this.state.postion) { // get data
      return (
        <div>
          <div id="map" style={{position: 'fixed', top: 35, right: 0, bottom: 100, left: 0}}>
            <GoogleMap currentLocation={Geolocation.currentLocation()} target={this.state.postion.location} />
          </div>
          <div style={{position: 'fixed',zIndex: 1, bottom: 0, left: 0, right: 0, backgroundColor: 'white', padding: '10px'}}>
            <MuiThemeProvider>
              <Chip
              style={chip_styles}
              backgroundColor={blue50}
                  >
                  <Avatar size={32} color={blue50} backgroundColor={indigo900} icon={<FontIcon className="fa fa-home" ></FontIcon>} />
              {this.state.postion.textLocation}
              </Chip>
            </MuiThemeProvider>
            <MuiThemeProvider>
              <Chip
                style={chip_styles}
                backgroundColor={blue50}
                    >
                    <Avatar size={32} color={blue50} backgroundColor={indigo900} icon={<FontIcon className="fa fa-road" ></FontIcon>} />
                {
                  this.state.distanceText ?
                    <span>Khoảng cách: {this.state.distanceText}</span> : ''
                }
              </Chip>
            </MuiThemeProvider>
            <MuiThemeProvider>
              <RaisedButton label="CheckIn" secondary={true} style={style} onClick={this.refresh}/>
            </MuiThemeProvider>
            <MuiThemeProvider>
              <RaisedButton label="Surrender" style={style} onClick={this.surrender}/>
            </MuiThemeProvider>
          </div>
        </div>
      );
    } else { // not get data yet
      return (<div>Waiting</div>);
    }
  }
});
Moving.propTypes = {
  state: PropTypes.object,
};

export default createContainer(() => {
  return {
    currentLocation: Geolocation.currentLocation(),
  }
}, Moving);

export default Moving;
