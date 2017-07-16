import React, { Component } from 'react';
import SideBar from './SideBar';
import Player from './Player';

export default class Playlist extends Component {

  componentDidMount(){
    const {dispatch,getHomeData} = this.props;
    return dispatch(getHomeData());
  }

  buildPlaylist(tracks = []){
    let fields=[];
    tracks.map((track)=>{
      fields.push(<div>
        <p>{track.artist}</p>
        <p>{track.name}</p>
      </div>);
    })
    return fields
  }

  render() {
    const { trackList } = this.props;
    return (
      <div style={{float:'left', width:'600px'}}>
        <SideBar />
        <Player />
        {this.buildPlaylist(trackList)}
      </div>
      );
  }
}