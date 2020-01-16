const Sequelize = require('sequelize');
export const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/epamdb',{
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
