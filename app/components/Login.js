import React, { Component } from 'react';

import { Form, Button, FormControl, FormGroup, ControlLabel, HelpBlock, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
export default class Login extends Component {
  
componentDidMount(){
    const {dispatch, toggleLogin} = this.props;
    return dispatch(toggleLogin());
  }

  render() {
      const {showLogin, toggleLogin, editCredentials, submitLogin, dispatch, user} = this.props;
    
      let onChange = function(field, e){
        dispatch(editCredentials(field, e.target.value));
      }
      let onClick = function(){
          dispatch(submitLogin(user));
      }
      
    return (
        
        <div>
            <Modal
                show={showLogin}
                onHide={() => {dispatch(toggleLogin());}}
                container={this}
                aria-labelledby="contained-modal-title"
            >
                <Modal.Header closeButton style ={{backgroundColor:'#1a1a21', border: 'solid 1px #515161'}}>
                    <Modal.Title id="contained-modal-title" style ={{color: '#c4c4ce'}}>Login or Register</Modal.Title>
                </Modal.Header>
                <Modal.Body style ={{backgroundColor:'#1a1a21', border: 'solid 1px #515161'}}>
                    <Form>
                        <FormGroup controlId="formInlineEmail">
                            <FormControl type="email" placeholder="Email Id" onChange= {onChange.bind(this, 'email')}/>
                        </FormGroup>
                        {' '}
                         <FormGroup controlId="formInlinePassword">
                            <FormControl type="password" placeholder="Password" onChange= {onChange.bind(this, 'password')}/>
                        </FormGroup>
                        {' '}
                        <Button bsStyle="primary" bsSize="large" block onClick={onClick.bind(this)}>
                            Sign In
                        </Button>
                    </Form>
                </Modal.Body>
                
            </Modal>
        </div>
    );
  }
}