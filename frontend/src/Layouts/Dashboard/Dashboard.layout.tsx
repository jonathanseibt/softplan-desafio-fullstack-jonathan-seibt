import React from "react";
import { observer } from "mobx-react";
import {
  AppBar,
  IconButton,
  Typography,
  Toolbar,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Chip,
  Avatar,
  Box,
} from "@material-ui/core";
import clsx from "clsx";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import PowerSettingsNewOutlinedIcon from "@material-ui/icons/PowerSettingsNewOutlined";
import Store from "./Dashboard.store";
import useStyles from "./Dashboard.styles";
import ChevronLeftOutlinedIcon from "@material-ui/icons/ChevronLeftOutlined";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import LocalStore from "../../Local.store";

const Layout: React.FC = observer((_props) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Topbar />
      <Sidebar />
      <Content>{_props.children}</Content>
    </div>
  );
});

const Topbar: React.FC = observer(() => {
  const styles = useStyles();

  const onClickLogout = (event: React.MouseEvent) => {
    event.preventDefault();

    LocalStore.isAuthenticated = false;
    LocalStore.user = null;
  };

  return (
    <AppBar position="absolute" className={clsx(styles.appBar, Store.isSidebarOpen && styles.appBarShift)}>
      <Toolbar className={styles.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={Store.onClickOpenSidebar}
          className={clsx(styles.menuButton, Store.isSidebarOpen && styles.menuButtonHidden)}
        >
          <MenuOutlinedIcon />
        </IconButton>

        <Typography component="h1" variant="h6" color="inherit" noWrap className={styles.title}>
          Dashboard
        </Typography>

        <Box marginX={2}>
          <Chip avatar={<Avatar alt={LocalStore.user?.name} />} label={LocalStore.user?.name} />
        </Box>

        <IconButton color="inherit" onClick={onClickLogout}>
          <Tooltip title="Sair">
            <PowerSettingsNewOutlinedIcon />
          </Tooltip>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
});

const Sidebar: React.FC = observer(() => {
  const styles = useStyles();

  return (
    <Drawer variant="permanent" classes={{ paper: clsx(styles.drawerPaper, !Store.isSidebarOpen && styles.drawerPaperClose) }} open={Store.isSidebarOpen}>
      <div className={styles.toolbarIcon}>
        <IconButton onClick={Store.onClickCloseSidebar}>
          <ChevronLeftOutlinedIcon />
        </IconButton>
      </div>

      <Divider />

      <List>
        <ListItem button className={styles.menuItem}>
          <ListItemIcon>
            <DashboardOutlinedIcon />
          </ListItemIcon>

          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
    </Drawer>
  );
});

const Content: React.FC = observer((_props) => {
  const styles = useStyles();

  return (
    <main className={styles.content}>
      <div className={styles.appBarSpacer} />

      {_props.children}
    </main>
  );
});

export default Layout;
