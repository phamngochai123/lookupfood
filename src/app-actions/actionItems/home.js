
import actions from '../../actions';
import _ from 'lodash';
import { Alert } from 'react-native';


function getListRestaurant(dispatch, api) {
    try {
        return fetch(api)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.length > 0) {
                    dispatch(actions.getListRestaurant(responseJson));
                    dispatch(actions.setRefresh(false));
                }
            })
    } catch (error) {
        console.log(error);
    }
}

function getLoadMoreRestaurant(dispatch, api) {
    try {
        return fetch(api)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.length > 0) {
                    dispatch(actions.getLoadMoreRestaurant(responseJson));
                }
                else {
                    Alert.alert(
                        'Alert Title',
                        'Đã hết dữ liệu',
                        [
                            {
                                text: 'Cancel', onPress: () => console.log("12345"), style: 'cancel'
                            },
                            {
                                text: 'OK', onPress: () => console.log("1234")
                            },
                        ],
                        { cancelable: false }
                    )
                }
            })
    } catch (error) {
        console.log(error);
    }
}

function changeValueSearch(dispatch, text){
    dispatch(actions.changeValueSearch(text));
}
module.exports = { getListRestaurant, getLoadMoreRestaurant, changeValueSearch };