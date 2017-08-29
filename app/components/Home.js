import React, { Component } from 'react';
import classNames from 'classnames';
export default class Home extends Component {

	buildSpotLight(spotlight){
		let fields= [];
		// ADD ALBUM CLASS
		const {getSpotifySearch, dispatch} = this.props;
		spotlight.map((album, key)=>{
			fields.push(<div key={key} className = "ps" onClick={()=>{dispatch(getSpotifySearch(album.artist + ' ' + album.name));}}>
				<p className = "ps-albumart" style={{backgroundImage: 'url('+album.image+')'}}/>
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
