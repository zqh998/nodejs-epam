
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/epamdb',{
    define: {
        timestamps: false
    }
});
sequelize
    .authenticate()
    .then(() => {
        console.log('DBConnection has been established successfully');
    })
    .catch(err => {
        console.log('Unable to connect to the database:', err);
    });

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    login: {
        type: Sequelize.STRING(20)
    },
    password: {
        type: Sequelize.STRING(20)
    },
    age: {
        type: Sequelize.INTEGER
    },
    isdeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false,    
});
User.sync().then(() => {
    console.log('Sync User model with users table in db successfully');
});

app.get('/listUsers', (req, res) => {
    User.findAll().then(users => {
        res.json( users );
    });
});

app.get('/user/:id', (req, res) => {
    console.log('get user by id:',req.params.id);
    User.findAll({where:{id: req.params.id}}).then(users => {
        if(users && users.length > 0){
            res.send('get user:\n' + JSON.stringify(users[0]));
        }else{
            res.send('invalid user id:' + req.params.id);
        }
    }).catch(err => {
        console.log('invalid user id:',req.params.id);
    });
})

app.get('/deleteUser/:id', (req, res) => {
    console.log('delete user by id:',req.params.id);
    User.findAll({where:{id: req.params.id}}).then(users => {
        if(!users || users.length == 0){
            res.send('invalid user id:' + req.params.id);
        }
    })
    User.update({ isdeleted: true },{where:{id: req.params.id}}).then(() => {
        res.send("user is marked as 'deleted' successfully");
    }).catch(err => {
        console.log('invalid user id:',req.params.id);
    });
})

app.post('/createOrUpdateUser', (req, res) => {
    const user = req.body;
    console.log('user:',user);

    if(user && user.id){
        User.findAll({where:{id: user.id}}).then(users => {
            if(users && users.length > 0){//update
                User.update(user,{where:{id: user.id}}).then(() => {
                    res.send(" Update user: " + user.login + " successfully!");
                }).catch(err => {
                    res.send('invalid user: ' + err);
                });
            }else{//create
                User.create(user).then(retUser => {
                    res.send(" Create user: " + retUser.login + " successfully!");
                }).catch(err => {
                    res.send('invalid user: ' + err);
                });;
            }
        });
    }else{
        res.send(" invalid user!");
    }
})

var server = app.listen(3000, () => {
  var port = server.address().port;
  console.log("Server running at port:", port);
})