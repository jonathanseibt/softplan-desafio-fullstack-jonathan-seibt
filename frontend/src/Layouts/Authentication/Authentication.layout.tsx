import React from "react";
import { observer } from "mobx-react";
import { Container, Avatar, Box, Typography } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const Layout: React.FC = observer((_props) => {
  return (
    <Container component="main" maxWidth="xs">
      <Box marginX={4} marginY={8}>
        <Box marginBottom={2}>
          <Box display="flex" justifyContent="center">
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
          </Box>

          <Typography component="h1" variant="h5" align="center">
            Login
          </Typography>
        </Box>

        <form noValidate>{_props.children}</form>
      </Box>
    </Container>
  );
});

export default Layout;
