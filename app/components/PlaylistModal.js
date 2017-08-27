import React, { Component } from 'react';
import { batchActions } from 'redux-batched-actions';
import { Alert, Form, Button, FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import Select from 'react-select';
import '../less/react-select.less';

export default class PlaylistModal extends Component {

    constructor() {
        super();
        this.state = {
            values:[],
            options:[]
        }
    }

    componentDidMount(){
      const {usersPlaylist} = this.props;
      this.setState({options: usersPlaylist});
    }

    logChange(val) {
      this.setState({value:val});
    }

    updateOptions(input){
      const {usersPlaylist} = this.props;
      let newList =Array.from(this.state.options);
      if(newList.length === usersPlaylist.length){
        newList.push({value: '', label: ''})
      }
      newList[newList.length-1].value = input;
      newList[newList.length-1].label = input;
      this.setState({options: newList});
    }

  render() { 
    return (
        <div style={{height:'150px', overflow:'auto'}}>
            <p style={{fontFamily: 'HelveticaNeue', fontSize: '16px',fontWeight: 'bold',lineHeight: '1.76',textAlign: 'left',color: '#c4c4ce'}}>Type in a name for your playlist:</p>
              <Select
                name="form-field-name"
                options={this.state.options}
                multi={true}
                autoload={false}
                placeholder="Name of the playlist"
                onInputChange={(value)=>this.updateOptions(value)}
                onChange={(value)=>this.logChange(value)}
                value={this.state.value}
              />
            <div style={{marginTop:'20px'}}>
              <button style={{borderRadius: '100px',width:'200px',backgroundColor: '#23d7f5', textAlign:'center', margin:'auto', display:'block'}}>Add</button>
              </div>
        </div>
    );
  }
}