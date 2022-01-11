import React from 'react';


export default class WalletProfile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {profile: this.props.profile}
    }
  
  
    render() {
      return (
          <>
            <div className="profile-collection">
                  <h3>Value Profile: </h3>
                  <p className="data-filed"> Total Value Max <b>{this.state.profile["total_value_max"]?.toFixed(2)}</b></p>
                  <p className="data-filed">  Total Value Avg: <b>{this.state.profile["total_value_avg"]?.toFixed(2)}</b></p>
                  <p className="data-filed">  Total Value Min <b>{this.state.profile["total_value_min"]?.toFixed(2)}</b></p>
                  
                  <br/>
                  {
                    Object.entries(this.state.profile["tokens"]).map(([key, value]) =>
                      <div>
                        <div  style={{display: 'flex',textAlign:"center"}}>
                          <div style={{ textAlign:"left",paddingTop:"5px"}}>  
                            <a  href={value.opensea} target="_blank"><img height="300px" width="300px" src={value.img}></img></a>
                          </div>
                          <div style={{marginLeft: "50px", textAlign:"left"}}>
                            <p className="data-filed">  Max Price: <b>{value.price_profile["max_price"]?.toFixed(2)}</b></p>
                            <p className="data-filed" >  Avg Price: <b>{value.price_profile["avg_price"]?.toFixed(2)}</b></p>
                            <p className="data-filed"style={{marginBottom:'10px'}}>  Min Price: <b>{value.price_profile["min_price"]?.toFixed(2)}</b></p>
                            <p className="data-filed">  Last Sale: <b>{value.price_profile["last_sale"]?.toFixed(2)}</b></p>
                            <p className="data-filed">  Rarest Trait Floor: <b>{value.price_profile["most_rare_trait_floor"]?.toFixed(2)}</b></p>
                            <p className="data-filed">  Most Valuable Trait Floor: <b>{value.price_profile["most_valued_trait_floor"]?.toFixed(2)}</b></p>
                            <p className="data-filed">  Rarity Weighted Traits Floor: <b>{value.price_profile["rarity_weighted_floor"]?.toFixed(2)} </b></p>
                            <p className="data-filed">  Average Last 3 Most Valuable Trait Sales: <b>{value.price_profile["avg_last_three_mvt_sales"]?.toFixed(2)} </b></p>
                            <p className="data-filed">  Last Sale * Avg Price Change Most Valuable Trait: <b>{value.price_profile["last_sale_relative_mvt_avg"]?.toFixed(2)} </b></p>
                            <p className="data-filed">  Last Sale * Avg Price Change Collection: <b>{value.price_profile["last_sale_relative_collection_avg"]?.toFixed(2)} </b></p>
                          
                            <br/> 
                          </div>
                        </div>
                      </div>
                    ) 
                  }
            </div>
          </>
      );
    }
  }