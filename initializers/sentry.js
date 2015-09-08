var raven = require('raven');  

var init = function(api, next){    
  var client = new raven.Client(api.config.sentry.dsn);

  api.sentry = {
      client: client
  }
    
  //create a custom error reporter that sends error to sentry
  var sentryErrorReporter = function(err, type, name, objects, severity){     
    api.sentry.client.captureError(err);
  }
  
  //add custom reporter 
  api.exceptionHandlers.reporters.push(sentryErrorReporter);

  next();
};

module.exports = {
  loadPriority:  1000,
  startPriority: 1000,
  stopPriority:  1000,

  sentry: init,
  initialize: init
}