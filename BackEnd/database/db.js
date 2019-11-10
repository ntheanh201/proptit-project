import mysql from 'mysql2';

//   host: '35.240.232.224',
//   user: 'root',
//   password: '',
//   port: '',
//   database: 'proptit',

export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '8889',
  database: 'proptit',
});

connection.query(
  'INSERT INTO `users`(`id`, `username`, `password`, `displayName`, `dateOfBirth`, `className`, `phoneNumber`, `email`, `facebook`, `description`) VALUES ("24b4e8a6-cfd3-4c91-8348-47f9d2c16813","proptit_username","proptit_password","Proptit","1999/12/01","B17DCCN046","123456789","abcde12345@gmail.com","fb.com/users","Some text here")',
  function(err, results, fields) {
    console.log(results);
    console.log(fields);
  },
);
