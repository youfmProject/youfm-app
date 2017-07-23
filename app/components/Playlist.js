import React, { Component } from 'react';
export default class Playlist extends Component {

  buildPlaylist(tracks = []){
    let fields=[];
    tracks.map((track)=>{
      fields.push(<div>
        <p style={{color: 'red'}}>{track.artist}</p>
        <p style={{color: 'red'}}>{track.name}</p>
      </div>);
    })
    return fields
  }

  render() {
    const { trackList } = this.props;
    return (
      <div style={{float:'left', width:'600px'}}>
        {this.buildPlaylist(trackList)}
      </div>
      );
  }
}