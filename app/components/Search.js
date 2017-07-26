import React, { Component } from 'react';
import { Form, Button, FormControl, FormGroup, ControlLabel, HelpBlock, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import { batchActions } from 'redux-batched-actions';
import { Link } from 'react-router'
import Playlist from './Playlist';

export default class Search extends Component {

  render() {
    const {dispatch, searchKey, searchKeyword, onSearch, getSpotifySearch, tracks, getHomeData} = this.props; 
    
    let onChange = function(e){ 
      dispatch(searchKeyword(e.target.value));
    }

    let onClick = function(){
      dispatch(getSpotifySearch(searchKey));
    }
    return (
      <div>
        <Form inline>
          <FormGroup controlId="formInlineEmail">
            <FormControl type="search" placeholder="Search song" value = {searchKey} onChange= {onChange.bind(this)}/>
          </FormGroup>
          {' '}
          <Link to="/search" activeClassName="active">
            <Button type="submit" onClick={onClick.bind(this)}>
              Search
            </Button>
          </Link>
        </Form>
      </div>
    );
  }
}