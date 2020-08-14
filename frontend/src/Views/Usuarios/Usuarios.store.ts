import { observable, action } from "mobx";
import axios from "axios";
import { Constants } from "../../Utils";

class Store {
  @observable data: any[] = [];
  @observable isFormOpen = false;
  @observable inputId = "";
  @observable inputName = "";
  @observable inputEmail = "";
  @observable inputRole = "";

  @action
  load = async () => {
    try {
      this.data = [];

      const result = await axios.get(`${Constants.URL_API}/user`);

      this.data = result.data;
    } catch (e) {
      window.alert("Não foi possível carregar os usuários!");
      console.error(e);
    }
  };

  @action
  onClickNewForm = () => {
    this.inputId = "";
    this.inputName = "";
    this.inputEmail = "";
    this.inputRole = "";

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
    if (!this.inputName || !this.inputEmail || !this.inputRole) {
      window.alert("Preencha todos os campos!");

      return false;
    }

    return true;
  };

  @action
  onClickSaveForm = async () => {
    try {
      if (this.validateForm()) {
        const user = {
          name: this.inputName,
          email: this.inputEmail,
          role: this.inputRole,
        };

        if (!this.inputId) {
          await axios.post(`${Constants.URL_API}/user`, user);
        } else {
          await axios.put(`${Constants.URL_API}/user/${this.inputId}`, user);
        }

        window.alert("Usuário salvo com sucesso!");

        await this.load();

        this.isFormOpen = false;
      }
    } catch (e) {
      window.alert("Não foi possível salvar os dados do usuário!");
      console.error(e);
    }
  };

  @action
  onClickRow = (row: any) => {
    this.inputId = row.id;
    this.inputName = row.name;
    this.inputEmail = row.email;
    this.inputRole = row.role;

    this.isFormOpen = true;
  };

  @action
  onClickDeleteRow = async (event: React.MouseEvent, row: any) => {
    event.stopPropagation();

    try {
      if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
        await axios.delete(`${Constants.URL_API}/user/${row.id}`);

        window.alert("Usuário excluído com sucesso!");

        await this.load();

        this.isFormOpen = false;
      }
    } catch (e) {
      window.alert("Não foi possível excluir o registro do usuário!");
      console.error(e);
    }
  };

  @action
  onChangeInputId = (value: string) => {
    this.inputId = value;
  };

  @action
  onChangeInputName = (value: string) => {
    this.inputName = value;
  };

  @action
  onChangeInputEmail = (value: string) => {
    this.inputEmail = value;
  };

  @action
  onChangeInputRole = (value: string) => {
    this.inputRole = value;
  };
}

export default new Store();
