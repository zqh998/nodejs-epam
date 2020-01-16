import { User } from '../models/user';

export const UserService =  {
    getAllUsers: async ()=>{
        const users = await User.findAll();
        return users;
    },
    getUserById: async (uid)=>{
        console.log('get user by id:', uid);
        const users = await User.findAll({where:{id: uid}});
        if(users && users.length > 0){
            return users[0];
        }else{
            return null;
        }
    },
    deleteUser: async (uid)=>{
        const updateRecord = await User.update({ isdeleted: true },{where:{id: uid}});
        return updateRecord;
    },
    createUser: async (user)=>{
        const newUser = await User.create(user);
        return newUser;
    },
    updateUser: async (user)=>{
        const updateRecord = await User.update(user,{where:{id: user.id}});
        return updateRecord;
    },
}