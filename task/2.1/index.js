import { users } from './users';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
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

app.get('/deleteUser/:id', (req, res) => {
    console.log('delete user by id:',req.params.id);
    const index = users.findIndex(item => item.id === req.params.id);
    if(index >= 0){
        users[index].isDeleted = true;
        res.json( users[index] );
    }else{
        console.log('invalid user id:',req.params.id);
    }
})

app.post('/createOrUpdateUser', (req, res) => {
    const user = req.body;
    console.log('user:',user);

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
//http://localhost:3000/getAutoSuggestUsers?loginSubstring=o&limit=2
app.get('/getAutoSuggestUsers', (req, res) => {
    const loginSubstring = req.query.loginSubstring;
    const limit = req.query.limit;
    console.log('getAutoSuggestUsers by: ',loginSubstring, limit);
    if(loginSubstring && limit){
        //  filtered by loginSubstringin the login property
        let filterUsers = users.filter(user => user.login.includes(loginSubstring));
        if(filterUsers.length > 0){
            if(filterUsers.length > limit){//limit control
                filterUsers = filterUsers.slice(0,limit);
            }
            filterUsers.sort((a, b) => {// sorted by login property
                const nameA = a.login.toUpperCase(); 
                const nameB = b.login.toUpperCase(); 
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }       
                return 0;
            });
            res.json( filterUsers );
        }else{
            res.send("no match users!");
        }
    }else{
        res.send("invalid loginSubstring or limit!");
    }
})

var server = app.listen(3000, () => {
  var port = server.address().port;
  console.log("Server running at port:", port);
})