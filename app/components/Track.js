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
        const {track, instantPlay, addToQueue, dispatch, location, playlistName, trackPlayNow, appendtoQueue} = this.props;
        var songClass = classNames('song');
        return (
        <div key={track.id} className={songClass}>
            <span className={classNames('song__play')}>
                <i className="icon-play-icon" onClick={()=> {
                    dispatch(instantPlay(track))}}>
                </i>
            </span>
            <span className={classNames('song__favorite')}><i className={classNames('icon-heart-empty-icon')}></i></span>
            <span className={classNames('song__num')}></span>
            <span className={classNames('song__art')}><img src={track.image} alt="Album Art"/></span>
            <span className={classNames('song__name')}>{track.name}</span>
            <span className={classNames('song__artists')}>{track.artist}</span>
            {<span className={classNames('song__actions','open')} onClick={()=>this.toggletray()}>...</span>
            }
            {
                this.state.showTray === 'show'? (
                    <div>
                        <ul className={classNames('dropdown-menu','dropdown-menu-right','song__actions__list')} style={{display: 'block'}}>
                            <li onClick={()=>{dispatch(instantPlay(track))}}>Play now</li>
                            <li onClick={()=>{dispatch(appendtoQueue(track))}}>Play next</li>
                            <li onClick={()=>{dispatch(addToQueue(track))}}>Add to queue</li>
                            {/*<li>Add to favourites</li>
                            <li>Add to playlist</li>*/
                            }
                        </ul>
                    </div>
                ) : null
            }
            {/*<DropdownButton title="..." id="bg-nested-dropdown" style={{backgroundColor:'black',color:'white'}}>
                  <MenuItem eventKey="1" style={{backgroundColor:'black', padding:'0px'}} onClick={()=>{dispatch(trackPlayNow(track))}}>Play now</MenuItem>
                  <MenuItem eventKey="2" style={{backgroundColor:'black',padding:'0px'}}>Play next</MenuItem>
                  <MenuItem eventKey="2" style={{backgroundColor:'black',padding:'0px'}}>Add to queue</MenuItem>
                </DropdownButton>*/
                }
    		</div>
        );
    }
}