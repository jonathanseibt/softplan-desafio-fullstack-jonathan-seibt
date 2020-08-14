import { observable } from "mobx";
import { persist } from "mobx-persist";
import { userInfo } from "os";

class Store {
  @observable hydrated = false;

  @persist("object") @observable user = { id: 0, name: "", email: "", role: 0 };
  @persist @observable isAuthenticated = false;

  clientSideLogin = (user: any) => {
    this.isAuthenticated = true;
    this.user = user;
  };

  clientSideLogout = () => {
    this.isAuthenticated = false;
    this.user = { id: 0, name: "", email: "", role: 0 };
  };
}

export default new Store();
