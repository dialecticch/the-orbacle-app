import React from 'react';
import Profile from './profile'

export default class Input extends React.Component {
    constructor(props) {
      super(props);
      this.state = {collection: 'forgottenruneswizardscult', token_id: 0, profile: null, loading:false, page:'token'};
  
      this.handleChangeCollection = this.handleChangeCollection.bind(this);
      this.handleChangeTokenId = this.handleChangeTokenId.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.setToken = this.setToken.bind(this);
      this.setWallet = this.setWallet.bind(this);
    }
  
    handleChangeCollection(event) {
        this.setState({collection: event.target.value});
    }

    handleChangeTokenId(event) {
        this.setState({token_id: event.target.value});
    }

    setToken(event) {
      this.setState({page: "token"});
    }
    setWallet(event) {
      this.setState({page: "wallet"});
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
          <div style={{display: 'flex', justifyContent:'center'}}>
            <button onClick={this.setToken}>Token</button>
            <button onClick={this.setWallet}>Wallet</button>
          </div>
          {
            this.state.page == "token" ? 
            <div>
              <div  style={{display: 'flex', justifyContent:'center', verticalAlign:'middle', marginTop:'10px'}}>
                <div style={{textAlign:'left', width:'250px'}}>
                  <p>Collection</p>
                  <input className="token-input" value={this.state.collection} onChange={this.handleChangeCollection}></input>
                </div>
                <div style={{textAlign:'left', width:'250px'}}>
                  <p>Token Id</p>
                  <input className="token-input" value={this.state.token_id} onChange={this.handleChangeTokenId}></input>
                </div>
                <div style={{textAlign:'left', height:'100%', marginTop:'15px', marginLeft:'-10px' }}>
                  <button type="submit" onClick={this.handleSubmit} >Submit</button>
                </div>
              </div>
              {this.state.loading ? 'Loading profile...' : this.state.profile ? <Profile profile={this.state.profile} /> : ""}
            </div>
            :"wallet" }
          </>
      );
    }
  }