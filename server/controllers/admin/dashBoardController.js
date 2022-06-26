const extensions = require('../../helper/extensions.js')

const displayDashBoardInfo = async (req, res) => {
    let moviesStat

    await extensions.getNumberOfTimeMoviesIsSubscribed().then((response) => {
        moviesStat = response
    })
    console.log(moviesStat)
    return res.status(200).json("noice")
}

module.exports = displayDashBoardInfo