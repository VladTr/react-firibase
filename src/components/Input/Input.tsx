import React, {Component} from 'react';
import {connect} from 'react-redux';

class Input extends Component<{ onChange: any, name: string}> {
    state = {
        value:''
    };

    onChangeHandler = (ev) => {
        this.props.onChange(this.props.name, ev.target.value);
        this.setState({value: ev.target.value})
    };

    render() {
        return (
            <input type="text" onChange={this.onChangeHandler} value=""/>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    onChange: (field: string, value: string) => dispatch({type: "SEARCH", payload: {field, value}})
});

export default connect(null, mapDispatchToProps)(Input);
