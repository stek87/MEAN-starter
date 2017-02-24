# Angular2 MEAN -  application with ExpressJS, MongoDB, Gulp and Typescript

1. Latest version of Node to be installed.
2. Install MongoDB and make sure it is running on default port 27017 (if not then configure constants.ts and change the connection for mongoDB).

## Global packages
```
    npm install ts-node -g
    npm install typescript-node -g
```

## Steps to Run
```sh
    npm install          <= install all the npm Dependencies
    npm run build        <= build and compile the dest folder
    npm run start       <= start the Nodemon and watch for changes.
```

## Api Document

```
1. get        http://localhost:3000/api/accounts             <= get all accounts
2. get        http://localhost:3000/api/accounts/:id       <= get account by Id
3. post      http://localhost:3000/api/accounts             <= create account
4. put        http://localhost:3000/api/accounts/:id       <= update account
5. delete    http://localhost:3000/api/accounts/:id      <= delete account
6. post      http://localhost:3000/api/authenticate       <= authenticate 

```
## Dependencies

1. Angular 2
2. TypeScript
3. Gulp
4. ExpressJS
5. NodeJS
6. Nodemon
7. TsLint
8. MongoDB
9. Jwt
10. Frisby
