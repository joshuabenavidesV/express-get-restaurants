const express = require("express");
const  Restaurant = require('../../models');
const restaurantRouter = express.Router();
const {check, validationResult} = require("express-validator");

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
restaurantRouter.post("/",[check("name").not().isEmpty().trim(), check("location").not().isEmpty().trim(), check("cuisine").not().isEmpty().trim()],  async (request, response, next) => {
  const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ error: errors.array() });
    } else {
    const newRestaurant = await Restaurant.create(request.body);
    response.status(201).json(newRestaurant);
    }
  }
);
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
