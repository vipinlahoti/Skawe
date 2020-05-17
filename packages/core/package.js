Package.describe({
  name: 'grudr:core',
  version: '0.0.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.10.1');
  
  api.use([
    'grudr:lib'
  ]);

  api.imply(['grudr:lib']);

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');
});
