import mysql from 'mysql2';

//   host: '35.240.232.224',
//   user: 'root',
//   password: '',
//   port: '',
//   database: 'proptit',

// host: 'localhost',
//   user: 'root',
//   password: 'root',
//   port: '8889',
//   database: 'proptit',

export const connection = mysql.createConnection({
  host: '35.240.232.224',
  user: 'root',
  password: '',
  port: '',
  database: 'proptit',
});

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'proptit',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const getUsers = result => {
  connection.query(`SELECT * FROM users`, (error, res) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log('Users Data', res);
    result(null, res);
  });
};

export const addUsers = () =>
  connection.query(
    'INSERT INTO `users`(`id`, `username`, `password`, `displayName`, `dateOfBirth`, `className`, `phoneNumber`, `email`, `facebook`, `description`) VALUES ("24b4e8a6-cfd3-4c91-8348-47f9d2c1681","proptit_username","proptit_password","Proptit","1999/12/01","B17DCCN046","123456789","abcde12345@gmail.com","fb.com/users","Some text here11111")',
    (error, results = [], fields) => {
      if (error) {
        // console.log(error);
        return;
      }
      let rows = JSON.parse(JSON.stringify(results[0]));
      return rows;
    },
  );

connection.query('', function() {});
