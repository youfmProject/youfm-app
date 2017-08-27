import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { batchActions } from 'redux-batched-actions';
import { slide as Menu } from 'react-burger-menu';
import PlaylistModal from './PlaylistModal';
import Login from './Login';
import Register from './Register';
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
			if(item !== 'favourites' && item !== 'history'){
    			fields.push(<li><Link to={"/userList/"+item} activeClassName="active">{item}</Link></li>)
			}
    	}
    	return fields;
    }

    getModal(name, props){
	  switch(name){
	    case 'Playlist': {return <PlaylistModal {...props} /> };
	    case 'Login': {return <Login {...props} /> }; 
	    case 'Register': {return <Register {...props} /> };
	    default : break;
	  }
	}

  	render() {
		let onClick = function(){
			this.setState({hidden: false});
		}
	  	// ADD SIDEBAR CLASS
	    const query = this.props.params.play ? this.props.params.play : '';
		const {children, store, locationChange, dispatch, user, userPlaylist, app, toggleModal, modal, modalTitle} = this.props
	    return (
			<div className={classNames('rail', 'rail--left' ,'sidebarmenu')}>
				<Modal
                show={app.show}
                container={this}
                aria-labelledby="contained-modal-title"
                backdrop={true}
                onHide={()=>{dispatch(toggleModal('',''))}}>
                <Modal.Header closeButton style ={{backgroundColor:'#1a1a21', border: 'solid 1px #515161'}}>
                    <Modal.Title id="contained-modal-title" style ={{color: '#c4c4ce'}}>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body closeButton style ={{backgroundColor:'#1a1a21', border: 'solid 1px #515161', padding: '20px'}}>
                {this.getModal(modal,this.props)}
                </Modal.Body> 
            	</Modal>
				<div>
					<div className={classNames('navigation--main')}>
						<Link to={"/home/"+query}><div className={classNames("navigation__logo")}></div></Link>
						<ul className={classNames('navigation')}>
							<li><Link to={"/heavyRotation/"+query} activeClassName="active">Heavy Rotation</Link></li>
							<li><Link to={"/mostPopular/"+query} activeClassName="active">Most Popular</Link></li>
							<li><Link to={"/newReleases/"+query} activeClassName="active">New & Fresh</Link></li>
						</ul>
						<ul  className={classNames('navigation')}>
							<h4> My Music </h4>
							<li><Link to={"/nowPlaying/"+query} activeClassName="active">Now Playing</Link></li>
							{user.status ? <div><li><Link to={"/userList/favourites/"+query} activeClassName="active">Favourites</Link></li>
							<li><Link to={"/userList/history/"+query} activeClassName="active">History</Link></li></div> : null}
						</ul>
						{user.status ? <div> 
						<ul  className={classNames('navigation')}>
							<h4> Playlists </h4>
							{this.buildUserPlaylist(userPlaylist)}
						</ul></div>: <div className={classNames("navigation--actions")}>
						<button className={classNames("button--primary")} style={{marginBottom: "15px"}} 
						onClick={()=> {dispatch(toggleModal('Login','Login'));}} >Login</button> 
						<div className={classNames("register")}>
							<div className={classNames("register__title")}>Don't have an account?
								<div className={classNames("register__title")}>Create one now to create playlists and save favorite tracks.</div>
								<button className={classNames("button--primary")} style={{marginBottom: "15px"}} 
									onClick={()=> {dispatch(toggleModal('Register','Register'));}} >Register</button>
							</div>
						</div>
					</div>}
					</div>
				</div>
				<div className="navigation__mobile">
					<div id="nav-icon3" onClick={onClick.bind(this)}>
						<span/><span/><span/><span/>
					</div>
				</div>
			</div>
		);
	}
}