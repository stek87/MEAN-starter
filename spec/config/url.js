var url = 'http://localhost:3000/api/';

module.exports = {
  signIn: function () {
    return url + 'authenticate';
  },
  accounts: function() {
    return url + 'accounts';
  },
  account: function(id) {
    return this.accounts() + '/' + id;
  }
};
