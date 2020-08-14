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
  IconButton,
} from "@material-ui/core";
import useStyles from "./Usuarios.styles";
import Store from "./Usuarios.store";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

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

  return (
    <>
      <div className={styles.title}>
        <Typography component="h2" variant="h4">
          Usuários
        </Typography>

        <Button variant="contained" color="primary" onClick={store.onClickNewForm}>
          Novo
        </Button>
      </div>

      <div>
        <Typography component="h3" variant="body2">
          Aqui você pode consultar, cadastrar, alterar e excluir usuários do sistema
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
              <TableCell align="left">Nome</TableCell>
              <TableCell align="left">E-mail</TableCell>
              <TableCell align="left">Atribuição</TableCell>
              <TableCell width="80px" align="center"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {store.data.map((row) => (
              <TableRow key={row.name} onClick={() => store.onClickRow(row)} style={{ cursor: "pointer" }}>
                <TableCell width="80px" align="right">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.role}</TableCell>
                <TableCell width="80px" align="center">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={(event: React.MouseEvent) => store.onClickDeleteRow(event, row)}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </TableCell>
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
      <DialogTitle>Usuário</DialogTitle>

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
              label="Nome"
              autoFocus
              value={store.inputName}
              onChange={(event) => store.onChangeInputName(event.target.value)}
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
              label="E-mail"
              value={store.inputEmail}
              onChange={(event) => store.onChangeInputEmail(event.target.value)}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl variant="outlined" margin="normal" required fullWidth>
              <InputLabel id="select-label-atribuicao">Atribuição</InputLabel>
              <Select
                labelId="select-label-atribuicao"
                label="Atribuição"
                value={store.inputRole}
                onChange={(event) => store.onChangeInputRole(String(event.target.value))}
              >
                <MenuItem value={1}>Administrador</MenuItem>
                <MenuItem value={2}>Triador</MenuItem>
                <MenuItem value={3}>Finalizador</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
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
