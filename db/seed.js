module.exports = (db) => {
  db.User.create({
    firstName: 'Adam',
    lastName: 'Gates',
    location: 'Raleigh, NC',
    email: 'adam@gates.com',
    password: process.env.ADMIN_USER_PWD
  }).then(() => {
    db.User.create({
      firstName: 'Uma',
      lastName: 'Pearson',
      location: 'Durham, NC',
      email: 'uma@pearson.com',
      password: process.env.USER_PWD
    }).then(() => {
      db.Event.create({
        name: 'Sample Event',
        date: '10/31/2020',
        location: 'Raleigh, NC',
        type: 'Socially Distanced Block Party',
        description: 'Adam can\'t see this',
        UserId: 1
      });
    });
  });
};
