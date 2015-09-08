require('../lib/resource');

/**
 * sentry configuration.
 */

exports.default = {
  sentry: function(api){
    return {
      dsn      :'https://<key>:<secret>@example.dsn.com/<project>'          
    }
  }
}


//Passing any falsey value as the DSN will disable sending events upstream -> sentry is disabled during tests
exports.test = {
  sentry: function(api){
    return {
      dsn      : false
    }
  }
}
