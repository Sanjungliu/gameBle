'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PlayGames', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      time_played: {
        type: Sequelize.DATE
      },
      PlayerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Players',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      GameId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Games',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PlayGames');
  }
};