app.controller('addStudentController', ['$scope',  'studentDataService',
  function($scope, studentDataService){

    studentDataService.getAllStudents()
    .then(function(students) {
      $scope.allStudents = students.data.data
      console.log($scope.allStudents);
    })

    $scope.student = {};

    $scope.addStudent = function() {
      console.log($scope.student);
studentDataService.addStudent($scope.student);
      $scope.student = {};
    }

  }])

app.controller('registerController', ['$scope', '$location', 'authService',
  function($scope, location, authService) {
  $scope.user = {};
  $scope.register = function() {

    authService.register($scope.user)
      .then(function(user) {
        authService.setUserInfo(user);
        $location.path('/')
      })
      .catch(function(err){
        //check status code,
        //send appropriate message
        console.log(err);
      });
  };
}])

app.controller('loginController', ['$scope', '$location', 'authService',
  function($scope) {
  $scope.user = {};
  $scope.login = function() {
   authService.login($scope.user)

    .then(function(user) {

      authService.setUserInfo(user);
      $location.path('/')

    })
    .catch(function(err){
      //check status code,
      //send appropriate message
      console.log(err);

    });
};
}])