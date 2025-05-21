const express = require("express");
const  Restaurant = require('../../models');
const restaurantRouter = express.Router();

//Gets all
restaurantRouter.get("/", async (request, response) => {
  const restaurants = await Restaurant.findAll();
  response.json(restaurants);
});
// Gets by individual ID
restaurantRouter.get("/:id", async (request, response) => {
  const restaurant = await Restaurant.findByPk(request.params.id);
    response.json(restaurant);
  });

// Creates
restaurantRouter.post("/", async (request, response) => {
  const newRestaurant = await Restaurant.create(request.body);
  response.status(201).json(newRestaurant);
});
// Deletes
restaurantRouter.delete("/:id", async (request, response) => {
  const deleted = await Restaurant.destroy({ where: { id: request.params.id } });
    response.json({ message: "Restaurant has been deleted" });
});
//Modifies, updates
restaurantRouter.put("/:id", async (request, response) => {
  const [updatedRows] = await Restaurant.update(request.body, { where: { id: request.params.id } });
    const updatedRestaurant = await Restaurant.findByPk(request.params.id);
    response.json(updatedRestaurant);
});

module.exports= restaurantRouter;
