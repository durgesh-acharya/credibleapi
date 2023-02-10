const express = require('express');
const router = express.Router();

const db = require('../db');
const bodyParser = require('body-parser');

router.use(bodyParser.json());


//fetch all products

router.get('/prod', function(req, res, next) {

    const sql = "SELECT * FROM prod";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.setHeader('Content-Type', 'application/json');
      res.json([{status : true, data : rows, msg : "Products retrived successfully!"}])
    })
  });

//fetch active products

router.get('/prod/active', function(req, res, next) {
    const status = 1;
    const sql = `SELECT * FROM prod WHERE prod_status = ${status}`;
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      if(rows.length > 0){
        res.setHeader('Content-Type', 'application/json');
        res.json([{status : true, data : rows, msg : "Products retrived successfully!"}])
      }else{
        res.setHeader('Content-Type', 'application/json');
      res.json([{status : false, data : rows, msg : "Products not found!"}])
      }
      
    })
  });
  
  //fetch active products by category and sub category

  router.get('/prod/byparam/:cate/:subcate/:status', function(req, res, next) {
    const cate = req.params.cate;
    const subcate = req.params.subcate;
    const status = req.params.status;
  
    const sql = "SELECT * FROM prod WHERE prod_cate = ? AND prod_subcate = ? AND prod_status = ?";
    db.query(sql,[cate,subcate,status], function(err, rows, fields) {
      if(err) {
        console.log(err);
        res.status(500).send({ error: 'Something failed!' })
      } if(rows.length > 0){
        res.json([{status : true, data : rows, msg : "Product retrived successfully through id!"}])
      }else{
        res.json([{status : false, msg : "No Product found"}])
      }
        
    })
  });
//fetch product through product id

router.get('/prod/byid/:id', function(req, res, next) {
  const prodid = req.params.id;
  const sql = `SELECT * FROM prod WHERE prod_id = ${prodid}`;
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    if(rows.length > 0){
      res.setHeader('Content-Type', 'application/json');
      res.json([{status : true, data : rows, msg : "Products retrived successfully!"}])
    }else{
      res.setHeader('Content-Type', 'application/json');
    res.json([{status : false, data : rows, msg : "Products not found!"}])
    }
    
  })
});

// fetch product except one
//  fetch active products by category and sub category

 router.get('/prod/byparam/eone/:prodid/:cate/:subcate', function(req, res, next) {
  const cate = req.params.cate;
  const subcate = req.params.subcate;
  const prodid = req.params.prodid;

  const sql = "SELECT * FROM prod WHERE prod_id <> ? AND prod_cate = ? AND prod_subcate = ?";
  db.query(sql,[prodid,cate,subcate], function(err, rows, fields) {
    if(err) {
      console.log(err);
      res.status(500).send({ error: 'Something failed!' })
    } if(rows.length > 0){
      res.json([{status : true, data : rows, msg : "Product retrived successfully through id!"}])
    }else{
      res.json([{status : false, msg : "No Product found"}])
    }
      
  })
})


module.exports=router;