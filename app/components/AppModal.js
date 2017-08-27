import React, { Component } from 'react';
import { batchActions } from 'redux-batched-actions';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
export default class AppModal extends Component {
      render() {
      const {showLogin, children, toggleLogin, dispatch, title, locationChange} = this.props;
    
      let onCancel = function(){
          dispatch(toggleLogin());
          history.back();
      }
      
    return (
        <div>
            <Modal
                show={showLogin}
                container={this}
                aria-labelledby="contained-modal-title"
                backdrop={false}
                onHide={onCancel.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title" style ={{color: '#c4c4ce'}}>LOGIN OR REGISTER</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body> 
            </Modal>
        </div>
    );
  }
}