import _ from 'lodash';

const getListRestaurant = (state = [], action) => {
    switch (action.type) {
        case 'GET_LIST_RESTAURANT':
            return action.data;
        case 'LOAD_MORE':
            return action.data;
        default:
            return state;
    }
};

const loadMoreRestaurant = (state = [], action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const setRefresh = (state = [], action) => {
    switch (action.type) {
        case 'SET_REFRESH':
            return action.data;
        default:
            return state;
    }
};

const changeValueSearch = (state = [], action) => {
    switch (action.type) {
        case 'CHANGE_VALUE_SEARCH':
            return action.data;
        default:
            return state;
    }
}

const logIn = (state = false, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return true;
        case 'LOG_OUT':
            return false;
        default:
            return state;
    }
}

module.exports = { getListRestaurant, loadMoreRestaurant, setRefresh, changeValueSearch, logIn };