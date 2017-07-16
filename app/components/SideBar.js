import React, { Component } from 'react';
import { Link } from 'react-router'
export default class SideBar extends Component {
  render() {
  	// ADD SIDEBAR CLASS
    return (
    	<div className="rails" style={{float:'left', width:'100px', height:'1200px'}}>
    		<ul>
    			<li><Link to="/heavyRotation" activeClassName="active">Heavy Rotation</Link></li>
    			<li><Link to="/mostPopular" activeClassName="active">Most Popular</Link></li>
    			<li><Link to="/newReleases" activeClassName="active">New & Fresh</Link></li>
    			<li><Link to="/nowPlaying" activeClassName="active">Now Playing</Link></li>
    		</ul>
		</div>
    );
  }
}