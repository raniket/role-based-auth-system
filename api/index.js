const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash');
let db = require('./data');

console.log('user : ', db.user);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  next();
});

let currentUser = {};

const port = process.env.PORT || 9000;

app.post('/signup', (req, res) => {
  console.log('SIGNUP CALLED in SERVER @ ', new Date().toUTCString());
  const body = req.body;
  if (!body) {
    res.status(400);
    res.json({ error: 'body is required' });
  }

  console.log('body: ', body);
  const id = db.user.length + 1;
  body.id = id;
  db.user.push(body);
  res.status(201);
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'resource created' });

});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = db.user.find(user => user.email === email && user.password === password);
  if (_.isEmpty(user)) {
    res.status(400);
    res.json({ error: 'user not found' });
  } else {
    currentUser = user;
    console.log('USER LOGIN CALLED in SERVER ', new Date().toUTCString());
    console.log('current user is : ', currentUser);
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.json(currentUser)
  }
});

app.get('/logout', (req, res) => {
  currentUser = {};
  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'logout success' })
})

app.get('/user', (req, res) => {
  if (_.isEmpty(currentUser)) {
    res.status(403)
    res.setHeader('Content-Type', 'application/json');
    res.json({ error: 'unauthorized' });
  }
  console.log('GET ALL USER CALLED in SERVER @ ', new Date().toUTCString());
  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  res.json(db.user);
});


app.get('/resource/:id', (req, res) => {
  console.log('GET RESOURECE BY id CALLED in SERVER @ ', new Date().toUTCString());
  const id = req.params.id;
  console.log('GET RESOURCE BY id CALLED in SERVER @ ', new Date().toUTCString());
  const resource = db.resource.find(resource => resource.id === id);
  console.log('resource: ', resource);
  console.log('current user : ', currentUser);
  if (_.isEmpty(currentUser)) {
    res.status(401);
    res.setHeader('Content-Type', 'application/json');
    res.json({ error: 'access denied' });
  } else if (currentUser.role === resource.accessPolicy) {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.json(resource);
  } else {
    res.status(403)
    res.setHeader('Content-Type', 'application/json');
    res.json({ error: 'unauthorized' });
  }
});

app.put('/resource/:id', (req, res) => {
  if (_.isEmpty(currentUser)) {
    res.status(403)
    res.setHeader('Content-Type', 'application/json');
    res.json({ error: 'unauthorized' });
  }
  const id = req.params.id;
  console.log('UPDATE RESOURCE CALLED in SERVER @ ', new Date().toUTCString(), ' with id : ', id);
  const body = req.body;
  if (!body) {
    res.status(400);
    res.json({ error: 'body is required' });
  }
  console.log('id : ', id);
  console.log('body: ', body);
  db.resource = db.resource.map(resource => {
    if (resource.id === id) return _.merge(resource, body);
    else return resource;
  })
  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'resource updated' })
});

app.get('/resource', (req, res) => {
  if (_.isEmpty(currentUser)) {
    res.status(403)
    res.setHeader('Content-Type', 'application/json');
    res.json({ error: 'unauthorized' });
  } else if (currentUser.role === 'admin' || currentUser.role === 'both') {
    const resource = db.resource.filter(resource => resource.accessPolicy !== 'user');
    res.status(200)
    res.setHeader('Content-Type', 'application/json');
    res.json(resource);
  } else {
    const resource = db.resource.filter(resource => resource.accessPolicy === 'user');
    res.status(200)
    res.setHeader('Content-Type', 'application/json');
    res.json(resource);
  }
})

app.put('/changeuseraccess', (req, res) => {
  console.log('current user : ', currentUser)
  if (_.isEmpty(currentUser)) {
    res.status(403)
    res.setHeader('Content-Type', 'application/json');
    res.json({ error: 'unauthorized' });
  } else if (currentUser.role === 'admin' || currentUser.role === 'both') {
    const id = req.body.id;
    const body = req.body;
    const user = db.user.find(user => user.id === id);
    if (_.isEmpty(user)) {
      res.status(404)
      res.setHeader('Content-Type', 'application/json');
      res.json({ error: 'user not found' });
    } else if (!body.role) {
      res.status(400)
      res.setHeader('Content-Type', 'application/json');
      res.json({ error: 'role is required in body' });
    } else {
      db.user = db.user.map(user => {
        if (user.id === id) return _.merge(user, body);
        else return user;
      })
      res.status(200)
      res.setHeader('Content-Type', 'application/json');
      res.json({ error: 'user updated successfully' });
    }
  } else {
    console.log('body : ', req.body)
    res.status(403)
    res.setHeader('Content-Type', 'application/json');
    res.json({ error: 'unauthorized' });
  }
})


app.listen(port);
console.log('SERVER IS RUNNING ON PORT : ' + port);
