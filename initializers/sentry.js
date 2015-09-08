var raven = require('raven');  

var init = function(api, next){    
  var client = new raven.Client(api.config.sentry.dsn);

  api.sentry = {
      client: client
  }
    
  //create a custom error reporter that sends error to sentry
  var sentryErrorReporter = function(err, type, name, objects, severity){    
     var options = {
      level: severity,
      extra: {
        error_type: type,
        name: name        
     }
    };

    if(type=='action'){
      var user = {
        id: objects.connection.user.id,
        email: objects.connection.user.email,
        ip: objects.connection.remoteIP
      };
      options.user = user;
      options.params = objects.connection.params;
    }  

    api.sentry.client.captureError(err, options);
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