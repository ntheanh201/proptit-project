import express from 'express';
import { accountController } from '../controllers';

const accountRoute = express.Router();
// accountRoute.route("/account");

accountRoute.route('/').get((req, res, next) => {
  res.status(200).send(accountController.getAllUsers());
  next();
});

accountRoute.route('/userid=:id').get((req, res, next) => {
  res.status(200).send(accountController.getUser(req.params.id));
  next();
});

accountRoute.route('/').patch((req, res, next) => {
  res.status(200).send(accountController.editUser(req.body));
});

// accountRoute.route("/:id").get((req, res, next) => {
// res.status(200).send()
// });

// accountRoute.route("/").post((req, res, next) => {});

export default accountRoute;
