const {Op} = require('sequelize')
const {Player, Game, PlayGame} = require('../models')

const getDuration = require('../helpers/getDuration')
const updateTimePlayed = require('../helpers/updateTimePlayed')

class Controller {
    static playerList(req, resp) {
        let PlayerId = req.session.playerId

        Player.findAll()
        .then(data => {
            resp.render('players', {data, PlayerId})
        })
        .catch(err => {
            resp.send(err)
        })

    }

    static gameList(req, resp) {
        let PlayerId = req.session.playerId

        Game.findAll()
        .then(data => {
            resp.render('games', {data, PlayerId})
        })
        .catch(err => {
            resp.send(err)
        })

    }

    static playGames(req, resp) {
        let PlayerId = req.params.playerId

        Player.findByPk(PlayerId, {
            include: Game
        })
        .then(data => {

            resp.render('playGames', {data, PlayerId})
        })
        .catch(err => {
            resp.send(err)
        })

    }

    static gamePlayers(req, resp) {
        let gameId = req.params.gameId
        let PlayerId = req.params.playerId

        Game.findByPk(gameId, {
            include: Player
            // order: [Player.associations.PlayGame, "time_played", "DESC" ]
        })
        .then(data => {
            const players = PlayGame.sortByDuration(data.Players)

            // let test = sortArray(data.Players)
            // resp.send(data)

            resp.render('gamePlayers', {data, players, PlayerId})
        })
        .catch(err => {
            resp.send(err)
        })
    }

    static deletePlayGame(req, resp) {
        let playerId = req.params.playerId
        let gameId = req.params.gameId

        PlayGame.destroy({
            where: {
                PlayerId: playerId,
                GameId: gameId
            }
        })
        .then(() => {
            resp.redirect(`/players/${playerId}`)
        })
        .catch(err => {
            resp.send(err)
        })
    }

    static playPlayGame(req, resp) {
        let playerId = req.params.playerId
        let gameId = req.params.gameId

        PlayGame.play = new Date()
        
        PlayGame.update({isPlaying: true}, {
            where: {
                PlayerId: playerId,
                GameId: gameId
            }
        })
        .then(() => {
            resp.redirect(`/players/${playerId}`)
        })
        .catch(err => {
            resp.send(err)
        })

        // resp.redirect(`/players/${playerId}`)

    }

    static stopPlayGame(req, resp) {
        let playerId = req.params.playerId
        let gameId = req.params.gameId

        let play = PlayGame.play
        let stop = new Date()

        delete PlayGame.play
        // console.log(PlayGame.play);


        let duration = getDuration(play, stop)
        // resp.send(`${duration.getTime()}`)


        PlayGame.findOne({
            where: {
                PlayerId: playerId,
                GameId: gameId
            }
        })
        .then(data => {
            let time_played = data.time_played
            // resp.send(`${time.getTime()}`)
            
            time_played = updateTimePlayed(time_played, duration)
            // resp.send(`${time_played.getTime()}`)
            
            return PlayGame.update({time_played, isPlaying: false}, {
                where: {
                    PlayerId: playerId,
                    GameId: gameId
                }
            })
        })
        .then(() => {
            resp.redirect(`/players/${playerId}`)
        })
        .catch(err => {
            resp.send(err)
        })
    }

    static playerAddGame (req, resp){
        let GameId = req.params.gameId
        let PlayerId = req.session.playerId
        const input = {GameId, PlayerId}

        PlayGame.create(input)
        .then(() => {
            resp.redirect('/games')
        })
        .catch(err => {
            resp.send(err)
        })
    }
}

module.exports = Controller