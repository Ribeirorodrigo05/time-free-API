import { faker } from "faker";

export const user = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  full_name: faker.name.findName(),
  age: faker.random.number({ min: 18, max: 99 }),
  address: {
    street: faker.address.streetName(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip_code: faker.address.zipCode(),
    country: faker.address.country(),
  },
  is_active: faker.random.boolean(),
};
