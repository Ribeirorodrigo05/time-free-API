import request from "supertest";
import { app } from "../server";
// import { user } from "./utils";
describe("POST /create-user", () => {
  const user = {
    name: "conceição",
    email: "john258@example.com",
    password: "ef63ac7757801244c915db3d9d9535d2",
    full_name: "John Doe",
    age: "30",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "ABC",
      zip_code: "12345",
      country: "Sampleland",
    },
    is_active: true,
  };

  it("should handle user creation", async () => {
    const res = await request(app).post("/create-user").send(user);
    // expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("user");
  });
});
