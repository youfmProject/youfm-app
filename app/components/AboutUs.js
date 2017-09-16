import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button} from 'react-bootstrap';

export default class AboutUs extends Component {

  render() {
    const {editFeedback, submitFeedback, dispatch} = this.props;

    let onChange = function(field, e){
        dispatch(editFeedback(field, e.target.value));
    };
    
    return (
         <div>
            <Form>
                <p style ={{color: 'white',fontSize: '15px'}}>LiveJam is a free web-based music player that makes it easy to search for and instantly play any song, album, artist. You can save your favorites tracks and create your own playlists that's available everywhere - on the web or on your mobile device.</p>
                <p style ={{color: 'white',fontSize: '15px'}}>LiveJam is free to use.</p>
                <FormGroup controlId="formInlineEmail">
                    <p style ={{color: 'white',fontSize: '15px'}}>Got feedback or suggestions?</p>
                    <FormControl type="email" placeholder="Email address" onChange={onChange.bind(this, 'email')}/>
                </FormGroup> 
                <FormGroup controlId="formInlineEmail">
                    <FormControl style ={{height: '175px'}}componentClass="textarea" placeholder="Your message" onChange={onChange.bind(this, 'feedback')}/>
                </FormGroup>
                <Button block  bsStyle="primary" onClick={()=> {return dispatch(submitFeedback());}}>
                    Send Feedback
                </Button>
                <div style ={{textAlign: 'center',margin:'10px'}}>
                    <span style ={{color: 'white',fontSize: '15px'}}>or email us at</span> <a style ={{display: 'inline', padding: '0px'}}> feedback@livejam.com</a>
                </div>
            </Form>
        </div>
    );
  }
}