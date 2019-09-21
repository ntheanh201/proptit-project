
import express from 'express';
import { ProService } from './controller';
var app = express()
const ProRoute = express.Router()

ProRoute.route('/').get((req, res) => {
    console.log("GET Homepage");
    // res.status(200).send(ProService.get...)
})

export default ProRoute