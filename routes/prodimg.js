const express = require('express');
const router = express.Router();

const db = require('../db');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

//fetch productimageurl by productid



router.get('/prodimg/:prodid', function(req, res, next) {
    const prodid = req.params.prodid;
    const sql = `SELECT * FROM prodimg WHERE prodimg_prod = ${prodid}`;
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      if(rows.length > 0){
        res.setHeader('Content-Type', 'application/json');
        res.json([{status : true, data : rows, msg : "Products Image Url retrived successfully!"}])
      }else{
        res.setHeader('Content-Type', 'application/json');
      res.json([{status : false, data : rows, msg : "Products Image Url not found!"}])
      }
      
    })
  });






module.exports=router;