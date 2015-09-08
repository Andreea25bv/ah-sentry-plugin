var raven = require('raven');  

module.exports = {
  loadPriority:  1000,
  startPriority: 1000,
  stopPriority:  1000,
  initialize: function(api, next){
    
    var client = new raven.Client(api.config.sentry.dns);

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
  }
}