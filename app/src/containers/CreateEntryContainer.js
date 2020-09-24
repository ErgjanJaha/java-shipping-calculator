import {connect} from "react-redux";
import CreateEntry from "../components/CreateEntry";
import React, {Component} from "react";
import {createEntry} from "../actions";

class CreateEntryContainer extends Component {
    render() {
        return (
            <CreateEntry {...this.props}/>
        );
    }
}
const mapStateToProps = (state) => ({
    entries: state.create.entries,
    creatingEntry: state.create.creatingEntry,
});

const mapDispatchToProps = (dispatch) => ({
    createEntry: () => dispatch(createEntry()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateEntryContainer);