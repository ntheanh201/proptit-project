import { connection } from '../database';

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

export const addUser = (
  {
    id,
    username,
    password,
    displayName,
    className,
    dateOfBirth,
    phoneNumber,
    email,
    facebook,
    description,
  },
  result,
) => {
  connection.query(
    `INSERT INTO users(id, username, password, displayName, className, dateOfBirth, phoneNumber, email, facebook, description) VALUES ('${id}','${username}','${password}', '${displayName}', '${className}', '${dateOfBirth}', '${phoneNumber}', '${email}', '${facebook}', '${description}')`,
    (error, res) => {
      if (error) {
        return;
      }
      let user = JSON.parse(JSON.stringify(res[0]));
      result(null, user);
    },
  );
};
