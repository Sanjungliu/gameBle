'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlayGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    getHours(){
      let hours = this.time_played.getTime() / 3_600_000
      hours = Number(parseFloat(hours).toFixed(2))

      return hours + " hours"
    }

    static sortByDuration(array) {
      let arr = array.sort((a,b) => {
        let c = new Date(a.PlayGame.time_played)
        let d = new Date(b.PlayGame.time_played)

        return d - c
      }) 
      return arr
    }

  };
  PlayGame.init({
    time_played: DataTypes.DATE,
    PlayerId: DataTypes.INTEGER,
    GameId: DataTypes.INTEGER,
    isPlaying: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PlayGame',
  });

  PlayGame.beforeCreate((instance, opt) => {
    instance.isPlaying = false
    instance.time_played = new Date(0)
  })

  return PlayGame;
};