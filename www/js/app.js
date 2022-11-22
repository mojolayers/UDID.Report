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
  setTimeout(() => {
    caches.keys().then(function(names) {
      for (let name of names) {
        caches.delete(name);
      }
    });
    app.dialog.close();
    app.dialog.progress('Now Reloading')
    setTimeout(() => {
      location.reload();
    }, 300);
  }, 2000)
}

$(document).on('page:beforein', '.page[data-name="paper_plane"]', function (e) {
  const cookie = Object.fromEntries(document.cookie.split('; ').map(c => c.split('=')));
  // Check if device is enrolled via cookies.
  if (!("udid" in cookie)) {
    // No Exisiting Enrollment Found.
    $('.isEnrolled').text("Not Enrolled");
  } else {
    $('.isEnrolled').text("Enrolled");
    $('.udid-input').val(cookie['udid']);
  }
});

function generateUDID(deviceType) {
  /*
    UDID Template:
    0000....-00.,..,...,,...,

    Legend:
    | . | Replace with Random Number |
    | , | Replace with Random Letter |
  */
  var udid = "0000" + 
    generateRandom(0) + 
    generateRandom(0) + 
    generateRandom(0) + 
    generateRandom(0) + 
    "-00" + 
    generateRandom(0) + 
    generateRandom('') + 
    generateRandom(0) + 
    generateRandom(0) + 
    generateRandom('') + 
    generateRandom(0) + 
    generateRandom(0) + 
    generateRandom(0) + 
    generateRandom('') + 
    generateRandom('') + 
    generateRandom(0) + 
    generateRandom(0) + 
    generateRandom(0) + 
    generateRandom('');
  udid = udid.toUpperCase();
  return udid;
}

function generateRandom(type) {
  console.log(typeof type);
  const generate = typeof type;
  if (generate == "number") {
    return Math.floor(Math.random() * 10);
  } else if (generate == "string") {
    const alphabet = "abcdef";

    return alphabet[Math.floor(Math.random() * alphabet.length)];
  } else {
    console.log('Unknown Type');
    return "0";
  }
}