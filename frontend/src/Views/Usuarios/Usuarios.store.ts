import { observable } from "mobx";

class Store {
  @observable data: any[] = [];
  @observable isFormOpen = false;
  @observable inputId = "";
  @observable inputName = "";
  @observable inputEmail = "";
  @observable inputRole = "";

  load = () => {
    this.data.push(1, "Jonathan Seibt", "jonathan@email.com", 1);
    this.data.push(2, "Alieska Ciliana", "alieska@email.com", 2);
    this.data.push(3, "Luiz Carlos Seibt", "luiz@email.com", 3);
  };

  onClickNewForm = () => {
    this.inputId = "";
    this.inputName = "";
    this.inputEmail = "";
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
    try {
      this.data.push(this.inputId, this.inputName, this.inputEmail, this.inputRole);

      this.isFormOpen = false;
    } catch (e) {
      console.log(e);
    }
  };

  onClickRow = (row: any) => {
    this.inputId = row.name;
    this.inputName = row.name;
    this.inputEmail = row.name;
    this.inputRole = row.name;

    this.isFormOpen = true;
  };

  onClickDeleteRow = (row: any) => {
    try {
      this.data.filter((each) => each.id !== row.id);
    } catch (e) {
      console.log(e);
    }
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

  onChangeInputRole = (value: string) => {
    this.inputRole = value;
  };
}

export default new Store();
