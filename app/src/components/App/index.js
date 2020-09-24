import React, { Component } from "react";
import CreateEntryContainer from "../../containers/CreateEntryContainer";
import EntryListContainer from "../../containers/EntryListContainer";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { BrowserRouter, Link } from "react-router-dom";
import "./index.less";

class Index extends Component {
  render() {
    return (
        <BrowserRouter>
          <div>
            <h1>Hello FortNox!</h1>
            <title>Fortnox Kodprov</title>
            <nav>
              <Link to="/add">add</Link>|<Link to="/list">list</Link>
            </nav>
            <div className="container">
              <Route path="/add" component={CreateEntryContainer} />
              <Route path="/list" component={EntryListContainer} />
            </div>
          </div>
        </BrowserRouter>
    );
  }
}

Index.propTypes = {
  addingEmployee: PropTypes.bool,
}

export default Index;