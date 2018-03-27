function getListRestaurant(data){
    return { type: 'GET_LIST_RESTAURANT', data }
}

function getLoadMoreRestaurant(data){
    return { type: 'LOAD_MORE', data }
}

function changeValueSearch(data){
    return { type: 'CHANGE_VALUE_SEARCH', data }
}

function setRefresh(data){
    return { type: 'SET_REFRESH', data }
}

function logIn(){
    return { type: 'LOG_IN' }
}

function logOut(){
    return { type: 'LOG_OUT' }
}

module.exports = { getListRestaurant, getLoadMoreRestaurant, setRefresh, changeValueSearch, logIn, logOut };