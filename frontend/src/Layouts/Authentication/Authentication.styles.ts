import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  avatar: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    align: "center",
    marginBottom: theme.spacing(2),
  },
}));
