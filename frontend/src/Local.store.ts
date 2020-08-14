import { observable } from "mobx";
import { persist } from "mobx-persist";

class Store {
  @observable hydrated = false;

  @persist("object") @observable user = { id: 0, name: "", email: "", role: 0 };
  @persist @observable isAuthenticated = false;

  clientSideLogin = (id: number, name: string, email: string, role: number) => {
    this.isAuthenticated = true;

    this.user.id = id;
    this.user.name = name;
    this.user.email = email;
    this.user.role = role;
  };

  clientSideLogout = () => {
    this.isAuthenticated = false;

    this.user.id = 0;
    this.user.name = "";
    this.user.email = "";
    this.user.role = 0;
  };
}

export default new Store();
