process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app');
var should = chai.should();
var testUtilities = require('../utilities')
var testSeed = require('../../src/server/models/seeds/test-seed')
var Students = require('../../src/server/models/students');

chai.use(chaiHttp);


describe('student routes', function() {


  beforeEach(function(done) {
    //drop db
    testUtilities.dropDatabase();
    //run seed
    testSeed.runSeed(done)

  });

  afterEach(function(done) {
    //dropdb
   testUtilities.dropDatabase(done);
  });

  describe('/GET STUDENTS', function() {
    it('should return all students', function(done) {
      chai.request(server)
      .get('/students')
      .end(function(err, res) {
        res.status.should.equal(200);
        res.type.should.equal('application/json');

        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');

        res.body.status.should.equal('success');

        res.body.data.should.be.a('array');
        res.body.data.length.should.equal(1);

        res.body.data[0].firstName.should.equal('Kevin');
        res.body.data[0].lastName.should.equal('Schwartz');
        res.body.data[0].year.should.equal(2001);
        done();
      })
    });
  });

  describe('/GET students/:id', function() {
    it('should return a single student', function(done) {
      Students.findOne(function(err, student) {
        var studentID = student._id;
                chai.request(server)
                .get('/students/'+studentID)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.type.should.equal('application/json');
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    res.body.should.have.property('data');
                    res.body.status.should.equal('success');
                    res.body.data.should.be.a('array');
                    res.body.data.length.should.equal(1);
                    res.body.data[0].firstName.should.equal('Kevin');
                    res.body.data[0].lastName.should.equal('Schwartz');
                    res.body.data[0].year.should.equal(2001);
                    done();
                })
            })
        });
    });

   describe('/POST STUDENTS', function () {
    it('should add a student', function(done) {
      chai.request(server)
      .post('/students')
      .send({
        firstName: 'Dan',
        lastName: 'Klein',
        year: 2039
        })
      .end(function(err,res) {
        console.log(res.body)
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.should.be.a('object');
        res.body.data.firstName.should.equal('Dan');
        res.body.data.lastName.should.equal('Klein');
        res.body.data.year.should.equal(2039);
        done();

      })
    });
  });

    describe('Put', function() {

      it('should update a SINGLE student', function(done) {
      chai.request(server)
      .get('/students')
      .end(function(err, response){
        chai.request(server)
          .put('/students/update/' + response.body.data[0]._id)
          .send({ lastName: 'Njeru' })
          .end(function(error, res){
            res.body.data.lastName.should.equal('Njeru');
            done();
          });
        });
      });
    });


    describe('DELETE from students', function() {
      it('should delete a student', function(done) {
        Students.findOne(function(err, student) {
        var studentID = student._id;
        chai.request(server)
        .delete('/students/'+studentID)
        .end(function(err, res) {
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.equal('success');
          done();
        });
      });
    });
  });



});