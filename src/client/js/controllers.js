app.controller('addStudentController', ['$scope', 'studentDataService',
  function($scope, studentDataService){

    $scope.student = {};

    $scope.addStudent = function() {
      console.log($scope.student);
studentDataService.addStudent($scope.student);
      $scope.student = {};
    }

  }])