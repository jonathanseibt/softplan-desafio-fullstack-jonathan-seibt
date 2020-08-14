import { observable, action } from "mobx";
import { withSnackbar } from "notistack";
import LocalStore from "../../Local.store";

class Store {
  @observable inputEmail = "";

  @action
  onChangeInputEmail = (value: string) => {
    this.inputEmail = value;
  };
}

export default new Store();
