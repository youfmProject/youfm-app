import React, { Component } from 'react';
import { batchActions } from 'redux-batched-actions';
import { browserHistory } from 'react-router'
import classNames from 'classnames';
import {DropdownButton,MenuItem} from 'react-bootstrap';

export default class Track extends Component {
    constructor() {
        super();
        this.state = {
            showTray: 'hide'
        }
    }

    toggletray() {
        this.setState({showTray: this.state.showTray === 'show'? 'hide':'show'})
    }

    render() {
        const {track, instantPlay, addToQueue, dispatch, location, playlistName} = this.props;
        var songClass = classNames('song');
        return (
        <div key={track.id} className={songClass}>
            <span className={classNames('song__play')}>
                <i className="icon-play-icon" onClick={()=> {
                    dispatch(instantPlay(track.name+' '+track.artist, playlistName))}}>
                </i>
            </span>
            <span className={classNames('song__favorite')}> Fav </span>
            <span className={classNames('song__num')}>#</span>
            <span className={classNames('song__art')}>art</span>
            <span className={classNames('song__name')}>{track.name}</span>
            <span className={classNames('song__artists')}>{track.artist}</span>
            {//<span className={classNames('song__actions','open')} onClick={()=>this.toggletray()}></span>
            }
            {
                // this.state.showTray === 'show'? (<span> 
                //     <div classNames={classNames('dropdown-menu','dropdown-menu-right','song__actions__list')}>
                //         <ul>
                //             <li>Play now</li>
                //             <li>Play next</li>
                //             <li>Add to queue</li>
                //             <li>Add to favourites</li>
                //             <li>Add to playlist</li>
                //         </ul>
                //     </div>
                // </span>) : null
            }
                <DropdownButton title="..." id="bg-nested-dropdown" style={{backgroundColor:'black',color:'white'}}>
                  <MenuItem eventKey="1" style={{backgroundColor:'black', padding:'0px'}}>Play now</MenuItem>
                  <MenuItem eventKey="2" style={{backgroundColor:'black',padding:'0px'}}>Play next</MenuItem>
                  <MenuItem eventKey="2" style={{backgroundColor:'black',padding:'0px'}}>Add to queue</MenuItem>
                </DropdownButton>
    		</div>
        );
    }
}