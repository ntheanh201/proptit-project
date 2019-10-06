import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'proptit',
});

connection.query(
  'SELECT * FROM `users` WHERE `name` = "proptit"',
  function(err, results, fields) {
    console.log(results);
    console.log(fields);
  }
);