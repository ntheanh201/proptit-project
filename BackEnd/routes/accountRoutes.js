import express from 'express';
import { accountController } from '../controllers';

const accountRoute = express.Router();

<<<<<<< Updated upstream
accountRoute.route('/').get((req, res, next) => {
  // res.json({message: 'get all users'})
  res.status(200).send(accountController.getAllUsers());
  next();
});

accountRoute.route('/userid=:id').get((req, res, next) => {
  res.status(200).send(accountController.getUser(req.params.id));
  next();
});
=======
accountRoute
  .route('/')
  .get((req, res) => {
    return res.status(200).send(accountController.getAllUsers());
  })
  .patch((req, res) => {
    return res.status(200).send(accountController.editUser(req.body));
  })
  .post((req, res) => {
    console.log(req.body)
    return res.status(200).send(accountController.addNewUser(req.body))
  });
  // .delete((req, res) => {
    // return res.status(200).send()
  // })
>>>>>>> Stashed changes

accountRoute.get('/userid=:id', (req, res) => {
  return res.status(200).send(accountController.getUser(req.params.id));
});

export default accountRoute;
