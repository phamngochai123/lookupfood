import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { Dimensions } from 'react-native';
import _ from 'lodash';
import * as action from '../../../app-actions/index';

import { connect } from 'react-redux';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class SearchBars extends Component {
    render() {
        return (
            <SearchBar
                containerStyle={{ width: width*0.9, backgroundColor: '#fff' }}
                clearIcon={{ name: "highlight-off", color: '#86939e' }}
                round
                lightTheme
                onChangeText={_.debounce((text) => action.changeValueSearch(this.props.dispatch, text), 1000)}
                placeholder='Tìm kiếm....' />
        )
    }
}
module.exports = connect(function (state) {
    return { search: state.ValueSearch }
})(SearchBars);