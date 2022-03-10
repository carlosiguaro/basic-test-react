import { React } from 'react'
import { Switch, Route } from 'react-router-dom'
import Router from './Router'
import { Route as RoutesList } from '../../routes/routes';
import NotFound from '../HttpErrorHanddling/404'

const Routes = () => {
    console.log(RoutesList);
    return (
        <Switch>
            {RoutesList.get.map((route, key) => {
                return (
                    <Router
                        key={key}
                        path={route.path}
                        component={route.component}
                        middlewares={route.middlewares}
                        redirect={route.redirect}
                        exact
                    />
                )
            })}
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    )
}

export default Routes;
