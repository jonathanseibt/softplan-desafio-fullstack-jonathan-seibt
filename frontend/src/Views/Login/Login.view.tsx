import React from "react";
import { observer } from "mobx-react";
import { TextField, Button, Typography } from "@material-ui/core";
import LocalStore from "../../Local.store";
import useStyles from "./Login.styles";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Store from "./Login.store";
import { Constants } from "../../Utils";

const View: React.FC = observer(() => {
  const store = Store;
  const styles = useStyles();
  const history = useHistory();

  const onClickLogin = async (event: React.MouseEvent) => {
    try {
      event.preventDefault();

      const result = await axios.get(`${Constants.URL_API}/user/FindFirstByEmail/${store.inputEmail}`);

      LocalStore.clientSideLogin(result.data);

      store.inputEmail = "";

      if (history) history.push("/dashboard");
    } catch (e) {
      window.alert("Usuário incorreto!");
      console.error(e);
    }
  };

  return (
    <>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Email"
        autoComplete="email"
        autoFocus
        value={store.inputEmail}
        onChange={(event) => store.onChangeInputEmail(event.target.value)}
      />

      <Button type="submit" fullWidth variant="contained" color="primary" onClick={onClickLogin} className={styles.loginButton}>
        Login
      </Button>

      <div className={styles.tip}>
        <Typography variant="subtitle2">Administrador: administrador@email.com</Typography>
        <Typography variant="subtitle2">Triador: triador@email.com</Typography>
        <Typography variant="subtitle2">Finalizador: finalizador@email.com</Typography>
      </div>
    </>
  );
});

export default View;
