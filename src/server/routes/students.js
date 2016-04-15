var express = require('express');
var router = express.Router();


var Students = require('../models/students')



router.get('/', function(req, res, next) {
  Students.find({})
    .then(function(students) {
      res.status(200).json({
        status: 'success',
        data: students
        })
      })
    .catch(function(err) {
      return err;
    })
});

router.get('/:id', function(req, res, next) {
    Students.find({_id: req.params.id})
    .then(function(students) {
      res.status(200).json({
        status: 'success',
        data: students
        })
      })
    .catch(function(err) {
      return err;
    })
});

router.post('/', function(req, res, next) {
  console.log('req.body:', req.body)
  var student = Students(req.body)
  student.save()
  .then(function(students) {
    res.status(200).json({
      status: 'success',
      data: students
      })
    })
  .catch(function(err) {
      return err;
    })
});


router.put('/:id', function(req, res, next) {
  Students.findByIdAndUpdate( req.params.id, req.body, { new: true })
  .then(function(students) {
    res.status(200).json({
      status: 'success',
      data: students
      })
    })
  .catch(function(err) {
      return err;
    })
});

router.delete('/:id', function(req, res, next) {
   Students.remove({ _id: req.params.id })
   .then(function(students) {
    res.status(200).json({
      status: 'success',
      data: students
      })
    })
  .catch(function(err) {
      return err;
    })
});
module.exports = router;
