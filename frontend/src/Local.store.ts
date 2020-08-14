import { observable } from "mobx";
import { persist } from "mobx-persist";

class Store {
  @persist @observable isAuthenticated = false;

  @persist @observable userId = 0;

  @persist @observable userName = "";

  @persist @observable userEmail = "";

  @persist @observable userRole = 0;

  clientSideLogin = (id: number, name: string, email: string, role: number) => {
    this.isAuthenticated = true;
    this.userId = id;
    this.userName = name;
    this.userEmail = email;
    this.userRole = role;
  };

  clientSideLogout = () => {
    this.isAuthenticated = false;

    this.userId = 0;
    this.userName = "";
    this.userEmail = "";
    this.userRole = 0;
  };
}

export default new Store();
