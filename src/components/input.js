import React from 'react';
import Profile from './profile'

const URL = "https://api.prod.theorbacle.com"

export default class Input extends React.Component {
    constructor(props) {
      super(props);
      this.state = {collection: '',error:'', token_id: 0, profile: null, loading:false, page:'token', collections:['forgottenruneswizardscult']};
  
      this.handleChangeCollection = this.handleChangeCollection.bind(this);
      this.handleChangeTokenId = this.handleChangeTokenId.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.setToken = this.setToken.bind(this);
      this.setWallet = this.setWallet.bind(this);

      let url = URL + "/collection/"
      console.log(url)

      var requestOptions = {
          method: 'GET',
          redirect: 'follow'
      };
      fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => {
        try {
          this.setState({collections:JSON.parse(result)});
          console.log(this.state.profile)
        }catch (error){
          console.log('error', error)
          this.setState({error:"failed to fetch"});
        }
      })
      .catch(error => {
        console.log('error', error)
      });
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
        let url  = URL + "/profile/" + this.state.collection +"/" + this.state.token_id
        console.log(url)

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        this.setState({loading: true});
        fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => {
          let json;
            try {
              json = JSON.parse(result)
            }catch (error){
              this.setState({error:"failed to fetch"});
              this.setState({profile: null});
              this.setState({loading: false});
            }
            if (json["error"]) {
              console.log(json)
              this.setState({error:"failed to fetch"});   
              this.setState({profile: null});           
              this.setState({loading: false});
            }else{
              this.setState({profile: json});
              this.setState({loading: false});
              this.setState({error: ''});
              console.log(this.state.profile)
            }
        })
        .catch(error => {
          this.setState({loading: false});
          this.setState({profile: null});
          this.setState({error:"failed to fetch"});
        });
       
    }
  
    render() {
      return (
          <>
          {
            this.state.page == "token" ? 
            <div>
              <div  style={{display: 'flex', justifyContent:'center', verticalAlign:'middle', marginTop:'10px'}}>
                <div style={{textAlign:'left', width:'250px'}}>
                  <p>Collection</p>
                  <select className="token-input" style={{height:"55%", width:"90%"}} value={this.state.collection} onChange={this.handleChangeCollection} >
                    {this.state.collections.map((item) => {
                        return (<option key={item} value={item}>{item}</option>);
                    })}
                  </select>
                </div>
                <div style={{textAlign:'left', width:'250px'}}>
                  <p>Token Id</p>
                  <input className="token-input" value={this.state.token_id} onChange={this.handleChangeTokenId}></input>
                </div>
                <div style={{textAlign:'left', marginTop:'31px', marginLeft:'-10px' }}>
                  <button type="submit" onClick={this.handleSubmit} >Submit</button>
                </div>
              </div> 
              <br/>
              <p style={{marginTop:'20px', fontSize:'20px'}}>{this.state.error}</p>
              {this.state.loading ? <p style={{marginTop:'20px', fontSize:'20px'}}>Loading profile...</p> : this.state.profile ? <Profile profile={this.state.profile} /> : ""}
            </div>
            :"wallet" }
          </>
      );
    }
  }