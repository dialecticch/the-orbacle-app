import React from 'react';
import Profile from './profile'
import { ToggleButton } from './toggle_button';
import  WalletProfile  from './wallet';

const URL = "http://localhost:8080" //"https://api.prod.theorbacle.com"

export default class Input extends React.Component {
    constructor(props) {
      super(props);
      this.state = {collection: 'forgottenruneswizardscult',
        error:'',
        token_id: 0,
        wallet: "0x0",
        profile: null,
        loading:false,
        page:'token',
        collections:['forgottenruneswizardscult'],
        selected:true
      };
  
      this.handleChangeCollection = this.handleChangeCollection.bind(this);
      this.handleChangeTokenId = this.handleChangeTokenId.bind(this);
      this.handleChangeWalletId = this.handleChangeWalletId.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

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
          console.log(result)
          this.setState({collections:JSON.parse(result)});
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

    handleChangeWalletId(event) {
      this.setState({wallet: event.target.value});
    }

  
    handleSubmit(event) {

      if (this.state.selected){
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

      }else{
        let url  = URL + "/wallet/" + this.state.collection +"/" + this.state.wallet
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
              console.log(json.total_value_max)
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
       
    }
  
    render() {
      return (
          <>
          <div style={{display:'flex', justifyContent:'right'}}>
            <ToggleButton selected={this.state.selected}
              toggleSelected={() => {
                this.setState({selected: !this.state.selected}); 
                this.setState({profile: null}); 
                this.setState({loading: false}); 
              }}></ToggleButton>
          </div>

          <h1 style={{fontStyle:'oblique'}}>The Orbacle</h1>
          <img style={{height:'200px', width:"200px", marginTop:"0px"}} src={"Orbacle.png"}/>
          {
            this.state.selected? 
            <div>
              <div  style={{display: 'flex', justifyContent:'center', verticalAlign:'middle', marginTop:'10px'}}>
                <div style={{textAlign:'left', width:'250px'}}>
                  <p>Collection</p>
                  <select className="token-input" defaultValue="forgottenruneswizardscult" style={{height:"53%", width:"min-content", paddingRight:"8px"}} value={this.state.collection} onChange={this.handleChangeCollection} >
                    {this.state.collections.map((item) => {
                        return (<option key={item.name} value={item.slug}>{item.name}</option>);
                    })}
                  </select>
                </div>
                <div style={{textAlign:'left', width:'250px', marginLeft:'23px'}}>
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
            :
            <div>
              <div  style={{display: 'flex', justifyContent:'center', verticalAlign:'middle', marginTop:'10px'}}>
                <div style={{textAlign:'left', width:'250px'}}>
                  <p>Collection</p>
                  <select className="token-input" defaultValue="forgottenruneswizardscult" style={{height:"53%", width:"min-content", paddingRight:"8px"}} value={this.state.collection} onChange={this.handleChangeCollection} >
                    {this.state.collections.map((item) => {
                        return (<option key={item.name} value={item.slug}>{item.name}</option>);
                    })}
                  </select>
                </div>
                <div style={{textAlign:'left', width:'250px', marginLeft:'23px'}}>
                  <p>Wallet Id</p>
                  <input className="token-input" value={this.state.wallet} onChange={this.handleChangeWalletId}></input>
                </div>
                <div style={{textAlign:'left', marginTop:'31px', marginLeft:'-10px' }}>
                  <button type="submit" onClick={this.handleSubmit} >Submit</button>
                </div>
              </div> 
              <br/>
              <p style={{marginTop:'20px', fontSize:'20px'}}>{this.state.error}</p>
              {this.state.loading ? <p style={{marginTop:'20px', fontSize:'20px'}}>Loading profile... can take a while...</p> : this.state.profile ? <WalletProfile profile={this.state.profile} /> : ""}
            </div>
            }
          </>
      );
    }
  }