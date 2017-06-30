const Sequelize = require('sequelize');
const db = require('./index');

const Airport = db.define('airport', {
    ident: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    latitude_deg: {
        type: Sequelize.STRING,
        allowNull: false
    },
    longitude_deg: {
        type: Sequelize.STRING,
        allowNull: false
    },
    elevation_ft: {
        type: Sequelize.STRING
    },
    iso_region: {
        type: Sequelize.STRING
    },
    municipality: {
        type: Sequelize.STRING
    },
    scheduled_service: {
        type: Sequelize.STRING
    },
    gps_code: {
        type: Sequelize.STRING
    },
    iata_code: {
        type: Sequelize.STRING
    },
    local_code: {
        type: Sequelize.STRING
    },
    wikipedia_link: {
        type: Sequelize.STRING
    }
}, {});

module.exports = Airport;
