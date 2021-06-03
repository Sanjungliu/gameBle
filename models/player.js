'use strict';
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(3)

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Player.belongsToMany(models.Game, {through: 'PlayGame', foreignKey: 'PlayerId'})
    }
  };
  Player.init({
    username: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          msg:`username harus di isi`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          msg: `password harus di isi`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg:`email harus di isi`
        }
      }
    },
    favourite_genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `favourite game harus di isi`
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg:`gender harus di isi`
        }
      }
    },
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Player',
  });

  Player.beforeCreate(instance => {
    instance.isAdmin = false
  })

  Player.beforeCreate(instance => {
    instance.password = bcrypt.hashSync(instance.password, salt)
  })

  return Player;
};