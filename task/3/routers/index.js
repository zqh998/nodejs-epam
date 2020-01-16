import { UserService } from '../services/user';

const express = require('express');
const router = express.Router();

router.get('/listUsers', async (req, res) => {
    const users = await UserService.getAllUsers();
    res.json( users );
});

router.get('/user/:id', async (req, res) => {
    const user = await UserService.getUserById(req.params.id);
    if(user){
        res.send('get user:\n' + JSON.stringify(user));
    }else{
        res.send('invalid user id:' + req.params.id);
    }
})

router.get('/deleteUser/:id', async (req, res) => {
    console.log('delete user by id:',req.params.id);
    const user = await UserService.getUserById(req.params.id);
    if(user){
        const updateRecord = await UserService.deleteUser(req.params.id);
        if(updateRecord){
            res.send("User:" + user.login + " is marked as 'deleted' successfully");
        }else{
            res.send("user failed to be marked as 'deleted'");
        }
    }else{
        res.send('invalid user id:' + req.params.id);
    }    
})

router.post('/createOrUpdateUser', async (req, res) => {
    const user = req.body;
    console.log('user:',user);

    if(user && user.id){
        const existedUser = await UserService.getUserById(user.id);
        if(existedUser){//update
            const updateRecord = await UserService.updateUser(user);
            if(updateRecord) {
                res.send(" Update user: " + user.login + " successfully!");
            }else{
                res.send('failed to update user');
            };
        }else{//create
            const newUser = await UserService.createUser(user);
            if(newUser) {
                res.send(" Create user: " + newUser.login + " successfully!");
            }else{
                res.send('failed to create user');
            };
        }    
    }else{
        res.send(" invalid user!");
    }
})

module.exports = router;












