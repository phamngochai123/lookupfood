import * as reducerHome from './reducerItems/HomeReducer';
var redux = require('redux');
var reducer = redux.combineReducers({
    ListRestaurant: reducerHome.getListRestaurant,
    LoadMoreRestaurant: reducerHome.loadMoreRestaurant,
    SetRefresh: reducerHome.setRefresh,
    ValueSearch: reducerHome.changeValueSearch,
    IsLogin: reducerHome.logIn
});
var store = redux.createStore(reducer);
store.subscribe(() => {console.log(store.getState())});
module.exports = store;