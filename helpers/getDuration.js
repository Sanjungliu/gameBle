function getDuration(start, stop) {
    let duration = stop.getTime() - start.getTime()
    return new Date(duration)   
}

// let stop = new Date(7200000)
// let start = new Date(0)

// console.log(getDuration(start, stop));

module.exports = getDuration