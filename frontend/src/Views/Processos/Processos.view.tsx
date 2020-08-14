import React from "react";
import { observer } from "mobx-react";
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import useStyles from "./Processos.styles";
import Store from "./Processos.store";
import LocalStore from "../../Local.store";
import { Constants } from "../../Utils";

const View: React.FC = observer(() => {
  const store = Store;
  const styles = useStyles();

  store.load();

  return (
    <div className={styles.container}>
      <Header />
      <List />
      <Form />
    </div>
  );
});

const Header: React.FC = observer(() => {
  const store = Store;
  const styles = useStyles();

  const getSubtitleByRole = (role: number) => {
    switch (role) {
      case Constants.ROLE.TRIADOR:
        return "Aqui você pode consultar, cadastrar e alterar processos no sistema. Mas cuidado, não é possível remover processos após cadastrados!";
      case Constants.ROLE.FINALIZADOR:
        return "Aqui você pode consultar e finalizar os processos designados para você";
      default:
        return "";
    }
  };

  return (
    <>
      <div className={styles.title}>
        <Typography component="h2" variant="h4">
          Processos
        </Typography>

        {LocalStore.user.role === Constants.ROLE.TRIADOR && (
          <Button variant="contained" color="primary" onClick={store.onClickNewForm}>
            Novo
          </Button>
        )}
      </div>

      <div>
        <Typography component="h3" variant="body2">
          {getSubtitleByRole(LocalStore.user.role)}
        </Typography>
      </div>
    </>
  );
});

const List: React.FC = observer(() => {
  const store = Store;
  const styles = useStyles();

  return (
    <div className={styles.table}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width="80px" align="right">
                ID
              </TableCell>
              <TableCell align="left">Título</TableCell>
              <TableCell align="left">Descrição</TableCell>
              {LocalStore.user.role === Constants.ROLE.TRIADOR && <TableCell align="left">Finalizador</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {store.data.map((row) => (
              <TableRow key={row.name} onClick={() => store.onClickRow(row)} style={{ cursor: "pointer" }}>
                <TableCell width="80px" align="right">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                {LocalStore.user.role === Constants.ROLE.TRIADOR && <TableCell align="left">{row.user}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

const Form: React.FC = observer(() => {
  const store = Store;

  return (
    <Dialog open={store.isFormOpen} onClose={store.onClickCloseForm} scroll="paper">
      <DialogTitle>Parecer do Processo</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="ID"
              disabled
              value={store.inputId}
              onChange={(event) => store.onChangeInputId(event.target.value)}
            />
          </Grid>

          <Grid item xs={9}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Titulo"
              autoFocus
              value={store.inputTitle}
              onChange={(event) => store.onChangeInputTitle(event.target.value)}
              disabled={LocalStore.user.role === Constants.ROLE.FINALIZADOR}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Descrição"
              value={store.inputDescription}
              onChange={(event) => store.onChangeInputDescription(event.target.value)}
              disabled={LocalStore.user.role === Constants.ROLE.FINALIZADOR}
            />
          </Grid>
        </Grid>

        {LocalStore.user.role === Constants.ROLE.TRIADOR && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl variant="outlined" margin="normal" required fullWidth>
                <InputLabel id="select-label-finalizador">Quem dará o parecer</InputLabel>
                <Select
                  labelId="select-label-finalizador"
                  label="Quem dará o parecer"
                  value={store.inputUser}
                  onChange={(event) => store.onChangeInputUser(String(event.target.value))}
                >
                  {store.listaUsuariosFinalizadores.map((row, index: number) => (
                    <MenuItem key={index} value={row.id}>
                      {row.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}

        {LocalStore.user.role === Constants.ROLE.FINALIZADOR && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Parecer"
                value={store.inputRating}
                onChange={(event) => store.onChangeInputRating(event.target.value)}
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={store.onClickCancelForm} color="primary">
          Cancelar
        </Button>

        <Button onClick={store.onClickSaveForm} color="primary" variant="contained">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default View;
