import { sequelize } from '../data-access/pg';
const Sequelize = require('sequelize');

export const User = sequelize.define('user', {
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
