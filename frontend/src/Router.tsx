import React from "react";
import { observer } from "mobx-react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import DashboardLayout from "./Layouts/Dashboard/Dashboard.layout";
import AuthenticationLayout from "./Layouts/Authentication/Authentication.layout";
import DashboardView from "./Views/Dashboard/Dashboard.view";
import LoginView from "./Views/Login/Login.view";
import LocalStore from "./Local.store";

const Router: React.FC = observer(() => {
  const isAuthenticatedRoutes = () => {
    return (
      <DashboardLayout>
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>

        <Route path="/dashboard">
          <DashboardView />
        </Route>

        <Route path="*">
          <Redirect to="/dashboard" />
        </Route>
      </DashboardLayout>
    );
  };

  const isNotAuthenticatedRoutes = () => {
    return (
      <AuthenticationLayout>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

        <Route path="/login">
          <LoginView />
        </Route>

        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </AuthenticationLayout>
    );
  };

  return (
    <BrowserRouter>
      <Switch>{LocalStore.isAuthenticated ? isAuthenticatedRoutes() : isNotAuthenticatedRoutes()}</Switch>
    </BrowserRouter>
  );
});

export default Router;
