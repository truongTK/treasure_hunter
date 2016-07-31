import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.jsx';

Meteor.startup(() => {
  GoogleMaps.load({
    key: 'AIzaSyBY1UTR38APOuwBxE8vuIYHjnsUCzhljQM',
    libraries: 'places'
  });
  Geolocation.currentLocation();
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '318458325159045',
      status     : true,
      xfbml      : true
    });
  };
  render(<App />, document.getElementById('render-target'));
});
