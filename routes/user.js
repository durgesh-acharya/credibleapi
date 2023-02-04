const express = require('express');
const router = express.Router();

const db = require('../db');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// fetch all users
router.get('/user', function(req, res, next) {

    const sql = "SELECT * FROM user";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.setHeader('Content-Type', 'application/json');
      res.json([{status : true, data : rows, msg : "Users retrived successfully!"}])
    })
  });

  //user existence check
 
router.get('/user/exist/:mobile/:status', function(req, res, next) {
    const mobile = req.params.mobile;
    const activestts = req.params.status;
  
    const sql = "SELECT * FROM user WHERE user_mobile = ? AND user_active = ?";
    db.query(sql,[mobile,activestts], function(err, row, fields) {
      if(err) {
        console.log(err);
        res.status(500).send({ error: 'Something failed!' })
      } if(row.length > 0){
        res.json([{status : true, data : row[0], msg : "User retrived successfully through id!"}])
      }else{
        res.json([{status : false, msg : "No User found"}])
      }
        
    })
  });
  



module.exports=router;