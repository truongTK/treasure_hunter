Package.describe({
  name: 'truong:facebook-sharing',
  version: '0.0.1',
  summary: 'Supply facebook sharing functions',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  Cordova.depends({
    'cordova-plugin-x-socialsharing': '5.0.5',
  });
  api.addFiles('client/facebook-sharing.js', 'client');
  api.export('SocialSharing', 'client');
});
