import React from 'react';
import Profile from './profile'

export default class Input extends React.Component {
    constructor(props) {
      super(props);
      this.state = {collection: 'forgottenruneswizardscult', token_id: 777, profile: null, loading:false};
  
      this.handleChangeCollection = this.handleChangeCollection.bind(this);
      this.handleChangeTokenId = this.handleChangeTokenId.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeCollection(event) {
        this.setState({collection: event.target.value});
    }

    handleChangeTokenId(event) {
        this.setState({token_id: event.target.value});
    }
  
    handleSubmit(event) {
        let url = "http://127.0.0.1:8080/profile/" + this.state.collection +"/" + this.state.token_id
        console.log(url)

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        this.setState({loading: true});
        fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => {
            this.setState({profile: result});
            this.setState({loading: false});
            console.log(this.state.profile)
        })
        .catch(error => console.log('error', error));
       
    }
  
    render() {
      return (
          <>
            <input value={this.state.collection} onChange={this.handleChangeCollection}></input>
            <br />
            <input value={this.state.token_id} onChange={this.handleChangeTokenId}></input>
            <br />
            <input type="submit" value="Submit" onClick={this.handleSubmit} />
            <br />
            {this.state.loading ? 'Loading profile...' : this.state.profile ? <Profile profile={this.state.profile} /> : ""}
          </>
      );
    }
  }