let user = [
  {
    id: '1',
    firstName: 'Raniket',
    lastName: 'Ram',
    email: 'raniketram@gmail.com',
    password: '123',
    role: 'admin',
  },
  {
    id: '2',
    firstName: 'ricky',
    lastName: 'rock',
    email: 'ricky@gmail.com',
    password: '123',
    role: 'user',
  },
  {
    id: '3',
    firstName: 'logan',
    lastName: 'wolf',
    email: 'logan@gmail.com',
    password: '123',
    role: 'both',
  }
];

let role = [
  {
    id: '1',
    roleName: 'user',
  },
  {
    id: '2',
    roleName: 'admin',
  },
  {
    id: '3',
    roleName: 'both',
  },
];

let resource = [
  {
    id: '1',
    imageUrl: 'https://www.gstatic.com/webp/gallery3/1.png',
    accessPolicy: 'both',
  },
  {
    id: '2',
    imageUrl: 'https://www.gstatic.com/webp/gallery3/2.png',
    accessPolicy: 'both',
  },
  {
    id: '3',
    imageUrl: 'https://www.gstatic.com/webp/gallery3/3.png',
    accessPolicy: 'user',
  },
  {
    id: '4',
    imageUrl: 'https://www.gstatic.com/webp/gallery3/4.png',
    accessPolicy: 'user',
  },
  {
    id: '5',
    imageUrl: 'https://www.gstatic.com/webp/gallery3/5.png',
    accessPolicy: 'admin',
  },
];

let actionType = [
  {
    id: '1',
    action: 'read',
  },
  {
    id: '2',
    action: 'write',
  },
  {
    id: '3',
    action: 'delete',
  }
];

exports.user = user;
exports.role = role;
exports.resource = resource;
exports.actionType = actionType;