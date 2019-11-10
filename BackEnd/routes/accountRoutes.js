import express from 'express';
import { accountController } from '../controllers';
import { checkToken as authMiddleware } from '../middleware';

const accountRoute = express.Router();

accountRoute
  .route('/')
  .get((req, res) => {
    accountController.getAllUsers(req, res);
  })
  .post((req, res) => {
    accountController.addNewUser(req.body, res);
  })
  .patch(authMiddleware, (req, res) => {
    accountController.editUser(req.body, res);
  });
// .delete((req, res) => {
//   res.sendStatus(200).send()
// })

accountRoute.get('/userid=:id', authMiddleware, (req, res) => {
  accountController.getUser(req.params.id, res);
});

export default accountRoute;
