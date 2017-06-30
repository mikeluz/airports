var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/airports', {
	logging: false,
  define: {
    underscored: true,       
    freezeTableName: true,   
    timestamps: true,        
	}
});

module.exports = db;