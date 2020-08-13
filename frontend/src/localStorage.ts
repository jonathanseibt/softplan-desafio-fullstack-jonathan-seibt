import { create } from "mobx-persist";
import LocalStore from "./Local.store";

const hydrate = create();

class LocalStorage {
  constructor() {
    return Promise.all([hydrate("Store", LocalStore)]);
  }
}

export default new LocalStorage();
