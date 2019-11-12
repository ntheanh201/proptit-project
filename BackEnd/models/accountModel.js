import { connection } from '../database';

export const get_users_method = (filterID, result) => {
  let query = `SELECT * FROM users`;
  if (filterID) query += `WHERE id = "${filterID}"`;
  connection.query(query, (error, res) => {
    if (error) {
      console.log(error);
      return;
    }
    result(null, res);
  });
};

export const post_user_method = (
  {
    id,
    username,
    password,
    displayName,
    dateOfBirth,
    className,
    phoneNumber,
    email,
    facebook,
    description,
  },
  result,
) => {
  connection.query(
    `INSERT INTO users(id, username, password, displayName, dateOfBirth, className, phoneNumber, email, facebook, description) VALUES ('${id}','${username}','${password}', '${displayName}', '${dateOfBirth}', '${className}', '${phoneNumber}', '${email}', '${facebook}', '${description}')`,
    (error, res) => {
      if (error) {
        console.log(error);
        return;
      }
      //   let user = JSON.parse(JSON.stringify(res[0]));
      result(null, res);
    },
  );
};

export const patch_user_method = (user, result) => {
  connection.query(
    `UPDATE users SET username = "${user.username}", password = "${user.password}", displayName = "${user.displayName}", className = "${user.className}", dateOfBirth = "${user.dateOfBirth}", phoneNumber = "${user.phoneNumber}", email = "${user.email}", facebook = "${user.facebook}", description = "${user.description}" WHERE id = "${user.id}"`,
    (err, res) => {
      if (err) result(err, null);
      result(null, res);
    },
  );
};

export const delete_user_method = (user, result) => {
  connection.query(`DELETE FROM users WHERE id = "${user.id}"`, (err, res) => {
    if (err) result(err, null);
    result(null, res);
  });
};
