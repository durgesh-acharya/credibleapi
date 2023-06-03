const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'csarestored.cbry7ay6kppv.ap-northeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'csa55000',
  database: 'crediblesteel'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to database successfully!');
});

module.exports = connection;