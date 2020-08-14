import { create } from "mobx-persist";
import LocalStore from "./Local.store";

const hydrate = create({});

class LocalStorage {
  constructor() {
    LocalStore.hydrated = false;

    return Promise.all([hydrate("Store", LocalStore)]).then(() => (LocalStore.hydrated = true));
  }
}

export default new LocalStorage();
