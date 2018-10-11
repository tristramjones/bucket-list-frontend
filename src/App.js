import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from './components/Menu'
import Search from './components/Search'
import GeoMap from './components/GeoMap'
import './App.css';

const BASE_URL = 'http://localhost:3000/api/v1';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isMenuDisplayed: false,
    };
  }

  handleMenuDisplay = () => {
    this.setState({
      isMenuDisplayed: !this.state.isMenuDisplayed
    })
  }

  render() {
    return (
      <div className="app-container">
        <Search />
        { this.state.isMenuDisplayed ? <Menu locations={ this.props.markers }/> : null }
      </div>
    );
  }

} // end of App component

const mapStateToProps = (state) => {
  return {
    markers: state.markers
  }
}

export default connect(mapStateToProps)(App)
