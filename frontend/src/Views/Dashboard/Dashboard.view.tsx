import React from "react";
import { observer } from "mobx-react";
import { Box, Typography } from "@material-ui/core";
import LocalStore from "../../Local.store";

const View: React.FC = observer(() => {
  return (
    <Box width="100%" height="50%" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Typography component="h2" variant="h1">
        Olá,
      </Typography>
      <Typography component="h3" variant="h2">
        {LocalStore.userName}
      </Typography>
    </Box>
  );
});

export default View;
