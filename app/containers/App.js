import React, { Component, PropTypes } from 'react';
import {Link } from 'react-router';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
