import { Route, useHistory } from 'react-router-dom';
import MiddlewareList from '../../middlewares';
import { BadRequest, Forbidden, Unauthorized } from '../HttpErrorHanddling';

const Router = ({store, component, path, middlewares, ...rest}) => {
    var render = component;
    const history = useHistory();
    
    if (typeof(component) === "function") {
        if (Array.isArray(middlewares)) {
            let authorization;
            if (middlewares.length > 0) {
                store = store || {};
                for (let i=0; i<middlewares.length; i++) {
                    if (typeof(middlewares[i]) === "string") {
                        if (!MiddlewareList.hasOwnProperty(middlewares[i])) {
                            render = BadRequest;
                            break;
                        }
                        authorization = MiddlewareList[middlewares[i]](store);
                        if (!authorization.next) {
                            if (authorization.redirect) {
                                history.push(authorization.redirect);
                            } else if (authorization.status === 401) {
                                render = Unauthorized;
                            } else if (authorization.status === 403) {
                                render = Forbidden;
                            }else {
                                render = Forbidden;
                            }
                        }
                    }
                }
            }
        }
    } else {
        render = BadRequest;
    }
    return <Route path={path} component={render} {...rest} />;
}

export default Router;