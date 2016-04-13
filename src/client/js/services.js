
app.service('studentDataService', ['crudService', function(crudService) {
  var data = [];

  return {
    getAllStudents: function () {
      crudService.getAll('students')
      .then(function(){
        console.log(students);
        return students;
      });
    },
    addStudent: function(payload) {
      console.log(payload)
      crudService.addOne('students', payload)
      .then(function(student) {
        console.log(student);
        return student;
      });
    }
  };

}])


app.service('crudService', ['$http', function($http) {
  return {
    getAll: function () {
     return $http.get('/'+resource)
        .then(function(res) {
          return res;
        })
        .catch(function(err) {
          return err;
        });
    },
    addOne: function(resource, payload) {
       return $http.post('/'+resource, payload)
        .then(function(res) {
          return res;
        })
        .catch(function(err) {
          return err;
        });

    }
  };

}])