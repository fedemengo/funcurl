"use strict";

class FuncURL {
    constructor(config = {}) {
        if (config) {
        } else {
            this.root = {};
        }
        this.root = {};
    }

    match(url, method) {
        const paths = url.split("/").slice(1);
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

    get(url, method) {
        const paths = url.split("/").slice(1);
        let p = this.root;
        const data = {};

        for (let path of paths) {
            if (p.hasOwnProperty(path) === false) {
                if (p.hasOwnProperty("*")) {
                    const name = p["*"]["__name"];
                    data[name] = path;
                    path = "*";
                } else {
                    throw new Error("URL is not defined");
                }
            }
            p = p[path];
        }
        if (p.hasOwnProperty(method) === false) {
            throw new Error("URL is not defined");
        }
        return { func: p[method], params: data };
    }

    add(url, method, func) {
        const paths = url.split("/").slice(1);
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
                p[path]["__name"] = param.substring(1);
            }
            p = p[path];
        }
        if (p.hasOwnProperty(method)) {
            throw new Error("URL already exists");
        }
        p[method] = func;
    }

    setBase(url) {
        this.setBase = url;
    }
}

module.exports = FuncURL;
