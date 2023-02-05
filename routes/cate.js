const express = require('express');
const router = express.Router();

const db = require('../db');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// fetch all categories
router.get('/cate', function(req, res, next) {

    const sql = "SELECT * FROM cate";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.setHeader('Content-Type', 'application/json');
      res.json([{status : true, data : rows, msg : "Catagories retrived successfully!"}])
    })
  });

  //fetch active categories

  router.get('/cate/active', function(req, res, next) {
    const status = 1;
    const sql = `SELECT * FROM cate WHERE cate_active = ${status}`;
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.setHeader('Content-Type', 'application/json');
      res.json([{status : true, data : rows, msg : "Catagories retrived successfully!"}])
    })
  });
  




module.exports=router;