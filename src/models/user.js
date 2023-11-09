import { createUser } from "../cyphers/user/create";
import { executeQuery, executeWrite } from "../clients/neo4j";
import { uuid } from "uuidv4";
export class User {
  constructor({
    name = "",
    email = "",
    password = "",
    full_name = "",
    age = "",
  } = {}) {
    this.id = uuid();
    this.name = name;
    this.email = email;
    this.password = password;
    this.full_name = full_name;
    this.age = age;
    this.is_active = true;
  }
}
