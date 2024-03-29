import React, {Component} from 'react';
import {connect} from 'react-redux';


class GooglePlacesDropdown extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let _this = this;

        let input = this.refs.placeInput;
        let autocomplete = new google.maps.places.Autocomplete(input);

        autocomplete.addListener('place_changed', function() {
            let place = autocomplete.getPlace();
            if(_this.props.handleLocationChange && typeof _this.props.handleLocationChange === 'function') {
                if(place && place.place_id) {
                    _this.props.handleLocationChange(place);
                }
            }
        });
    }

    render() {
        return <input id="pac-input" type="text" placeholder="Enter a location" ref="placeInput"/>;
    }
}

const mapStateToProps = function(state) {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};


export default connect(mapStateToProps, mapDispatchToProps)(GooglePlacesDropdown);