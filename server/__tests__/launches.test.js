const request = require("supertest");
const app = require("../src/app");

describe("GET /launches", () => {
  test("should return 200 ok", async () => {
    let response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("POST /launches", () => {
  const data = {
    mission: "USS  Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-186 f",
    launchDate: "January 4, 2028",
  };

  const dataWithoutDate = {
    mission: "USS  Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-186 f",
  };

  const dataWithInvalidDate = {
    mission: "USS  Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-186 f",
    launchDate: "zeeboo",
  };

  const missingData = {
    rocket: "NCC 1701-D",
    target: "Kepler-186 f",
    launchDate: "January 4, 2028",
  };

  test("It should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(data.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(requestDate).toBe(responseDate);
    expect(response.body).toMatchObject(dataWithoutDate);
  });

   test("It should catch missing required properties", async () => {
     const response = await request(app)
       .post("/launches")
       .send(missingData)
       .expect("Content-Type", /json/)
       .expect(400);

     expect(response.body).toStrictEqual({
       error: "Mission required launch properties",
     });
   });

  test("It should catch invalid  date", async () => {
    const response = await request(app)
      .post("/launches")
      .send(dataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({ error: "Invalid date format" });
  });
});
