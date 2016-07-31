SocialSharing = {};

// Share url with message on Facebook
var shareReviewViaFacebook = function(message, url) {
  if (Meteor.isCordova) {
    // Open facebook app on cell phone and share the url
    window.plugins.socialsharing.shareViaFacebook(message /* content sharing*/, null /* image*/, url /* URL example.com*/, function() {
    },
    function(errormsg) {
      // If sharing has error, the facebook app is not installed, open and share with facebook website.
      const shareUrl = 'https://www.facebook.com/dialog/share?app_id=752304778202637&sdk=joey&u=' + encodeURIComponent(url) + '&display=popup';
      window.open(shareUrl);
      // Temporary, notify to user that facebook app not installed yet.
    });
  }
};
SocialSharing.shareViaFacebook = shareReviewViaFacebook;
