const Sequelize = require('sequelize');
const _ = require('lodash');
const faker = require('faker')

const Conn = new Sequelize("relay", "postgres", "root", {
  host: "localhost",
  dialect: "postgres"
});

const person = Conn.define('person',{
    firstName:{
        type: Sequelize.STRING,
        allowNill: false
    },
    lastName:{
        type: Sequelize.STRING,
        allowNill: false
    },
    email:{
        type: Sequelize.STRING,
        allowNill: false,
        validate:{
            isEmail: true
        }
    },
}
)

const post = Conn.define('post',{
    title:{
        type: Sequelize.STRING,
        allowNill: false
    },
    content:{
        type: Sequelize.STRING,
        allowNill: false
    },
}
)

//person.hasMany(post);
//post.belongTo(person);

Conn.sync({force: true}).then(()=>{
    _.times(10, ()=>{
        return person.create({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email()
        })
    })
})

module.exports = Conn