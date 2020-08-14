import { observable, action } from "mobx";
import { withSnackbar } from "notistack";
import LocalStore from "../../Local.store";

class Store {
  @observable data: any[] = [];
  @observable isFormOpen = false;
  @observable inputId = "";
  @observable inputTitle = "";
  @observable inputDescription = "";
  @observable inputUser = "";
  @observable inputRating = "";

  @action
  load = () => {
    this.data = [];

    this.data.push({ id: 1, title: "Processo Teste", description: "Tal tal tal...", user: 3, rating: "Muito bom" });
    this.data.push({ id: 2, title: "Antigo Processo Quatro", description: "Tal tal tal...", user: 3, rating: "" });
    this.data.push({ id: 3, title: "Novo Processo", description: "Tal tal tal...", user: 3, rating: "" });
  };

  @action
  onClickNewForm = () => {
    this.inputId = "";
    this.inputTitle = "";
    this.inputDescription = "";
    this.inputUser = "";
    this.inputRating = "";

    this.isFormOpen = true;
  };

  @action
  onClickCloseForm = () => {
    this.isFormOpen = false;
  };

  @action
  onClickCancelForm = () => {
    this.isFormOpen = false;
  };

  @action
  validateForm = () => {
    if (LocalStore.user.role === 2) {
      if (!this.inputTitle || !this.inputDescription || !this.inputUser) {
        window.alert("Preencha todos os campos!");

        return false;
      }
    } else {
      if (!this.inputRating) {
        window.alert("Preencha todos os campos!");

        return false;
      }
    }

    return true;
  };

  @action
  onClickSaveForm = () => {
    try {
      if (this.validateForm()) {
        this.data.push({ id: this.inputId, title: this.inputTitle, description: this.inputDescription, user: this.inputUser, rating: this.inputRating });

        this.isFormOpen = false;
      }
    } catch (e) {
      window.alert("Não foi possível salvar os dados do processo!");
      console.error(e);
    }
  };

  @action
  onClickRow = (row: any) => {
    this.inputId = row.id;
    this.inputTitle = row.title;
    this.inputDescription = row.description;
    this.inputUser = row.user;
    this.inputRating = row.rating;

    this.isFormOpen = true;
  };

  @action
  onChangeInputId = (value: string) => {
    this.inputId = value;
  };

  @action
  onChangeInputTitle = (value: string) => {
    this.inputTitle = value;
  };

  @action
  onChangeInputDescription = (value: string) => {
    this.inputDescription = value;
  };

  @action
  onChangeInputUser = (value: string) => {
    this.inputUser = value;
  };

  @action
  onChangeInputRating = (value: string) => {
    this.inputRating = value;
  };
}

export default new Store();
