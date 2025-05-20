const express = require("express");
const { seedRestaurant } = require("../../seedData");
//Gets all
const restaurantRouter = express.Router();
restaurantRouter.get("/", (request,response)=>{
    response.json(seedRestaurant)
})
//Gets by individual ID
restaurantRouter.get("/:id", (request,response)=>{
    const id = Number(request.params.id)-1;
    const resturantID = seedRestaurant[id];
        response.json(resturantID);
})

// Creates
restaurantRouter.post("/", (request, response) => {
    const newRestaurant = request.body; 
    seedRestaurant.push(newRestaurant);
    response.status(201).json(newRestaurant) 
});
// Deletes
restaurantRouter.delete("/:id", (request, response) => {
    const id = Number(request.params.id)-1;
    const deletedRestaurant = seedRestaurant.splice(id, 1)[0];
        response.json({ message: "Restaurant has been deleted", deletedRestaurant });
});
//Modifies, updates
restaurantRouter.put("/:id", (request, response) => {
    const id = Number(request.params.id)-1;
    seedRestaurant[id] = request.body;
    response.json(seedRestaurant[id]);
});

module.exports= restaurantRouter;
