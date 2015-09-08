require('../lib/resource');

/**
 * sentry configuration.
 */

exports.default = {
  sentry: function(api){
    return {
      dsn      :'https://72830ce2b52b41a2a54bb93622ce8eb3:731c828790744eccac9ae32eb2a4269a@sentry.s-team.at/15'          
    }
  }
}


//Passing any falsey value as the DSN will disable sending events upstream
exports.test = {
  sentry: function(api){
    return {
      dsn      : false
    }
  }
}
