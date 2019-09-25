
import express from 'express';
// import { } from './controllers';
const newsRoute = express.Router()

newsRoute.route('/').get((req, res) => {
    console.log("GET Homepage");
    // res.status(200).send(ProService.get...)
})

export const newsRoute