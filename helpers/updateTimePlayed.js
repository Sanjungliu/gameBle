function updateTimePlayed(start, stop) {
    let duration = stop.getTime() + start.getTime()
    return new Date(duration)   
}

module.exports = updateTimePlayed