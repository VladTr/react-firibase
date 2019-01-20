import React, {Component} from 'react';
import {connect} from 'react-redux';

class Picker extends Component<{ onChange: any}> {
    state = {
        start: new Date(),
        end: new Date()
    };

    handleChange = (ev, field) => {
        this.setState({
            [field]: new Date(ev.target.value)
        });

        if(this.state.end > this.state.start) {
            this.props.onChange('lastActive', {
                start: this.state.start.getTime(),
                end: this.state.end.getTime()
            })
        }
    };

    render() {
        return (
            <>
                <input type="date" onChange={(ev)=>this.handleChange(ev, 'start')}/>
                <input type="date" onChange={(ev)=>this.handleChange(ev, 'end')}/>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    onChange: (field: string, value: any) => dispatch({type: "SEARCH", payload: {field, value}})
});

export default connect(null, mapDispatchToProps)(Picker);
