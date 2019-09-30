import express from "express";
// import {} from './controllers';

const newsRoute = express.Router();
newsRoute.route('/proptit/news');

newsRoute.route("/").get((req, res) => {
  console.log("GET Homepage");
  res.status(200).send("hihi");
});

export default newsRoute;
