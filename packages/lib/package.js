Package.describe({
  name: 'skawe:lib',
  version: '0.0.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.10.1');
  
  var packages = [
    'meteor-base@1.4.0',
    'mongo@1.10.0',
    'tracker@1.2.0',
    'reactive-var@1.0.11',

    'standard-minifier-css@1.6.0',
    'standard-minifier-js@2.6.0',
    'es5-shim@4.8.0',
    'ecmascript@0.14.3',

    'server-render',
    'check',
    'http',
    'email',
    'react-meteor-data@2.1.0',

    'underscore',
  ]

  api.use(packages);
  api.imply(packages);

  api.export('Skawe');

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');
});
