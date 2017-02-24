var frisby = require('frisby');
var url = require('../config/url');

module.exports = {
  register: function (title, user) {
    return frisby.create(title).post(url.accounts(), {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName
    }, {
      json: true
    });
  },

  signIn: function (title, user) {
    return frisby.create(title).post(url.signIn(), {
      email: user.email,
      password: user.password
    }, {
      json: true
    });
  },

  get: function (title, id, token) {
    return frisby.create(title).get(url.account(id))
      .addHeader('X-Auth-Token', token);
  },

  find: function (title, email, token) {
    return frisby.create(title).get(url.accounts())
      .addHeader('X-Auth-Token', token);
  },

  promote: function (title, id, token, data) {
    return frisby.create(title).put(url.account(id), {
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role
    }, {
      json: true
    })
      .addHeader('X-Auth-Token', token);
  },

  delete: function (title, id, token) {
    return frisby.create(title).delete(url.account(id))
      .addHeader('X-Auth-Token', token);
  },

  admin: function (callback) {
    this.signIn('Admin fixture', {
      email: 'admin@example.com',
      password: '12345678'
    })
      .expectStatus(200)
      .afterJSON(function (response) { callback(response); })
      .toss();
  },

  manager: function (callback) {
    this.signIn('Manager fixture', {
      email: 'manager@example.com',
      password: '12345678'
    })
      .expectStatus(200)
      .afterJSON(function (response) { callback(response); })
      .toss();
  },

  user: function (callback) {
    this.register('User fixture', {
      email: 'pejovic' + Math.round(Math.random() * 10000) + '@example.com',
      password: '12345678',
      firstName: 'Predrag',
      lastName: 'Pejovic'
    })
      .expectStatus(200)
      .afterJSON(function (response) { callback(response); })
      .toss();
  }
};
