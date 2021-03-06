var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page  = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    // validate: {
    //   isUrl: true
    // },
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  status: Sequelize.ENUM('open', 'closed')
},
{
  getterMethods: {
    route: function() {
      return '/wiki/' + this.urlTitle;
    }
  },
  hooks: {
    beforeValidate: function(page, options) {
      page.urlTitle = generateUrlTitle(page.title);
      //options(null, page);
      //console.log(page.title, page.urlTitle)
    }
}
});

var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

Page.belongsTo(User, {as: 'author'});

// db.sync({ force: true })
//   .then(function(){
//     console.log('synced');
//   })
var generateUrlTitle = function(title) {
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

module.exports = {
  Page: Page,
  User: User,
  db: db
}
