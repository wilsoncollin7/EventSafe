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
        name: 'Neighborhood BBQ',
        date: '10/19/2020',
        location: 'Raleigh, NC',
        type: 'Food and Beverage',
        image: 'food-truck.jpg',
        description: 'Come and have some BBQ at our neighborhood!',
        safety: 'Masks Required | Hand Sanitizer Stations | Capacity Limits | Ground Markings for 6ft',
        UserId: 1
      }).then(() => {
        db.Event.create({
          name: 'Movie Showing',
          date: '10/31/2020',
          location: 'Cary, NC',
          type: 'Movie',
          image: 'movie.jpg',
          description: 'Outdoor movie showing!',
          safety: 'Masks Required | Hand Sanitizer Stations | Capacity Limits | Ground Markings for 6ft',
          UserId: 2
        }).then(() => {
          db.Review.create({
            title: 'Restaurant in Chapel Hill',
            location: 'Chapel Hill, NC',
            type: 'Restaurant',
            description: 'This restaurant was great! It felt every safe inside!',
            UserId: 1
          });
        }).then(() => {
          db.Review.create({
            title: 'Store in Durham',
            location: 'Durham, NC',
            type: 'Department Store',
            description: 'This store was great! It felt every safe inside!',
            UserId: 2
          });
        });
      });
    });
  });
};
