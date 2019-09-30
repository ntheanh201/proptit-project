import jwt from 'jsonwebtoken';
import { secret } from '../configs';
// import {} from '../database'

class HandlerGenerator {
  login(req, res) {
    let { username, password } = req.body;
    // For the given username fetch user from DB
    let mockedUsername = 'admin';
    let mockedPassword = 'password';

    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        let token = jwt.sign({ username: username }, secret, {
          expiresIn: '24h',
        });

        return res.json({
          success: true,
          message: 'Authentication successful!',
          token,
        });
      } else {
        return res.json({
          success: false,
          message: 'Incorrect username or password',
        });
      }
    } else {
      return res.sendStatus(400).json({
        success: false,
        message: 'Authentication failed! Please check the request',
      });
    }
  }
  index(req, res) {
    return res.json({
      success: true,
      message: 'Index page',
    });
  }
}

export const authController = new HandlerGenerator();
