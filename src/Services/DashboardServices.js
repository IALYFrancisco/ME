function _getDashboard(request, response){
    response.render('Dashboard/Dashboard')
}

function _getAPIs(request, response){
    response.render('Dashboard/APIs')
}

module.exports = {
    getDashboard : _getDashboard,
    getAPIs : _getAPIs
}