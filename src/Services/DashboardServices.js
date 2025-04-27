function _getDashboard(request, response){
    response.render('Dashboard/Dashboard')
}

module.exports = {
    getDashboard : _getDashboard
}