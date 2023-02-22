const express = require('express');
const router = express.Router();

const db = require('../db');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

//create qr

router.post('/qr/create', function(req, res, next) {
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