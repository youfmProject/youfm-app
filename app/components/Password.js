import React, { Component } from 'react';
import { batchActions } from 'redux-batched-actions';
import { Alert, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Form, Button, FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';

export default class Password extends Component {
    constructor() {
        super();
        this.state = {
            matchErr: false
        }
    }

    render() {
      const {editCredentials, submitPassword, submitLogin, dispatch, user, locationChange, userId} = this.props;
    
      let onChange = function(field, e){
        dispatch(editCredentials(field, e.target.value));
      }
      let onClick = function(){
        user.userId = userId;
        if(user.password === user.confirm){
            this.setState({matchErr: false});
            dispatch(submitPassword(user, 'password'));
        }
        else {
            this.setState({matchErr: true});
        }
      }
      let onCancel = function(){
        dispatch(locationChange('/home'));
      }
      
    return (
        <div>
             <Modal
                show={true}
                container={this}
                aria-labelledby="contained-modal-title"
                backdrop={false}
                onHide={onCancel.bind(this)}>
                <Modal.Header closeButton style ={{backgroundColor:'#1a1a21', border: 'solid 1px #515161'}}>
                    <Modal.Title id="contained-modal-title" style ={{color: '#c4c4ce'}}>Reset password</Modal.Title>
                </Modal.Header>
                <Modal.Body style ={{backgroundColor:'#1a1a21', border: 'solid 1px #515161', padding: '20px'}}>
                    <Form>
                        { this.state.matchErr ? (<Alert bsStyle="error" style ={{padding: '0'}}>
                            <strong style ={{color: 'red'}}>Your passwords dont match, Please try again</strong>
                            </Alert>) : null }
                        <FormGroup controlId="formInlinePassword">
                            <FormControl type="password" placeholder="Password" onChange= {onChange.bind(this, 'password')}/>
                        </FormGroup>
                        {' '}
                            <FormGroup controlId="formInlinePassword">
                            <FormControl type="password" placeholder="Confirm Password" onChange= {onChange.bind(this, 'confirm')}/>
                        </FormGroup>
                        {' '}
                        <Button bsStyle="primary" bsSize="large" block onClick={onClick.bind(this)}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body> 
            </Modal> 
        </div>
    );
  }
}