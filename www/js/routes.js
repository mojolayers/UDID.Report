
var routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/paper-plane/',
    name: 'paper_plane',
    url: './pages/paper_plane.html',
  },
  {
    path: '/emelda/',
    async: function ({ router, to, resolve }) {
      // Access app instance
      var app = router.app;
      
      // Access Cookies
      const cookie = Object.fromEntries(document.cookie.split('; ').map(c => c.split('=')));
      var udidCookie = "";
      var isEnrolled = false;

      // Check if device is enrolled via cookies.
      if (!("udid-local" in cookie)) {
        // No Exisiting Enrollment Found.
        udidCookie = 'No UDID Saved, please Enroll.';
      } else {
        udidCookie = cookie['udid-local'];
        isEnrolled = true;
      }

      var deviceProfile = {
        id: 0,
        udid: udidCookie,
        isEnrolled: isEnrolled
      };

      // Resolve route to load page
      resolve(
        {
          componentUrl: './pages/udid-template.html',
        },
        {
          props: {
            deviceProfile: deviceProfile,
          }
        }
      );
    },
  },
  {
    /*
      Wild Flower is the internal name for UDID.Report's User Interface
      This page exists to allow for debugging the User Interface.
    */
    path: '/wild-flower/',
    async: function ({ router, to, resolve }) {
      // Access app instance
      var app = router.app;
      
      // Access Cookies
      const cookie = Object.fromEntries(document.cookie.split('; ').map(c => c.split('=')));
      var udidCookie = "";
      var isEnrolled = false;

      // Check if device is enrolled via cookies.
      if (!("udid-local" in cookie)) {
        // No Exisiting Enrollment Found.
        udidCookie = 'No UDID Saved, please Enroll.';
      } else {
        udidCookie = cookie['udid-local'];
        isEnrolled = true;
      }

      var deviceProfile = {
        id: 0,
        udid: udidCookie,
        isEnrolled: isEnrolled,
        prefersColorScheme: app.device.prefersColorScheme(),
      };

      // Resolve route to load page
      resolve(
        {
          componentUrl: './pages/wild-flower.html',
        },
        {
          props: {
            deviceProfile: deviceProfile,
          }
        }
      );
    },
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
