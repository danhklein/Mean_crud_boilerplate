

app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../partials/form.html',
        controller: 'myController'
      })

      .when('/register', {
        templateUrl: '../partials/register.html',
        controller: 'registerController'
      })

      .when('/login', {
        templateUrl: '../partials/login.html',
        controller: 'loginController'
      })

      .when('/logout', {
        templateUrl: '../partials/logout.html',
        controller: 'myController'
      })

      .otherwise({redirectTo: '/login'});
      $httpProvider.interceptors.push('AuthInterceptor')
});