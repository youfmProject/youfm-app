import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classNames';
export default class SideBar extends Component {
  render() {
  	// ADD SIDEBAR CLASS
    const query = this.props.params.play;
    return (
			<div className={classNames('rail', 'rail--left')} style={{overflow: 'auto'}}>
				<div className={classNames("navigation__mobile")}>
					<div id="nav-icon3">
						<span></span><span></span><span></span><span></span>
					</div>
				</div>
    	<div className={classNames('navigation--main')}>
    		<ul className={classNames('navigation')}>
          <li><Link to={"/heavyRotation/"+query} activeClassName="active">Heavy Rotation</Link></li>
          <li><Link to={"/mostPopular/"+query} activeClassName="active">Most Popular</Link></li>
          <li><Link to={"/newReleases/"+query} activeClassName="active">New & Fresh</Link></li>
          <li><Link to={"/nowPlaying/"+query} activeClassName="active">Now Playing</Link></li>
					<li><Link to="/login" activeClassName="active">Login</Link></li>
					<li><Link to="/register" activeClassName="active">Register</Link></li>
    		</ul>
		</div>
		</div>
    );
  }
}