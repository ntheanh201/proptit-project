import express from 'express';
import { accountController } from '../controllers';
import {checkToken as authMiddleware} from '../middleware'

const accountRoute = express.Router();

accountRoute
  .route('/')
  .get((req, res) => {
    res.send(accountController.getAllUsers());
  })
  .post((req, res) => {
    res.sendStatus(201).send(accountController.addNewUser(req.body));
  })
  .patch((req, res) => {
    res.sendStatus(200).send(accountController.editUser(req.body));
  });
// .delete((req, res) => {
//   res.sendStatus(200).send()
// })

accountRoute.get('/userid=:id', (req, res) => {
  res.send(accountController.getUser(req.params.id));
});

export default accountRoute;
