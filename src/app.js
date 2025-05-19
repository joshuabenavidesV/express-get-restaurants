const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:

app.get("/resturants",async(request,response) => {
    const resturants = await Restaurant.findAll({});
    response.json(resturants);
})

module.exports = app;
