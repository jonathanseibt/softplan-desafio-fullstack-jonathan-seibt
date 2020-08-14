import { observable } from "mobx";
import { persist } from "mobx-persist";

interface User {
  id: 0;
  name: "";
  email: "";
  role: 0;
}

class Store {
  @persist @observable isAuthenticated = false;
  @persist @observable user: User | null = null;
}

export default new Store();
