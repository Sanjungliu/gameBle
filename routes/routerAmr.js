const router = require('express').Router()
const Controller = require('../controllers/controllerAmr')

router.get('/', (req, res) => {
    res.send('Hello World! this is Amr Route')
  })

router.get('/players', Controller.playerList)
router.get('/games', Controller.gameList) 

router.get('/players/:playerId', Controller.playGames)
router.get('/games/:gameId', Controller.gamePlayers)

router.get('/players/:playerId/play/:gameId', Controller.playPlayGame)

router.get('/players/:playerId/stop/:gameId', Controller.stopPlayGame)

router.get('/players/:playerId/delete/:gameId', Controller.deletePlayGame)

router.get('/games/:gameId/addGame/:playerId', Controller.playerAddGame)


module.exports = router