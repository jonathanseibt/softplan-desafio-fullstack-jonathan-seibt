import { observable } from "mobx";

class Store {
  @observable isFormOpen = false;
  @observable inputId = "";
  @observable inputName = "";
  @observable inputEmail = "";
  @observable inputPassword = "";
  @observable inputRole = "";

  onClickOpenForm = () => {
    this.inputId = "";
    this.inputName = "";
    this.inputEmail = "";
    this.inputPassword = "";
    this.inputRole = "";

    this.isFormOpen = true;
  };

  onClickCloseForm = () => {
    this.isFormOpen = false;
  };

  onClickCancelForm = () => {
    this.isFormOpen = false;
  };

  onClickSaveForm = () => {
    this.isFormOpen = false;
  };

  onClickRow = (row: any) => {
    this.inputId = row.name;
    this.inputName = row.name;
    this.inputEmail = row.name;
    this.inputPassword = row.name;
    this.inputRole = row.name;

    this.isFormOpen = true;
  };

  onClickDeleteRow = (row: any) => {
    // this.isFormOpen = true;
  };

  onChangeInputId = (value: string) => {
    this.inputId = value;
  };

  onChangeInputName = (value: string) => {
    this.inputName = value;
  };

  onChangeInputEmail = (value: string) => {
    this.inputEmail = value;
  };

  onChangeInputPassword = (value: string) => {
    this.inputPassword = value;
  };

  onChangeInputRole = (value: string) => {
    this.inputRole = value;
  };
}

export default new Store();
