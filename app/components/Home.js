import React, { Component } from 'react';
import classNames from 'classNames';
export default class Home extends Component {

	buildSpotLight(spotlight){
		let fields= [];
		// ADD ALBUM CLASS
		const {getSpotifySearch, dispatch} = this.props;
		spotlight.map((album)=>{
			fields.push(<div style={{height:'300px',width:'200px'}} onClick={()=>{dispatch(getSpotifySearch(album.artist + ' ' + album.name));}}>
				<p style={{backgroundImage: 'url('+album.image+')', height:'180px', width:'180px', margin: '0 0 10px 0'}}/>
				<p className= {classNames('song__title')}>{album.name}</p>
				<p className={classNames('song__artist')}>{album.artist}</p>
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
