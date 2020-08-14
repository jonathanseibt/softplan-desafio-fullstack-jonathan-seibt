import React from "react";
import { observer } from "mobx-react";
import { Container, Avatar, Typography } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./Authentication.styles";

const Layout: React.FC = observer((_props) => {
  const styles = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={styles.container}>
      <div className={styles.avatar}>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
      </div>

      <Typography component="h1" variant="h5" className={styles.title}>
        Login
      </Typography>

      <form noValidate>{_props.children}</form>
    </Container>
  );
});

export default Layout;
