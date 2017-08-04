import React, { Component } from 'react';
import { batchActions } from 'redux-batched-actions';
import { Form, Button, FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';

export default class Login extends Component {

  render() {
      const {editCredentials, submitLogin, dispatch, user} = this.props;
    
      let onChange = function(field, e){
        dispatch(editCredentials(field, e.target.value));
      }
      let onClick = function(){
          dispatch(submitLogin(user));
      }
      
    return (
        <div>
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
        </div>
    );
  }
}