import React, { Component } from 'react';
import Search from './Search';

export default class Home extends Component {

	componentDidMount(){
		const {dispatch, getHomeData} = this.props;
		return dispatch(getHomeData());
	}	

	buildSpotLight(spotlight){
		let fields= [];
		// ADD ALBUM CLASS
		spotlight.map((album)=>{
			fields.push(<div style={{height:'100px',width:'200px', float:'left'}}>
				<p>{album.artist}</p>
				<p>{album.name}</p>
			</div>);
		});
		return fields;
	}

	render() {
	const { spotlight } = this.props;
	// ADD HOME CLASS
	return (
		<div>
			<div>
			<Search/>
			{this.buildSpotLight(spotlight)}
			</div>
		</div>
		);
	}
}
