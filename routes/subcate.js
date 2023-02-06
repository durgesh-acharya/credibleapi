const express = require('express');
const router = express.Router();

const db = require('../db');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// fetch all sub-categories
router.get('/subcate', function(req, res, next) {

    const sql = "SELECT * FROM subcate";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.setHeader('Content-Type', 'application/json');
      res.json([{status : true, data : rows, msg : "Sub-Catagories retrived successfully!"}])
    })
  });

   //fetch active sub-categories

   router.get('/subcate/active', function(req, res, next) {
    const status = 1;
    const sql = `SELECT * FROM subcate WHERE subcate_status = ${status}`;
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      if(rows.length > 0){
        res.setHeader('Content-Type', 'application/json');
        res.json([{status : true, data : rows, msg : "Catagories retrived successfully!"}])
      }else{
        res.setHeader('Content-Type', 'application/json');
      res.json([{status : false, data : rows, msg : "No Sub category to show!"}])
      }
      
    })
  });

  //fetch sub category by category id

  router.get('/subcate/:cate/:status', function(req, res, next) {
    const cate = req.params.cate;
    const status = req.params.status;
  
    const sql = "SELECT * FROM subcate WHERE subcate_cate = ? AND subcate_status = ?";
    db.query(sql,[cate,status], function(err, rows, fields) {
      if(err) {
        console.log(err);
        res.status(500).send({ error: 'Something failed!' })
      } if(rows.length > 0){
        res.json([{status : true, data : rows, msg : "User retrived successfully through id!"}])
      }else{
        res.json([{status : false, msg : "No User found"}])
      }
        
    })
  });

  



  module.exports = router;