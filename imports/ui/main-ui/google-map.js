import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

const GoogleMap = React.createClass({
  componentDidMount() {
    if (GoogleMaps.loaded()) {
      GoogleMaps.create({
        name: 'myMap',
        element: ReactDOM.findDOMNode(this),
        options: {
          center: new google.maps.LatLng(this.props.currentLocation.coords.latitude, this.props.currentLocation.coords.longitude),
          zoom: 13,
          disableDefaultUI: true,
        },
      });
    }
  },

  drawCurrentLocation(currentLocation) {
    const currentLatLng = new google.maps.LatLng(currentLocation.coords.latitude, currentLocation.coords.longitude);
    // draw current location marker
    const curLocUrl = '/icons/current-location.png';
    const myLocationMarker = new google.maps.Marker({
      position: currentLatLng,
      map: GoogleMaps.maps.myMap.instance,
      icon: {
        url: curLocUrl,
        size: new google.maps.Size(34, 34),
        scaledSize: new google.maps.Size(16, 16),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(8, 8),
      },
    });
    // draw circle
    const circle = new google.maps.Circle({
      strokeColor: '#006DFC',
      strokeOpacity: 0.4,
      strokeWeight: 0,
      fillColor: '#006DFC',
      fillOpacity: 0.15,
      map: GoogleMaps.maps.myMap.instance,
      center: myLocationMarker.getPosition(),
      radius: currentLocation.coords.accuracy,
    });
  },

  renderMap() {
    if (GoogleMaps.loaded()) {
      // Sets the viewport to contain current location and address.
      const bounds = new google.maps.LatLngBounds();
      // create google map
      GoogleMaps.ready('myMap', (map) => {
        // get current location and draw on map
        if (this.props.currentLocation) {
          // get current location success
          this.drawCurrentLocation(this.props.currentLocation);
          // add current location to bound
          bounds.extend(new google.maps.LatLng(this.props.currentLocation.coords.latitude, this.props.currentLocation.coords.longitude));
        } else {
          // get current location fail
        }
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.props.target.lat, this.props.target.lng),
          map: GoogleMaps.maps.myMap.instance,
          animation: google.maps.Animation.DROP,
        });
        bounds.extend(marker.getPosition());
        GoogleMaps.maps.myMap.instance.fitBounds(bounds);
      });
    } else {
      // not loaded google map api
    }
  },

  render() {
    this.renderMap();
    return <div style={{width: '100%', height: '100%'}}></div>;
  },
});

GoogleMap.propTypes = {
  currentLocation: PropTypes.object,
  target: PropTypes.object,
};

export default createContainer(() => {
  return {
    loaded: GoogleMaps.loaded(),
  }
}, GoogleMap);

export default GoogleMap;
