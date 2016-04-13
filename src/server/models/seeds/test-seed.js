var Students = require('../students')

var data = [
  {
    firstName: 'Kevin',
    lastName: 'Schwartz',
    year: 2001
  }

]

var postTest = {
  firstName: 'JoeJoe',
  lastName: 'Horseradish',
  year: 2009
}

function runSeed(done) {
  var students = new Students(data[0]);
  students.save(function(err, res) {
     done();
  })
}

module.exports = {
  runSeed: runSeed
};