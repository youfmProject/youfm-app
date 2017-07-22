import React, { Component } from 'react';
import { form, Button, FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import { batchActions } from 'redux-batched-actions'

export default class Search extends Component {
  
  buildPlaylist(tracks){
    let fields=[];
    tracks.map((track)=>{
      fields.push(<div>
        <span>{track.artist}</span>
        <span>  </span>
        <span>{track.name}</span>
      </div>);
    })
    return fields
  }

  render() {
    const {dispatch, searchKey, searchKeyword, onSearch, getSpotifySearch, searchTracks} = this.props; 
   
    let onChange = function(e){ 
      dispatch(searchKeyword(e.target.value));
    }

    let onClick = function(){
      dispatch(getSpotifySearch(searchKey));
    }
    return (
      <div>
      	SEARCH
        <form>
        <FormGroup
          controlId="formBasicText"
        >
          <FormControl
            type="text"
            value={searchKey}
            placeholder="Search song/album/artist"
            onChange={onChange.bind(this)}
          />
          <FormControl.Feedback />
          <Button bsStyle="primary" onClick={onClick.bind(this)}>
          Search
          </Button>
        </FormGroup>
      </form>
      <div>
        {this.buildPlaylist(searchTracks)}
      </div>
      </div>
    );
  }
}