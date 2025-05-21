const request = require("supertest");
const app = require("./src/app.js");
const Restaurant = require("./models");
const syncSeed = require("./seed.js");
let restQuantity;

beforeAll(async()=> {
    await syncSeed();
    const restaurant = await Restaurant.findAll({});
    restQuantity = restaurant.length;
})
describe('./test endpoint', () => {
test("Should return 200 on get", async()=>{
    const response = await request(app).get("/restaurants");
    expect(response.statusCode).toEqual(200);
})

test("Should return an array of restaurants", async()=>{
    const response = await request(app).get("/restaurants");
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("cuisine")
})

test("Should return correct restaurant data", async()=>{
    const response = await request(app).get("/restaurants");
    expect(response.body).toContainEqual(expect.objectContaining({
        name:"AppleBees",
        location:"Texas",
        cuisine:"FastFood",
    }))
})

test("Should return correct restaurant ", async()=>{
    const response = await request(app).get("/restaurants/1");
    expect(response.body).toEqual(expect.objectContaining({
        name:"AppleBees",
        location:"Texas",
        cuisine:"FastFood",
    }))
})

test("Should return larger restaurant  ", async()=>{
    const response = await request(app)
    .post("/restaurants")
    .send({name:"Mcdonalds",location:"New York", cuisine:"FastFood"})
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(expect.objectContaining({
        name: "Mcdonalds",
        location: "New York",
        cuisine: "FastFood"
    }));
});


test("Should update 1st item in DB  ", async()=>{
    const response = await request(app)
    .put("/restaurants/1")
    .send({name:"AppleBees",location:"New York", cuisine:"FastFood"})
const restaurant = await Restaurant.findByPk(1)
expect(restaurant.name).toEqual("AppleBees");
})
test("Should delete 4th item in DB", async()=> {
   const response = await request(app).delete("/restaurants/4");
   expect(response.statusCode).toBe(200);
   const deletedRestaurant = await Restaurant.findByPk(4);
   expect(deletedRestaurant).toBeNull(); 
});
// Day 4
test("should return 400 if name is missing", async () => {
    const response = await request(app)
      .post("/restaurants")
      .send({ location: "New York", cuisine: "Italian" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(Array.isArray(response.body.error)).toBe(true);
  });

  test("should create a restaurant if all fields are valid", async () => {
    const response = await request(app)
      .post("/restaurants")
      .send({ name: "Luigi's", location: "New York", cuisine: "Italian" });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("name", "Luigi's");
    expect(response.body).toHaveProperty("location", "New York");
    expect(response.body).toHaveProperty("cuisine", "Italian");
  });
});
