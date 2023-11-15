import { v4 as uuidv4 } from "uuid";
export class User {
  constructor({
    name = "",
    email = "",
    password = "",
    full_name = "",
    age = "",
    is_active = true,
  } = {}) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.password = password;
    this.full_name = full_name;
    this.age = age;
    this.is_active = is_active;
  }
}
