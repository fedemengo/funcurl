"use strict";

class FuncURL {
    constructor(config = {}) {
        this.root = {};
        
        if (config) {
            Object.keys(config).forEach(route => Object.keys(config[route]).forEach(method => this.add(route, method, config[route][method])))
            //forEach(config, (methods, route) => forEach(methods, (func, method) => this.add(route, method, func)))
        }
    }

    _getPaths(url) {
        if(url === '/'){
            return url
        }

        return url.split("/").slice(1);
    }

    match(url, _method) {
        const method = _method.toUpperCase()
        const paths = this._getPaths(url);
        let p = this.root;

        for (let path of paths) {
            if (p.hasOwnProperty(path) === false) {
                if (p.hasOwnProperty("*")) {
                    path = "*";
                } else {
                    return false;
                }
            }
            p = p[path];
        }
        return p.hasOwnProperty(method);
    }

    get(url, _method) {
        const method = _method.toUpperCase()
        const paths = this._getPaths(url);
        let p = this.root;
        const data = {};

        for (let path of paths) {
            if (p.hasOwnProperty(path) === false) {
                if (p.hasOwnProperty("*")) {
                    const name = p["*"]["__name"][method];
                    data[name] = path;
                    path = "*";
                } else {
                    throw new Error(`URL ${url} is not defined`);
                }
            }
            p = p[path];
        }
        if (p.hasOwnProperty(method) === false) {
            throw new Error(`URL ${url} is not defined`);
        }
        return { func: p[method], params: data };
    }

    add(url, _method, func) {
        const method = _method.toUpperCase()
        const paths = this._getPaths(url);
        let p = this.root;
        let param = "";

        for (let path of paths) {
            switch (path.substr(0, 1)) {
                case ":":
                    param = path;
                    path = "*";
                    break;
                case "":

                    path = "$";
                    break;
            }
            if (p.hasOwnProperty(path) === false) {
                p[path] = {};
            }
            if (path === "*") {
                if(!p[path]["__name"]) {
                    p[path]["__name"] = {}
                }
                p[path]["__name"][method] = param.substring(1);
            }
            p = p[path];
        }
        if (p.hasOwnProperty(method)) {
            throw new Error(`URL ${url} already exists`);
        }
        p[method] = func;
    }
}

module.exports = FuncURL;
