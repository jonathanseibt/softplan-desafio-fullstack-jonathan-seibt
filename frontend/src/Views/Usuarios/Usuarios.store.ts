import { observable, action } from "mobx";
import { withSnackbar } from 'notistack';

class Store {
  @observable data: any[] = [];
  @observable isFormOpen = false;
  @observable inputId = "";
  @observable inputName = "";
  @observable inputEmail = "";
  @observable inputRole = "";

  @action
  load = () => {
    this.data = [];

    this.data.push({ id: 1, name: "Jonathan Seibt", email: "jonathan@email.com", role: 1 });
    this.data.push({ id: 2, name: "Alieska Ciliana", email: "alieska@email.com", role: 2 });
    this.data.push({ id: 3, name: "Luiz Carlos Seibt", email: "luiz@email.com", role: 3 });
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
    if ( !this.inputName || !this.inputEmail || !this.inputRole) {
      window.alert("Preencha todos os campos!");
       
      return false;
    }

    return true;
  };

  @action
  onClickSaveForm = () => {
    try {
      if (this.validateForm()) {
        this.data.push({ id: this.inputId, name: this.inputName, email: this.inputEmail, role: this.inputRole });

        this.isFormOpen = false;
      }
    } catch (e) {
      window.alert('Não foi possível salvar os dados do usuário!');
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
  onClickDeleteRow = (event: React.MouseEvent, row: any) => {
    event.stopPropagation();

    try {
      if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
        this.data = this.data.filter((each) => each.id !== row.id);
      }
    } catch (e) {
      window.alert('Não foi possível excluir o registro do usuário!');
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
