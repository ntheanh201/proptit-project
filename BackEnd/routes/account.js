
import express from 'express';
import {accountController} from '../controllers';
const accountRoute = express.Router()

accountRoute.route('/').get((req, res) => {
    res.status(200).send(accountController.getAllUsers())
})

accountRoute.route('/:id').get((req, res) => {
    // res.status(200).send()
})

accountRoute.route('/').post((req, res) => {

})
export const accountRoute