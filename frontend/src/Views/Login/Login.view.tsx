import React from "react";
import { observer } from "mobx-react";
import { TextField, Button } from "@material-ui/core";
import LocalStore from "../../Local.store";
import useStyles from "./Login.styles";
import { useHistory } from "react-router-dom";

const View: React.FC = observer(() => {
  const styles = useStyles();
  const history = useHistory();

  const onClickLogin = (event: React.MouseEvent) => {
    event.preventDefault();

    LocalStore.clientSideLogin(1, "name", "email", 1);

    if (history) history.push("/dashboard");
  };

  return (
    <>
      <TextField variant="outlined" margin="normal" required fullWidth label="Email" autoComplete="email" autoFocus />

      <Button type="submit" fullWidth variant="contained" color="primary" onClick={onClickLogin} className={styles.loginButton}>
        Login
      </Button>
    </>
  );
});

export default View;
