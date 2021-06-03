'use strict';


module.exports = {
  up:  (queryInterface, Sequelize) => {
    let data = require('./Games__202106040020.json')

    
     return queryInterface.bulkInsert('Games', data)
    
  },

  down:  (queryInterface, Sequelize) => {
   
    
     return queryInterface.bulkDelete('Games', null, {});
 
  }
};
