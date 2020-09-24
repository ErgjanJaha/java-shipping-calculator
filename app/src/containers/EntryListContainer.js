import {connect} from 'react-redux';
import EntryList from '../components/EntryList';
import React from 'react';
import {loadEntries} from '../actions';

class EntryListContainer extends React.Component {
    constructor(props) {
        super(props);
        if (!props.entries || !props.entries.length) {
            props.loadEntries();
        }
    }

    render() {
        return (
            (this.props.loadingEntries === false) ? <EntryList {...this.props} /> : <div>Loading...</div>
        );
    }
}

const mapStateToProps = (state) => ({
    entries: state.create.entries,
    loadingEntries: state.create.loadingEntries,
});

const mapDispatchToProps = (dispatch) => ({
    loadEntries: () => dispatch(loadEntries()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EntryListContainer);