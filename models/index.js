var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');


let Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
        },
        urlTitle: {
            type: Sequelize.STRING,
            allowNull: false,

        },
        content: {
            type: Sequelize.TEXT,
        },
        status: {
            type: Sequelize.ENUM('open', 'closed'),
            allowNull: false

        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
            {
        hooks: {
            beforeValidate: function(page, options){
                var pageTitle = page.title;
                console.log(pageTitle)
                if (pageTitle){
                    var newPageTitle = pageTitle.split('').map(function(letter){
                      if (letter === ' '){
                        return "_";
                      }
                      else {
                        return letter;
                      }
                    }).join('');
                    page.urlTitle = newPageTitle;
                } else {
                    page.urlTitle = Math.random().toString(36).substring(2,7);
                }
            }   
        },
        getterMethods: {
            route: function() {
                return "/wiki/" + this.urlTitle;
            }

        }
    }
   
)

let User = db.define('user', {
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


Page.belongsTo(User, { as: 'author' });



module.exports = {
    Page: Page,
    User: User
};
