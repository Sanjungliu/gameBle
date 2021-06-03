'use strict';


module.exports = {
  up:  (queryInterface, Sequelize) => {
    let data = require('./PlayGames__202106040021.json')

    
     return queryInterface.bulkInsert('PlayGames', data)
    
  },

  down:  (queryInterface, Sequelize) => {
   
    
     return queryInterface.bulkDelete('PlayGames', null, {});
 
  }
};
