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
                onHide={onCancel.bind(this)}
            >
                <Modal.Header closeButton style ={{backgroundColor:'#1a1a21', border: 'solid 1px #515161'}}>
                    <Modal.Title id="contained-modal-title" style ={{color: '#c4c4ce'}}>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style ={{backgroundColor:'#1a1a21', border: 'solid 1px #515161', padding: '20px'}}>
                    {children}
                </Modal.Body> 
            </Modal>
        </div>
    );
  }
}