import React from "react";
import { observer } from "mobx-react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import DashboardLayout from "./Layouts/Dashboard/Dashboard.layout";
import AuthenticationLayout from "./Layouts/Authentication/Authentication.layout";
import DashboardView from "./Views/Dashboard/Dashboard.view";
import LoginView from "./Views/Login/Login.view";
import UsuariosView from "./Views/Usuarios/Usuarios.view";
import LocalStore from "./Local.store";

const Router: React.FC = observer(() => {
  return (
    <BrowserRouter>
      {LocalStore.hydrated && (
        <Switch>
          <Route exact path="/">
            {LocalStore.isAuthenticated ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
          </Route>

          <Route path="/login">
            {LocalStore.isAuthenticated ? (
              <Redirect to="/dashboard" />
            ) : (
              <AuthenticationLayout>
                <LoginView />
              </AuthenticationLayout>
            )}
          </Route>

          <Route path="/dashboard">
            {LocalStore.isAuthenticated ? (
              <DashboardLayout>
                <DashboardView />
              </DashboardLayout>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route path="/usuarios">
            {LocalStore.isAuthenticated ? (
              <DashboardLayout>
                <UsuariosView />
              </DashboardLayout>
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      )}
    </BrowserRouter>
  );
});

export default Router;
