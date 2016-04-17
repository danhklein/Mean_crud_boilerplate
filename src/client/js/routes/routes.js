

app.config(function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../partials/form.html',
        controller: 'myController',
        preventLoggedIn: false
      })

      .when('/register', {
        templateUrl: '../partials/register.html',
        controller: 'registerController',
        restricted: false,
        preventLoggedIn:true

      })

      .when('/login', {
        templateUrl: '../partials/login.html',
        controller: 'loginController',
        restricted: false,
        preventLoggedIn:true
      })

      .when('/logout', {
        restricted: false,
        preventLoggeIn:false,
        resolve:  {
          test: function(authService, $location) {
            authService.logout();
            $location.path('login');
        }
      }
    })

      .otherwise({redirectTo: '/login'});
      $httpProvider.interceptors.push('authInterceptor')
});

app.run(function($rootScope, $location, $window, authService) {
  //check if the token is there
  $rootScope.$on('$routeChangeStart', function(even, next, current) {
    //if restricted and no token
    if(next.restricted && !$window.localStorage.getItem('token')) {
      $location.path('/login');
    }
    if (next.preventLoggedIn && $window.localStorage.getItem('token')) {
      $location.path('/');
    }
  });
});

