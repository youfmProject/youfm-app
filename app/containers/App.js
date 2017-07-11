import React, { Component, PropTypes } from 'react';
import {Link } from 'react-router';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
      <Link to="/home">/users</Link><br/>
      <Link to="/search">search</Link><br/>
      <Link to="/playlist">play</Link><br/>
        {this.props.children}
      </div>
    );
  }
}
