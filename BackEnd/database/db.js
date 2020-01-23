import mysql from 'mysql2';

export const connection = mysql.createConnection({
  host: '35.220.172.23',
  user: 'root',
  password: 'Nghia.123',
  port: '3306',
  database: 'proptit_network',
});

// export const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   port: '8889',
//   database: 'proptit',
// });

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'proptit',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });
