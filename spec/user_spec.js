var users = require('./rest/users');

users.register('Create a new user', {
  email: 'Predrag' + Math.round(Math.random() * 1000) + '@coingcs.com',
  password: '12345678',
  firstName: 'Predrag',
  lastName: 'Pejovic'
})
  .expectStatus(200)
  .expectJSON({
    firstName: 'Predrag',
    lastName: 'Pejovic',
    role: 'USER'
  })
  .toss();

users.signIn('Sign in as a manager', {
  email: 'manager@example.com',
  password: '12345678'
})
  .expectStatus(200)
  .expectJSON({
    firstName: 'manager',
    lastName: 'manager',
    role: 'MANAGER'
  })
  .toss();

users.signIn('Sign in as an admin', {
  email: 'admin@example.com',
  password: '12345678'
})
  .expectStatus(200)
  .expectJSON({
    firstName: 'admin',
    lastName: 'admin',
    role: 'ADMIN'
  })
  .toss();

users.register('Create a new user fails if email exists', {
  email: 'admin@example.com',
  password: '12345678',
  firstName: 'Predrag',
  lastName: 'Pejovic'
})
  .expectStatus(400)
  .expectJSON({message: 'Email already exists'})
  .toss();

users.register('Create a new user fails if email is malformed', {
  email: 'admin!example.com',
  password: '12345678',
  firstName: 'Predrag',
  lastName: 'Pejovic'
})
  .expectStatus(400)
  .expectJSON({message: 'Email is not valid'})
  .toss();

users.signIn('SignIn fails if using wrong password', {
  email: 'admin@example.com',
  password: '12345678910'
})
  .expectStatus(401)
  .expectJSON({message: 'Incorrect password'})
  .toss();

users.signIn('SignIn fails if using wrong email address', {
  email: 'admin3333@example.com',
  password: '12345678'
})
  .expectStatus(401)
  .expectJSON({message: 'Your email is not registered'})
  .toss();

//Admin scope
users.admin(function (admin) {
  users.find('As an admin find all users', '', admin.token)
    .expectStatus(200)
    .after(function (err, res, body) {
      expect(JSON.parse(body).length).toBeGreaterThan(1).toss();
    });


  users.get('As an admin get admin user', '58adc57c7622510c8f0fcf2f' , admin.token)
    .expectStatus(200)
    .expectJSON({
      firstName: 'admin',
      lastName: 'admin',
      role: 'ADMIN'
    })
    .toss();

  users.get('As an admin get manager user', '58adc56d7622510c8f0fcf2e' , admin.token)
    .expectStatus(200)
    .expectJSON({
      firstName: 'manager',
      lastName: 'manager',
      role: 'MANAGER'
    })
    .toss();

  users.user(function (user) {
    users.get('As an admin get user user', user.id , admin.token)
      .expectStatus(200)
      .expectJSON({
        firstName: 'Predrag',
        lastName: 'Pejovic',
        role: 'USER'
      })
      .toss();

    users.promote('As an admin promote user to a MANAGER', user.id, admin.token, {
      firstName: 'Pejovic',
      lastName: 'Predrag',
      role: 'MANAGER'
    })
      .expectStatus(200)
      .expectJSON({
        firstName: 'Pejovic',
        lastName: 'Predrag',
        role: 'MANAGER'
      })
      .toss();

    users.delete('As an admin delete manager user', user.id, admin.token)
      .expectStatus(204)
      .toss();

    users.user(function (user) {
      users.delete('As an admin delete user user', user.id, admin.token)
        .expectStatus(204)
        .toss();
    });
  });
});

//Manager scope
users.manager(function (manager) {
  users.find('As a manager find all user users', '', manager.token)
    .expectStatus(200)
    .toss();

   users.get('As a manager get admin user', '58adc57c7622510c8f0fcf2f' , manager.token)
     .expectStatus(403)
     .expectJSON({message: 'You do not have permission!'})
     .toss();

  users.get('As a manager get manager user', '58adc56d7622510c8f0fcf2e' , manager.token)
    .expectStatus(403)
    .expectJSON({message: 'You do not have permission!'})
    .toss();

  users.user(function (user) {
    users.get('As a manager get regular user', user.id , manager.token)
      .expectStatus(200)
      .expectJSON({
        firstName: 'Predrag',
        lastName: 'Pejovic',
        role: 'USER'
      })
      .toss();

    users.promote('As a manager promote user to a manager', user.id, manager.token, {
      firstName: 'Pejovic',
      lastName: 'Predrag',
      role: 'MANAGER'
    })
      .expectStatus(200)
      .expectJSON({
        firstName: 'Pejovic',
        lastName: 'Predrag',
        role: 'MANAGER'
      })
      .toss();
  });

  users.user(function (user) {
    users.promote('As a manager can not promote user to an admin', user.id, manager.token, {
      firstName: 'Pejovic',
      lastName: 'Predrag',
      role: 'ADMIN'
    })
      .expectStatus(403)
      .expectJSON({message: 'You do not have permission!'})
      .toss();
  });

  users.user(function (user) {
    users.delete('As a manager delete regular user', user.id, manager.token)
      .expectStatus(204)
      .toss();
  });
});

//User scope
users.user(function (user) {
  users.signIn('User signs in', {
    email: user.email,
    password: '12345678'
  })
    .expectStatus(200)
    .afterJSON(function () {
      users.find('As a user find all users', '', user.token)
      .expectStatus(403)
      .expectJSON({message: 'You do not have permission!'})
      .toss();

      users.get('As a user get admin user', '58adc57c7622510c8f0fcf2f' , user.token)
        .expectStatus(403)
        .expectJSON({message: 'You do not have permission!'})
        .toss();

      users.get('As a user get manager user', '58adc56d7622510c8f0fcf2e' , user.token)
        .expectStatus(403)
        .expectJSON({message: 'You do not have permission!'})
        .toss();

      users.delete('As a user delete admin user', '58adc57c7622510c8f0fcf2f', user.token)
        .expectStatus(403)
        .expectJSON({message: 'You do not have permission!'})
        .toss();

      users.delete('As a user delete manager user', '58adc56d7622510c8f0fcf2e', user.token)
        .expectStatus(403)
        .expectJSON({message: 'You do not have permission!'})
        .toss();

      users.user(function (anotherUser) {
        users.delete('As a user delete another regular user', anotherUser.id, user.token)
          .expectStatus(403)
          .expectJSON({message: 'You do not have permission!'})
          .toss();
    });
  });
});
