import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { batchActions } from 'redux-batched-actions';
import { slide as Menu } from 'react-burger-menu';
import PlaylistModal from './PlaylistModal';
import Login from './Login';
import Register from './Register';
import FavLogin from './FavLogin';
import AboutUs from './AboutUs';

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

    buildUserPlaylist(userList){
    	let fields = [];
    	for(let item in userList){
			if(item !== 'favourites'){
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
		case 'FavLogin': {return <FavLogin {...props} /> }
		case 'AboutUs': {return <AboutUs {...props} /> }
	    default : break;
	  }
	}

  	render() {
		let onClick = function(){
			this.setState({hidden: !this.state.hidden});
		}
	  	// ADD SIDEBAR CLASS
	    const query = this.props.params.play ? this.props.params.play : '';
		const {children, store, locationChange, dispatch, user, userList, app, toggleModal, modal, modalTitle} = this.props
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
					<Modal.Body style ={{backgroundColor:'#1a1a21', border: 'solid 1px #515161', padding: '20px'}}>
					{this.getModal(modal,this.props)}
					</Modal.Body> 
            	</Modal>
				<div>
					<div className="navigation__mobile">
						{this.state.hidden ? <div id="nav-icon3" style = {{marginRight: '5px'}} onClick={onClick.bind(this)}>
							<span/><span/><span/><span/>
						</div>:<span className = "close" onClick={onClick.bind(this)}/>
						}
					</div>
					<div className={classNames('navigation--main')}>
						<div className="Logo"><Link to={"/home/"+query}><div className={classNames("navigation__logo")}></div></Link></div>
						<div className="sidebarlinks">
							<ul className={classNames('navigation')}>
								<li><Link to={"/heavyRotation/"+query} activeClassName="active">Heavy Rotation</Link></li>
								<li><Link to={"/mostPopular/"+query} activeClassName="active">Most Popular</Link></li>
								<li><Link to={"/newReleases/"+query} activeClassName="active">New & Fresh</Link></li>
							</ul>
							<ul  className={classNames('navigation')}>
								<h4> My Music </h4>
								<li><Link to={"/nowPlaying/"+query} activeClassName="active">Now Playing</Link></li>
								<li><Link to={"/history/"+query} activeClassName="active">History</Link></li>
								{user.status ? <li><Link to={"/userList/favourites/"+query} activeClassName="active">Favourites</Link></li> : null}
							</ul>
							{user.status ? <div> 
							<ul  className={classNames('navigation')}>
								<h4> Playlists </h4>
								{this.buildUserPlaylist(userList)}
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
				</div>
			</div>
		);
	}
}