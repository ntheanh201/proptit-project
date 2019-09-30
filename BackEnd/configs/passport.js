import express from 'express'
import fs from 'fs'
import jwt from 'jsonwebtoken'

const passportRoute = express.Router();

passportRoute.get('/', (req, res) => {
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    let token = jwt.sign({'body': 'stuff'}, 'MySuperSecretPassPhrase', { algorithm: 'HS256'})
    return res.send(token);
})

export default passportRoute