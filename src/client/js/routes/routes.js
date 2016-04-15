

app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../partials/form.html',
        controller: 'myController'
      })

      // .when('/register', {
      //   templateUrl: '../partials/register.html',
      //   controller: 'myController'
      // })

      // .when('/login', {
      //   templateUrl: '../partials/login.html',
      //   controller: 'myController'
      // })

      // .when('/logout', {
      //   templateUrl: '../partials/logout.html',
      //   controller: 'myController'
      // })

      .otherwise('/');
});