import express from 'express';
import { accountController } from '../controllers';

const accountRoute = express.Router();

accountRoute
  .route('/')
  .get((req, res) => {
    return res.status(200).send(accountController.getAllUsers());
  })
  .post((req, res) => {
    return res.status(200).send(accountController.addNewUser(req.body))
  })
  .patch((req, res) => {
    return res.status(200).send(accountController.editUser(req.body));
  })
  // .delete((req, res) => {
    // return res.status(200).send()
  // })

accountRoute.get('/userid=:id', (req, res) => {
  return res.status(200).send(accountController.getUser(req.params.id));
});

export default accountRoute;
