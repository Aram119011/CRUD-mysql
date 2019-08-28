const Sequelize = require('sequelize');
const db = require('../database/postDB');
module.exports = db.sequelize.define(
    'posts',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        },
        img : {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)