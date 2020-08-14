import { observable, action } from "mobx";
import { withSnackbar } from "notistack";

class Store {
  @observable data: any[] = [];
  @observable isFormOpen = false;
  @observable inputId = "";
  @observable inputTitle = "";
  @observable inputDescription = "";
  @observable inputUser = "";

  @action
  load = () => {
    this.data = [];

    this.data.push({ id: 1, title: "Processo Teste", description: "Tal tal tal...", user: 3 });
    this.data.push({ id: 2, title: "Antigo Processo Quatro", description: "Tal tal tal...", user: 3 });
    this.data.push({ id: 3, title: "Novo Processo", description: "Tal tal tal...", user: 3 });
  };

  @action
  onClickNewForm = () => {
    this.inputId = "";
    this.inputTitle = "";
    this.inputDescription = "";
    this.inputUser = "";

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
    if (!this.inputTitle || !this.inputDescription || !this.inputUser) {
      window.alert("Preencha todos os campos!");

      return false;
    }

    return true;
  };

  @action
  onClickSaveForm = () => {
    try {
      if (this.validateForm()) {
        this.data.push({ id: this.inputId, title: this.inputTitle, description: this.inputDescription, user: this.inputUser });

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
}

export default new Store();
