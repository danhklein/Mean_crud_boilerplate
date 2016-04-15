
app.service('studentDataService', ['crudService', function(crudService) {
  var data = [];

  return {
    getAllStudents: function () {
      return crudService.getAll('students')
      .then(function(students){

        return students;
      });
    },
    addStudent: function(payload) {
      console.log(payload);
      crudService.addOne('students', payload)
      .then(function(student) {
        return student;
      });
    },
    deleteStudent: function(payload) {

      crudService.deleteOne('students/', payload)
      .then(function(student) {

        return student;
      });
    },
  };
}])

app.service('crudService', ['$http', function($http) {
  return {
    getAll: function (resource) {
     return $http.get('/'+resource)
        .then(function(res) {
          return res;
        })
        .catch(function(err) {
          return err;
        });
    },
    addOne: function(resource, payload) {
      console.log(payload);
       return $http.post('/'+resource, payload)
        .then(function(res) {
          return res;
        })
        .catch(function(err) {
          return err;
        });
    },
    deleteOne: function(resource, payload) {
      return $http.delete('/'+resource + '/'+ uuid)
      .then(function(res) {
        return res;
      })
      .catch(function(err) {
        return err;
      });
    }
  };
}])

/**
1.login
2. register
3.get current user info
**/
app.service('authService', ['$http', '$window' function($http){
  var user = {};
  return {
    login: function(user) {
      return $http.post('/auth/login', user)
    },
    logout: function(user) {
      user = null;
      $window.localStorage.clear();
      },
    register: function(user) {
      return $http.post('/auth/register', user)
    },
    setUserInfo: function(userData) {
      $window.localStorage.set('user', '[PLACEHOLDER]');
      $window.localStorage.set('token', '[PLACEHOLDER]');
    },
    getUserInfo: function(userData) {
      $window.localStorage.get('user', '[PLACEHOLDER]');

    }
  };
}]);