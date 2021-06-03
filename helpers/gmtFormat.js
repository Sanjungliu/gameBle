function gmtFormat(time) {
    time = time.getTime() + 25200000
    return new Date(time)   
}

module.exports = gmtFormat