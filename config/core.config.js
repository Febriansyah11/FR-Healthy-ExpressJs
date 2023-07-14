require('dotenv').config()
const core = {};
// const smtpTransport = require('nodemailer-smtp-transport')
const ejs = require('ejs');

core.uuid = require('uuid');

core.env = process.env

core.jwt = require('jsonwebtoken')

core.dbConnect = () => {
    const dbConfig = require("./db.config");
    const Sequelize = require("sequelize");

    return new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: 0,
        quoteIdentifiers:false,
        define: {
            timestamps: false,
            underscored: true,
            paranoid: false,
        },
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        },
        timezone: '+07:00',
        logging: true
    });
}

core.userAgent = require('express-useragent')

core.models = () => {
    const initModels = require("../models/init-models");
    const models = initModels(core.dbConnect());

    return models;
}

core.multer = require('multer')

module.exports = core;