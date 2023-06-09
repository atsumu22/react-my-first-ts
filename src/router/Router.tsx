import { memo, FC } from "react";
import { Route, Switch } from "react-router-dom";

import { Login } from "../components/pages/Login";
import { homeRoutes } from "./HomeRoutes";
import { Page404 } from "../components/pages/Page404";
import { HeadeLayout } from "../components/template/HeaderLayout";
import { LoginUserProvider } from "../provider/LoginUserProvider";

export const Router: FC = memo(() => {
  return(
    <Switch>
      <LoginUserProvider>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/home" render={({ match: { url }}) => (
          <Switch>
            {homeRoutes.map((route) => (
              <Route
                key={route.path}
                exact={route.exact}
                path={`${url}${route.path}`}
              >
                <HeadeLayout>{route.children}</HeadeLayout>
              </Route>
            ))}
          </Switch>
        )} />
      </LoginUserProvider>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  )
});
