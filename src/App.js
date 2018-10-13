import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from './components/Menu'
import Search from './components/Search'
import GeoMap from './components/GeoMap'
import './App.css';

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
        { this.props.locations.length > 0 ? <GeoMap /> : null }
      </div>
    );
  }

} // end of App component

const mapStateToProps = (state) => {
  return {
    locations: state.locations
  }
}

export default connect(mapStateToProps)(App)
