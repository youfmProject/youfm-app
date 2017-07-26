import React, { Component } from 'react';
export default class SearchList extends Component {

    
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
    const { tracks } = this.props;
    return (
      <div style={{float:'left', width:'600px'}}>
        {this.buildPlaylist(tracks)}
      </div>
      );
  }
}