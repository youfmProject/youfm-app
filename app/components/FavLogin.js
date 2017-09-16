import React, { Component } from 'react';
import { Form, FormGroup, Button} from 'react-bootstrap';

export default class FavLogin extends Component {

  render() {
    const {changeModal, dispatch} = this.props;

    let onClick = function(type){
        dispatch(changeModal(type, type));
    };
      
    return (
         <div>
            <Form>
                <p style={{textAlign: 'center', fontSize: '18px', fontWeight: '500', color: '#ffffff'}}>You need to be signed in to save favourites</p>
                <FormGroup controlId="formInlineEmail" style={{textAlign: 'center'}} >
                <Button style={{margin: '15px'}} bsStyle="primary" bsSize="medium" onClick={onClick.bind(this, 'Register')}>
                    Register
                </Button>
                <Button style={{margin: '15px'}} bsSize="medium" bsStyle="primary" onClick={onClick.bind(this, 'Login')}>
                    Login
                </Button>
                </FormGroup>
            </Form>
        </div>
    );
  }
}