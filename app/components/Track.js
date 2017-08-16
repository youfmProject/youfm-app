import React, { Component } from 'react';
import { batchActions } from 'redux-batched-actions';
import { browserHistory } from 'react-router'
import classNames from 'classnames';
import {DropdownButton,MenuItem} from 'react-bootstrap';

export default class Track extends Component {
    constructor() {
        super();
        this.state = {
            showTray: 'hide',
            fav:false
        }
    }

    componentDidMount(){
        const {track} = this.props;
        this.setState({fav:(track.favourite) ? true : false})
    }

    toggleIcon(){
        this.setState({fav:!this.state.fav});
    }

    toggletray() {
        this.setState({showTray: this.state.showTray === 'show'? 'hide':'show'})
    }

    render() {
        const {track, searchArtist, instantPlay, addToQueue, dispatch, location, playlistName, trackPlayNow, appendtoQueue, toggleFavourite} = this.props;
        
        let  onArtistClick = function(artist) {
            return dispatch(searchArtist(artist));
        }

        let favIcon = this.state.fav ? 'icon-heart-filled-icon':'icon-heart-empty-icon';
        return (
        <div key={track.id} className={classNames('song')} onDoubleClick={()=>{dispatch(instantPlay(track))}}>
            <span className={classNames('song__play')}>
                <i className="icon-play-icon" onClick={()=> {
                    dispatch(instantPlay(track))}}>
                </i>
            </span>
            <span className={classNames('song__favorite')} onClick={()=>{ this.toggleIcon(); dispatch(toggleFavourite(track,this.state.fav))}}><i className={classNames(favIcon)}></i></span>
            <span className={classNames('song__num')}></span>
            <span className={classNames('song__art')}><img src={track.image} alt="Album Art"/></span>
            <span className={classNames('song__name')} style={{textOverflow: 'ellipsis'}}>{track.name}</span>
            <a className={classNames('song__artists')}  style ={{color: '#FFFFFF'}} onClick={onArtistClick.bind(this, track.artist)}>{track.artist}</a>
            {<span className={classNames('song__actions','open')} onClick={()=>this.toggletray()}>...</span>
            }
            {
                this.state.showTray === 'show'? (
                    <div>
                        <ul className={classNames('dropdown-menu','dropdown-menu-right','song__actions__list')} style={{display: 'block'}}>
                            <li onClick={()=>{dispatch(instantPlay(track))}}><a>Play now</a></li>
                            <li onClick={()=>{dispatch(appendtoQueue(track))}}><a>Play next</a></li>
                            <li onClick={()=>{dispatch(addToQueue(track))}}><a>Add to queue</a></li>
                            {/*<li>Add to favourites</li>
                            <li>Add to playlist</li>*/}
                        </ul>
                    </div>
                ) : null
            }
    		</div>
        );
    }
}