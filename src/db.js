import { v4 as uuid } from "uuid";
import uniq from "lodash/uniq.js";

class DB {
  users = [];
  hobbies = {};

  addUser({ name, email }) {
    if (!name || !email) return null;

    const existingUser = this.users.find((item) => item.email === email);
    if (!!existingUser) return null;

    const user = {
      id: uuid(),
      name,
      email,
    };

    this.users.push(user);

    return user;
  }

  getUsers() {
    return this.users;
  }

  getUser(id) {
    if (!id) return null;

    const user = this.users.find((item) => item.id === id);
    if (!user) return null;

    return user;
  }

  deleteUser(id) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index < 0) return false;

    this.users.splice(index, 1);
    delete this.hobbies[id];

    return true;
  }

  addHobbies(id, hobbies = []) {
    if (!id || !Array.isArray(hobbies)) return null;

    const user = this.getUser(id);
    if (!user) return null;

    this.hobbies[id] = uniq([...(this.hobbies[id] || []), ...hobbies]);

    return this.hobbies[id];
  }

  getHobbies(id) {
    if (!id) return null;

    const user = this.getUser(id);
    if (!user) return null;

    return this.hobbies[id] || [];
  }
}

export default new DB();
