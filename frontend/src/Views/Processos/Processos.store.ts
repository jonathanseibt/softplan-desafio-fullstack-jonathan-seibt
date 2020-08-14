import { observable, action } from "mobx";
import { withSnackbar } from "notistack";
import LocalStore from "../../Local.store";
import axios, { AxiosResponse } from "axios";
import { Constants } from "../../Utils";

class Store {
  @observable data: any[] = [];
  @observable isFormOpen = false;
  @observable inputId = "";
  @observable inputTitle = "";
  @observable inputDescription = "";
  @observable inputUser = "";
  @observable inputRating = "";

  @action
  load = async () => {
    try {
      this.data = [];

      const url = `${Constants.URL_API}${LocalStore.user.role === 2 ? "/process" : `/process/FindAllByUser/${LocalStore.user.id}`}`;
      const result = await axios.get(url);
      for (const row of result.data) row.user = row.user.id;

      this.data = result.data;
    } catch (e) {
      window.alert("Não foi possível carregar os processos!");
      console.error(e);
    }
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
  onClickSaveForm = async () => {
    try {
      if (this.validateForm()) {
        const result = await axios.get(`${Constants.URL_API}/user/${this.inputUser}`);

        const process = {
          title: this.inputTitle,
          description: this.inputDescription,
          user: result.data,
          rating: this.inputRating,
        };

        if (!this.inputId) {
          await axios.post(`${Constants.URL_API}/process`, process);
        } else {
          await axios.put(`${Constants.URL_API}/process/${this.inputId}`, process);
        }

        window.alert("Processo salvo com sucesso!");

        await this.load();

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
    this.inputUser = row.user.id;
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
