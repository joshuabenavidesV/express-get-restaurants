const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

const restaurantRouter = require("./Routes/index")


//TODO: Create your GET Request Route Below:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/restaurants",restaurantRouter);
// app.get("/restaurants",async(request,response) => {
//     const restaurants = await Restaurant.findAll();
//     response.json(restaurants);
// })

// app.get("/restaurants/:id", async (request, response) => {
//   const id = request.params.id;
//   const restaurant = await Restaurant.findByPk(id);
//   if (restaurant) {
//     response.json(restaurant);
//   } else {
//     response.status(404).json({ error_message: "Restaurant not found" });
//   }
// });
// // Creating a new resturant
// app.post("/restaurants", async (request, response) => {
//      const newRestaurant = await Restaurant.create(request.body);
//      response.json(newRestaurant);
// });
// //Update
// app.put("/restaurants/:id", async (request, response) => {
//   const id = request.params.id;
//   await Restaurant.update(request.body, { where: { id } });
//   const updatedRestaurant = await Restaurant.findByPk(id);
//   response.json(updatedRestaurant);
// });
// // Deleting restaurant 
// app.delete("/restaurants/:id", async (request, response) => {
//   const id = request.params.id;
//   const deleted = await Restaurant.destroy({ where: { id } });
//   if (deleted) {
//     response.json({ message: "Restaurant deleted" });
//   } else {
//     response.status(404).json({ message: "Restaurant not found" });
//   }
// });

// Creating a new resturant in a specific ID  Wanted to see if I could get the ID spot 4 back
// app.post("/restaurants/:id", async (request, response) => {
//     const id = request.params.id;
//      const newRestaurant = await Restaurant.create(request.body, { where: { id } });
//      response.json(newRestaurant);
// });


module.exports = app;
