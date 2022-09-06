var $ = Dom7;


var app = new Framework7({
  name: 'UDID.Report', // App name
  theme: 'auto', // Automatic theme detection
  el: '#app', // App root element
  autoDarkMode: true, // Automatically apply dark mode based on system setting.

  // App store
  store: store,
  // App routes
  routes: routes,
  // App Views
  view: {
    browserHistory: true,
    browserHistoryOnLoad: true,
    browserHistoryInitialMatch: true,
  },
  // Register service worker
  serviceWorker: {
    path: '/service-worker.js',
  },
});

// Constants
const debug = true;

function clearCache() {
  app.dialog.progress('Clearing Caches / Updating Version');
  setTimeout(function() {
    caches.keys().then(function(names) {
      for (let name of names) {
        caches.delete(name);
      }
    });
    app.dialog.close();
  }, 2000)
}