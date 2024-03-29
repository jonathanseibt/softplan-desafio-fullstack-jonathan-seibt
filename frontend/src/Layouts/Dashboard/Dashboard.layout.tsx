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
  Hidden,
} from "@material-ui/core";
import clsx from "clsx";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import PowerSettingsNewOutlinedIcon from "@material-ui/icons/PowerSettingsNewOutlined";
import ChevronLeftOutlinedIcon from "@material-ui/icons/ChevronLeftOutlined";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import PeopleOutlinedIcon from "@material-ui/icons/PeopleOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import Store from "./Dashboard.store";
import useStyles from "./Dashboard.styles";
import LocalStore from "../../Local.store";
import { useHistory, Link } from "react-router-dom";
import { Constants } from "../../Utils";

const Layout: React.FC = observer((_props) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Topbar />
      <Sidebar />

      <main className={styles.content}>{_props.children}</main>
    </div>
  );
});

const Topbar: React.FC = observer(() => {
  const styles = useStyles();
  const history = useHistory();

  const onClickLogout = (event: React.MouseEvent) => {
    event.preventDefault();

    LocalStore.clientSideLogout();

    if (history) history.push("/login");
  };

  return (
    <AppBar className={clsx(styles.appBar, Store.isSidebarOpen && styles.appBarShift)}>
      <Toolbar className={styles.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={Store.onClickOpenSidebar}
          className={clsx(styles.menuButton, Store.isSidebarOpen && styles.menuButtonHidden)}
        >
          <MenuOutlinedIcon />
        </IconButton>

        <Hidden xsDown>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={styles.title}>
            Dashboard
          </Typography>
        </Hidden>

        <Chip avatar={<Avatar />} label={`${Constants.getRoleDescription(LocalStore.user?.role)}: ${LocalStore.user?.name}`} className={styles.chipUsername} />

        <IconButton color="inherit" onClick={onClickLogout}>
          <PowerSettingsNewOutlinedIcon />
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
        <Link to="/dashboard">
          <ListItem button className={styles.menuItem}>
            <ListItemIcon>
              <DashboardOutlinedIcon />
            </ListItemIcon>

            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>

        {LocalStore.user.role === Constants.ROLE.ADMINISTRADOR && (
          <Link to="/usuarios">
            <ListItem button className={styles.menuItem}>
              <ListItemIcon>
                <PeopleOutlinedIcon />
              </ListItemIcon>

              <ListItemText primary="Usuários" />
            </ListItem>
          </Link>
        )}

        {(LocalStore.user.role === Constants.ROLE.TRIADOR || LocalStore.user.role === Constants.ROLE.FINALIZADOR) && (
          <Link to="/processos">
            <ListItem button className={styles.menuItem}>
              <ListItemIcon>
                <DescriptionOutlinedIcon />
              </ListItemIcon>

              <ListItemText primary="Processos" />
            </ListItem>
          </Link>
        )}
      </List>
    </Drawer>
  );
});

export default Layout;
