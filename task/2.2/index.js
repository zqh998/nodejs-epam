import { users } from './users';

const express = require('express');
const bodyParser = require('body-parser');

const Joi = require('@hapi/joi')
const validator = require('express-joi-validation').createValidator({});

const app = express();
app.use(bodyParser.json())

app.get('/listUsers', (req, res) => {
    res.json( users );
})

app.get('/user/:id', (req, res) => {
    console.log('get user by id:',req.params.id);
    const user = users.find(item => item.id === req.params.id);
    if(user){
        res.send('get user:\n' + JSON.stringify(user));
    }else{
        console.log('invalid user id:',req.params.id);
    }
})

const schema = Joi.object({
    id: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required(),
}); 

app.post('/createOrUpdateUser', validator.body(schema), (req, res) => {
    const user = req.body;
    console.log(user);

    if(user && user.id){
        const index = users.findIndex(item => item.id === user.id);
        if(index >= 0){//update
            users[index] = user;
            res.send(" update user successfully!");
        }else{//create
            users.push(user);
            res.send(" add user successfully!");
        }
    }else{
        res.send(" invalid user!");
    }
})

app.use((err, req, res, next) => {
    if (err) {
      res.status(400).json({
        message: err.toString()
      });
    } else {
      // pass on to another error handler
      next(err);
    }
});

var server = app.listen(3000, () => {
  var port = server.address().port;
  console.log("Server running at port:", port);
})