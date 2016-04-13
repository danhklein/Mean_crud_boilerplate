
app.service('studentDataService', ['crudService', function( crudService) {
  var data = [];

  return {
    getAllStudents: function () {
      crudService.getAll('students')
      .then(function(){
        console.log(students);
        return students;
      });

    }
  }

}])


app.service('crudService', ['$http', function($http) {
  return {
    getAll: function () {
      $http.get('/'+resource)
        .then(function(res) {
          return res;
        })
        .catch(function(err) {
          return err;
        });
    }
  };

}])