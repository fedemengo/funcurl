const assert = require('assert')
const { isEqual } = require('lodash')
const funcurl = require("../index");

describe('Single parametric route with two methods', () => {
    const fu = new funcurl({
        '/users/:id': {
            'POST': {},
            'GET': {}
        }
    });

    it('Should return the named parameter', () => {
        const { params: p1 } = fu.get('/users/123', 'GET')
        assert.equal(isEqual(p1, { id: '123' }), true)
    })

    it('Should return the named parameter', () => {
        const { params: p2 } = fu.get('/users/anId', 'POST')
        assert.equal(isEqual(p2, { id: 'anId' }), true)
    })
})

describe('Single parametric route with two methods', () => {
    const fu = new funcurl({
        '/users/:id': {
            'POST': {},
        },
        '/users/:username': {
            'GET': {}
        }
    });

    it('Should return the parameter "id"', () => {
        const { params: p1 } = fu.get('/users/123', 'POST')
        assert.equal(isEqual(p1, { id: '123' }), true)
    })

    it('Should return the parameter "username', () => {
        const { params: p2 } = fu.get('/users/123', 'GET')
        assert.equal(isEqual(p2, { username: '123' }), true)
    })
})


describe('Double parametric route with two methods', () => {
    const fu = new funcurl({
        '/users/:id/:tag': {
            'POST': {},
        },
        '/users/:username/:tap': {
            'GET': {}
        }
    });

    it('Should return the parameters "id","tag"', () => {
        const { params: p1 } = fu.get('/users/123/new', 'POST')
        assert.equal(isEqual(p1, { id: '123', tag: 'new' }), true)
    })

    it('Should return the parameters "username","tap"', () => {
        const { params: p2 } = fu.get('/users/123/me', 'GET')
        assert.equal(isEqual(p2, { username: '123', tap: 'me' }), true)
    })
});