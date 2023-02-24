const express = require('express');
const router = express.Router();

const db = require('../db');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
var cors = require('cors')

//show all reedem requests
router.get('/reedem', function(req, res, next) {

    const sql = "SELECT * FROM reedem ORDER BY rr_id DESC";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.setHeader('Content-Type', 'application/json');
      res.json([{status : true, data : rows, msg : "Reedem Request retrived successfully!"}])
    })
  });

//reedem madeby
router.get('/reedem/frommadeby/:madeby', function(req, res, next) {
    const madeby = req.params.madeby;
    const sql = `SELECT * FROM reedem WHERE rr_madeby = ${madeby} ORDER BY rr_id DESC`;
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' });
      }
      if(rows.length > 0){
        res.setHeader('Content-Type', 'application/json');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json([{status : true, data : rows, msg : "Reedem Request retrived successfully!"}])
      }else{
        res.setHeader('Content-Type', 'application/json');
        res.setHeader("Access-Control-Allow-Origin", "*");
      res.json([{status : false, data : rows, msg : "Reedem Request retrived successfully!"}])
      }
      
    })
  });

// reedem create

router.options('/reedem/create', cors())
router.post('/reedem/create',cors(), function(req, res, next) {
 
    const rrqrid = req.body.rrqrid;
    const rrqrunique = req.body.rrqrunique;
    const rrqrrupees = req.body.rrqrrupees;
    const rrmadeby = req.body.rrmadeby;
    const rrupiid = req.body.rrupiid;
    const rrtranid = req.body.rrtranid;
    
  
    const sql = `INSERT INTO reedem(rr_qrid, rr_qrunique, qr_rupees, rr_madeby, rr_upiid, rr_tranid) VALUES ('${rrqrid}','${rrqrunique}','${rrqrrupees}','${rrmadeby}','${rrupiid}','${rrtranid}')`;
    
    db.query(sql, function(err, result) {
      if(err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.setHeader('Access-Control-Allow-Origin', '*');
      // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.status(200).send({'status': 'success', 'id': result.insertId})
    })
  });  





module.exports=router;