const request = require("supertest");

const server = require("../api/server");

const testUser = {
  //generates a random string
  username:
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15),
  password: "pass"
};

let oldUser = {
  username: "vtbw5uavu2ohoon42wavmf",
  password: "pass"
};

// it("should return thank you message on signup, a 201 status code and a json response", function() {
//   return request(server)
//     .post("/api/auth/register")
//     .send(testUser)
//     .then(res => {
//       expect(res.body.message).toMatch(/Thanks/i);
//       expect(res.status).toBe(201);
//       expect(res.type).toMatch(/json/i);
//     });
// });

it("should return welcome message on login", function() {
  return request(server)
    .post("/api/auth/login")
    .send(oldUser)
    .then(res => {
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/welcome/i);
      expect(res.type).toMatch(/json/i);
    });
});

it("should return 401 error on invalid username or password, and a message", function() {
  return request(server)
    .post("/api/auth/login")
    .send({
      username: "test user",
      password: "1234"
    })
    .then(res => {
      expect(res.status).toBe(401);
      expect(res.type).toMatch(/json/i);
      expect(res.body.message).toMatch(/no account/i);
    });
});
