import React, { Component } from 'react';
import classNames from 'classNames';
export default class Home extends Component {

	buildSpotLight(spotlight){
		let fields= [];
		// ADD ALBUM CLASS
		spotlight.map((album)=>{
			fields.push(<div style={{height:'300px',width:'200px', float:'left'}}>
				<p style={{backgroundImage: 'url('+album.image+')', height:'180px', width:'180px', margin: '0 0 10px 0'}}/>
				<p style={{color: 'red'}}>{album.artist}</p>
				<p style={{color: 'red'}}>{album.name}</p>
			</div>);
		});
		return fields;
	}

	render() {
	const { spotlight } = this.props;
	// ADD HOME CLASS
	return (
		<div className={classNames('songs--popular')} style={{padding:'30em 0'}}>
			<div className={classNames('songs')}>
				{this.buildSpotLight(spotlight)}
			</div>
		</div>
		);
	}
}
