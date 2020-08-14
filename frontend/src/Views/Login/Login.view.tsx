import React from "react";
import { observer } from "mobx-react";
import { TextField, Button, Box } from "@material-ui/core";
import LocalStore from "../../Local.store";

const View: React.FC = observer(() => {
  const onClickLogin = (event: React.MouseEvent) => {
    event.preventDefault();

    LocalStore.isAuthenticated = true;
  };

  return (
    <>
      <TextField variant="outlined" margin="normal" required fullWidth label="Email" name="email" autoComplete="email" autoFocus />

      <TextField variant="outlined" margin="normal" required fullWidth label="Senha" name="senha" autoComplete="current-password" type="password" />

      <Box marginTop={2}>
        <Button type="submit" fullWidth variant="contained" color="primary" onClick={onClickLogin}>
          Login
        </Button>
      </Box>
    </>
  );
});

export default View;
