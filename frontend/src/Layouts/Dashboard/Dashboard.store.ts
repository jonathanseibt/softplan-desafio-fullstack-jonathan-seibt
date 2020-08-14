import { observable } from "mobx";

class Store {
  @observable isSidebarOpen = false;

  onClickOpenSidebar = () => {
    this.isSidebarOpen = true;
  };

  onClickCloseSidebar = () => {
    this.isSidebarOpen = false;
  };
}

export default new Store();
