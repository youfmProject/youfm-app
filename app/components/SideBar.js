import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { batchActions } from 'redux-batched-actions';
import { slide as Menu } from 'react-burger-menu';
import PlaylistModal from './PlaylistModal';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';

export default class SideBar extends Component {

	constructor() {
        super();
        this.state = {
            hidden: true
        }
    }
    
    componentDidMount(){
        this.setState({hidden: true});
    }

    buildUserPlaylist(userPlaylist){
    	let fields = [];
    	for(let item in userPlaylist){
    		fields.push(<li><Link to={"/userList/"+item} activeClassName="active">{item}</Link></li>)
    	}
    	return fields;
    }

  	render() {
		let onClick = function(){
			this.setState({hidden: false});
		}
	  	// ADD SIDEBAR CLASS
	    const query = this.props.params.play ? this.props.params.play : '';
		const {children, store, locationChange, dispatch, toggleLogin, user, userPlaylist, app, toggleModal} = this.props
	    return (
			<div className={classNames('rail', 'rail--left')}>
				<Modal
                show={app.show}
                container={this}
                aria-labelledby="contained-modal-title"
                backdrop={true}
                onHide={()=>{dispatch(toggleModal('',''))}}>
                <Modal.Header closeButton style ={{backgroundColor:'#1a1a21', border: 'solid 1px #515161'}}>
                    <Modal.Title id="contained-modal-title" style ={{color: '#c4c4ce'}}>Add to playlist</Modal.Title>
                </Modal.Header>
                <Modal.Body closeButton style ={{backgroundColor:'#1a1a21', border: 'solid 1px #515161', padding: '20px'}}>
                	<PlaylistModal {...this.props}/>
                </Modal.Body> 
            	</Modal>
				<div className={classNames("navigation__mobile")}>
					<div id="nav-icon3" onClick={onClick.bind(this)}>
						<span/><span/><span/><span/>
					</div>
					{!this.state.hidden ? <Menu noOverlay width={'180px'}>
					<Link to={"/home/"+query}><img className={classNames("navigation__logo")}/></Link>
					<ul className={classNames('navigation')}>
						<li><Link to={"/heavyRotation/"+query} activeClassName="active">Heavy Rotation</Link></li>
						<li><Link to={"/mostPopular/"+query} activeClassName="active">Most Popular</Link></li>
						<li><Link to={"/newReleases/"+query} activeClassName="active">New & Fresh</Link></li>
					</ul>
					<ul  className={classNames('navigation')}>
						<h4> My Music </h4>
						<li><Link to={"/nowPlaying/"+query} activeClassName="active">Now Playing</Link></li>
						{user.status ? <div><li><Link to={"/favourites/"+query} activeClassName="active">Favourites</Link></li>
						<li><Link to={"/history/"+query} activeClassName="active">History</Link></li></div> : null}
					</ul>
				{user.status ? <div> 
					<ul  className={classNames('navigation')}>
						<h4> Playlists </h4>
						{this.buildUserPlaylist(userPlaylist)}
					</ul></div>: 
				<div className={classNames("navigation--actions")}>
					<button className={classNames("button--primary")} style={{marginBottom: "15px"}} 
						onClick={()=> {dispatch(
							batchActions([
								toggleLogin(),
								locationChange('/Login/'+query)
							])
						);
					}} >Login</button> 
					<div className={classNames("register")}>
						<div className={classNames("register__title")}>Don't have an account?
							<div className={classNames("register__title")}>Create one now to create playlists and save favorite tracks.</div>
							<button className={classNames("button--primary")} style={{marginBottom: "15px"}} 
								onClick={()=> {dispatch(batchActions([
									toggleLogin(),
									locationChange('/Register/'+query)
									])
								);
							}} >Register</button>
						</div>
					</div>
				</div>}
				</Menu> : null}
				</div>
				<div>
					<div className={classNames('navigation--main')}>
						<Link to={"/home/"+query}><img className={classNames("navigation__logo")}/></Link>
						<ul className={classNames('navigation')}>
							<li><Link to={"/heavyRotation/"+query} activeClassName="active">Heavy Rotation</Link></li>
							<li><Link to={"/mostPopular/"+query} activeClassName="active">Most Popular</Link></li>
							<li><Link to={"/newReleases/"+query} activeClassName="active">New & Fresh</Link></li>
						</ul>
						<ul  className={classNames('navigation')}>
							<h4> My Music </h4>
							<li><Link to={"/nowPlaying/"+query} activeClassName="active">Now Playing</Link></li>
							{user.status ? <div><li><Link to={"/favourites/"+query} activeClassName="active">Favourites</Link></li>
							<li><Link to={"/history/"+query} activeClassName="active">History</Link></li></div> : null}
						</ul>
					</div>
					{user.status ? <div> 
						<ul  className={classNames('navigation')}>
							<h4> Playlists </h4>
							{this.buildUserPlaylist(userPlaylist)}
						</ul></div>: <div className={classNames("navigation--actions")}>
						<button className={classNames("button--primary")} style={{marginBottom: "15px"}} 
						onClick={()=> {dispatch(
							batchActions([
							toggleLogin(),
							locationChange('/Login/'+query)
							])
							);
						}} >Login</button> 
						<div className={classNames("register")}>
							<div className={classNames("register__title")}>Don't have an account?
								<div className={classNames("register__title")}>Create one now to create playlists and save favorite tracks.</div>
								<button className={classNames("button--primary")} style={{marginBottom: "15px"}} 
									onClick={()=> {dispatch(batchActions([
										toggleLogin(),
										locationChange('/Register/'+query)
										])
									);
								}} >Register</button>
							</div>
						</div>
					</div>}
				</div>
			</div>
		);
	}
}