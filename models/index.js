var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page  = db.define('page', {
  title: Sequelize.STRING,
  urlTitle: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  content: Sequelize.STRING,
  date: Sequelize.DATE,
  status: Sequelize.ENUM('open', 'closed')
});

var User = db.define('user', {
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate:{
      isEmail:true
    }
  }
})

// db.sync({ force: true })
//   .then(function(){
//     console.log('synced');
//   })

module.exports = {
  Page: Page,
  User: User,
  db: db
}
