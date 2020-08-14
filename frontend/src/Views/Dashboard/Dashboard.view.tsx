import React from "react";
import { observer } from "mobx-react";
import { Typography } from "@material-ui/core";
import LocalStore from "../../Local.store";
import useStyles from "./Dashboard.styles";

const View: React.FC = observer(() => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Typography component="h2" variant="h4">
        Olá,
      </Typography>

      <Typography component="h3" variant="h2">
        {LocalStore.userName}
      </Typography>

      <Typography component="h4" variant="body2" className={styles.subtitle}>
        Navegue pelo menu lateral
      </Typography>
    </div>
  );
});

export default View;
