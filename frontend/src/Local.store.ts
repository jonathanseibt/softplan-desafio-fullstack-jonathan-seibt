import { observable } from "mobx";
import { persist } from "mobx-persist";

interface User {
  id: number;
  name: string;
  email: string;
  role: number;
}

class Store {
  @persist @observable isAuthenticated = false;
  @persist @observable user: User | null = { id: 0, name: "", email: "", role: 0 };
}

export default new Store();
