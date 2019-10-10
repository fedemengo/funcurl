const funcurl = require("..");

const fu = new funcurl({
    '/users/:id': {
        'POST': () => 1,
        'GET': () => 2
    },
    '/': {
        'put': () => 3
    }
});

//fu.add("/users/:id", "POST", (req, res, next) => {});
fu.add("/users/:id/confirm", "GET", 2);
fu.add("/", "POST", 3);

console.log(fu.match("/users/xxxxx/confirm", "GET"));
console.log(fu.match("/users/xxxxx/confirm", "POST"));

console.log(fu.get("/users/xxxx/confirm", "GET"));
console.log(fu.get("/users/xxxx", "POST"));

console.log(fu.get('/users/x', 'POST').func())
console.log(fu.get('/users/x', 'GET').func())
console.log(fu.get('/', 'PUT').func())
