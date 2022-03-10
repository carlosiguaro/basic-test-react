import View from '../../views';
const set = function(argz, argo, argt) {
    if (typeof(argz) === "string") {
        let path, component, middlewares;
        if (typeof(argo) === "function" && argt === undefined) {
            path = argz;
            component = argo;
            middlewares = [];
        } else if (typeof(argo) === "string" && typeof(argt) === "function") {
            path = argz;
            component = argt;
            middlewares = [argo];
        } else if (Array.isArray(argo) && typeof(argt) === "function") {
            path = argz
            component = argt
            middlewares = argo
        }
        this.get.push({ path, component, middlewares });
    } else if(Array.isArray(argz) && Array.isArray(argo)) {
        for (var i=0; i < argo.length; i++) {
            if (Array.isArray(argo[i])) {
                if (argo[i].length === 2) {
                    if (typeof(argo[i][0]) === 'string' && typeof(argo[i][1]) === 'function') {
                        if (Array.isArray(argz)) {
                            this.get.push({
                                path: argo[i][0],
                                component: argo[i][1],
                                middlewares: argz
                            });
                        }          
                    }
                }
            }
        }
    }
};

const Route = Object.assign({set, get: []});

export { Route, View };
