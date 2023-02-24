const express = require('express');
const router = express.Router();

const db = require('../db');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

//show all qr
router.get('/qr', function(req, res, next) {

    const sql = "SELECT * FROM qr ORDER BY qr_id DESC";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.setHeader('Content-Type', 'application/json');
      res.json([{status : true, data : rows, msg : "Catagories retrived successfully!"}])
    })
  });

  //qr status wise

  router.get('/qr/fromstatus/:status', function(req, res, next) {
    const status = req.params.status;
    const sql = `SELECT * FROM qr WHERE qr_use = ${status} ORDER BY qr_id DESC`;
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' });
      }
      if(rows.length > 0){
        res.setHeader('Content-Type', 'application/json');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json([{status : true, data : rows, msg : "Catagories retrived successfully!"}])
      }else{
        res.setHeader('Content-Type', 'application/json');
        res.setHeader("Access-Control-Allow-Origin", "*");
      res.json([{status : false, data : rows, msg : "Catagories retrived successfully!"}])
      }
      
    })
  });

//create qr

router.post('/qr/create', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    const qrunique = req.body.qrunique;
    const qruse = req.body.qruse;
    const qrreedemed = req.body.qrreedemed;
    const qrrupees = req.body.qrrupees;
    const qrreedemedby = req.body.qrreedemedby;
    const qrreedemstatus = req.body.qrreedemstatus;
  
    const sql = `INSERT INTO qr(qr_unique, qr_use, qr_reedemed, qr_rupees,qr_reedemedby,qr_reedemstatus) VALUES ('${qrunique}','${qruse}','${qrreedemed}','${qrrupees}','${qrreedemedby}','${qrreedemstatus}')`;
    
    db.query(sql, function(err, result) {
      if(err) {
        res.status(500).send({ error: 'Something failed!' })
      }
     
      res.status(200).send({'status': 'success', 'id': result.insertId})
    })
  });  
  







module.exports=router;