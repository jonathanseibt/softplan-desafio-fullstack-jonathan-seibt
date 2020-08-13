import { observable } from "mobx";
import { persist } from "mobx-persist";

class Store {
  @persist @observable isAuthenticated = false;
}

export default new Store();
