import { connect } from 'react-redux';
import App from '../components/App/';


const mapStateToProps = (state) => ({
    creatingEntry: state.create.creatingEntry,
});


export default connect(mapStateToProps)(App);