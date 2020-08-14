import { makeStyles } from "@material-ui/core/styles";
import createSpacing from "@material-ui/core/styles/createSpacing";

export default makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
  },
  table: {
    marginTop: theme.spacing(4),
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
