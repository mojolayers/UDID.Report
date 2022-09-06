
var routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    // Might delete this route as if it doesn't implement well.
    path: '/about/',
    url: './pages/about.html',
  },
  {
    path: '/emelda/',
    url: './pages/udid.html',
  },
  {
    path: '/emelda-test/',
    async: function ({ router, to, resolve }) {
      // Access app instance
      var app = router.app;
      
      // Access Cookies
      const cookie = Object.fromEntries(document.cookie.split('; ').map(c => c.split('=')));
      var udidCookie = "";
      var isEnrolled = false;

      // Check if device is enrolled via cookies.
      if (!("udid" in cookie)) {
        // No Exisiting Enrollment Found.
        udidCookie = 'No UDID Saved, please Enroll.';
      } else {
        udidCookie = cookie['udid'];
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
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
