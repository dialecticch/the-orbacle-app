import React from 'react';
import Profile from './profile'
import { ToggleButton } from './toggle_button';
import  WalletProfile  from './wallet';

const URL = "https://api.prod.theorbacle.com"

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


    fetchPage(url, i, total_pages, requestOptions) {
      console.log(url+(i*10))
      fetch(url+(i*10) , requestOptions)
      .then(response => response.text())
      .then(result => {
        let json;
          try {
            json = JSON.parse(result)
          }catch (error){
            console.log(error)
            this.setState({error:"failed to fetch"});
            this.setState({profile: null});
            this.setState({loading: false});
          }
          if (json["error"]) {
            console.log(json)
            this.setState({error:"failed to fetch"});   
            this.setState({profile: null});  
          }else{
            let new_p = this.state.profile
            new_p.total_value_max += json.total_value_max
            new_p.total_value_min += json.total_value_min
            new_p.total_value_avg += json.total_value_avg
            new_p.tokens = Object.assign(new_p.tokens, json.tokens)
            this.setState({profile: new_p});
            this.setState({error: ''});
            if (i < total_pages){
              this.fetchPage(url, i+1, total_pages)
            }
          }
      })
      .catch(error => {
        console.log(error)
        this.setState({loading: false});
        this.setState({profile: null});
        this.setState({error:"failed to fetch"});
      });
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
            }catch (error){console.log(error)
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
            }
        })
        .catch(error => {
          console.log(error)
          this.setState({loading: false});
          this.setState({profile: null});
          this.setState({error:"failed to fetch"});
        });

      }else{
        let url  = URL + "/wallet?wallet=" +  this.state.wallet + "&collection_slug=" + this.state.collection + "&limit=" + 10 + "&offset=" ;

        var myHeaders = new Headers();
        myHeaders.append("Keep-Alive", "timeout=3600");
        myHeaders.append("Cache-Control", "force-cache");
        myHeaders.append("Content-Type", "application/json");


        this.setState({loading: true});

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders,
        };
        fetch(url + "0", requestOptions)
        .then(response => response.text())
        .then(result => {
          let json;
            try {
              json = JSON.parse(result)
            }catch (error){
              console.log(error)
              this.setState({error:"failed to fetch"});
              this.setState({profile: null});
              this.setState({loading: false});
            }
            if (json["error"]) {
              console.log(json)
              this.setState({error:"failed to fetch"});   
              this.setState({profile: null});  
            }else{
              this.setState({profile: json});
              this.setState({error: ''});
              
              let requests = Math.floor(json.total_tokens / 10);
              this.fetchPage(url, 1, requests, requestOptions)
              this.setState({loading: false});
            }
        })
        .catch(error => {
          console.log(error)
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
              <div className='container' style={{display: 'inline-flex', justifyContent:'center', verticalAlign:'middle', marginTop:'10px'}}>
                <div style={{textAlign:'left', marginLeft:'10px'}}>
                  <p>Collection</p>
                  <select className="collection-select" defaultValue="forgottenruneswizardscult" value={this.state.collection} onChange={this.handleChangeCollection} >
                    {this.state.collections.map((item) => {
                        return (<option key={item.name} value={item.slug}>{item.name}</option>);
                    })}
                  </select>
                </div>
                <div style={{textAlign:'left', marginLeft:'10px'}}>
                  <p>Token Id</p>
                  <input className="token-input" value={this.state.token_id} onChange={this.handleChangeTokenId}></input>
                </div>
                <div style={{textAlign:'left', marginLeft:'10px', marginTop:'31px', width:"326px !important" }}>
                  <button className="submit-button" type="submit" onClick={this.handleSubmit} >Submit</button>
                </div>
              </div> 
              <br/>
              <p style={{marginTop:'20px', fontSize:'20px'}}>{this.state.error}</p>
              {this.state.loading ? <p style={{marginTop:'20px', fontSize:'20px'}}>Loading profile...</p> : this.state.profile ? <Profile profile={this.state.profile} /> : ""}
            </div>
            :
            <div>
              <div className='container' style={{display: 'inline-flex', justifyContent:'center', verticalAlign:'middle', marginTop:'10px'}}>
              <div style={{textAlign:'left', marginLeft:'10px'}}>
                  <p>Collection</p>
                  <select className="collection-select" defaultValue="forgottenruneswizardscult" value={this.state.collection} onChange={this.handleChangeCollection} >
                    {this.state.collections.map((item) => {
                        return (<option key={item.name} value={item.slug}>{item.name}</option>);
                    })}
                  </select>
                </div>
                <div style={{textAlign:'left', marginLeft:'10px'}}>
                  <p>Wallet Address</p>
                  <input className="token-input" value={this.state.wallet} onChange={this.handleChangeWalletId}></input>
                </div>
                <div style={{textAlign:'left', marginLeft:'10px', marginTop:'31px', width:"326px !important" }}>
                  <button className="submit-button" type="submit" onClick={this.handleSubmit} >Submit</button>
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


