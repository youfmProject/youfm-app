import React, { Component } from 'react';

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
		<div>
			<div>
				{this.buildSpotLight(spotlight)}
			</div>
		</div>
		);
	}
}
