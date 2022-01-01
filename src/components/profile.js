import React from 'react';


export default class Profile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {profile: JSON.parse(this.props.profile)}
    }
  
  
    render() {
      return (
          <>
          <br />
          <div style={{display: 'flex'}}>
            <div style={{ textAlign:"center"}}>
              <h3>TokenId: {this.state.profile["token_id"]}</h3>
              <div >
                <p className="data-filed">  Rarest Trait:  <b>{this.state.profile["rarest_trait"]}</b></p>
                <p className="data-filed">  Most Valuable Trait:  <b>{this.state.profile["most_valued_trait"]}</b></p>
              </div>
              <a href={this.state.profile["opensea"]}><img height="400px" width="400px" src={this.state.profile["image_url"]}></img></a>
            </div>
            <div style={{marginLeft: "50px", textAlign:"left"}}><h3>Price Profile: </h3>
              <p className="data-filed">  Collection Floor: <b>{this.state.profile["price_profile"]["collection_floor"]}</b></p>
              <p className="data-filed">  Last Sale: <b>{this.state.profile["price_profile"]["last_sale"]}</b></p>
              <p className="data-filed">  Rarest Trait Floor: <b>{this.state.profile["price_profile"]["most_rare_trait_floor"]}</b></p>
              <p className="data-filed">  Most Valuable Trait Floor: <b>{this.state.profile["price_profile"]["most_valued_trait_floor"]}</b></p>
              <p className="data-filed">  Rarity Weighted Traits Floor: <b>{this.state.profile["price_profile"]["rarity_weighted_floor"]?.toFixed(2)}</b></p>
              <p className="data-filed">  Average Last 3 Most Valuable Trait Sales : <b>{this.state.profile["price_profile"]["avg_last_three_mvt_sales"]?.toFixed(2)}</b></p>
              <p className="data-filed">  Last Sale * Most Valuable Trait Avg Price Change: <b>{this.state.profile["price_profile"]["last_sale_relative_mvt_avg"]?.toFixed(2)}</b></p>
              <h3>Velocity Profile:</h3>
              <p className="data-filed">  Avg days between Rarest Trait sales: <b>{this.state.profile["liquidity_profile"]["rarest_trait_sale_frequency_30d"]?.toFixed(2)}</b></p>
              <p className="data-filed">  Avg days between Most Valuable Trait sales: <b>{this.state.profile["liquidity_profile"]["mvt_sale_frequency_30d"]?.toFixed(2)}</b></p>
              <p className="data-filed">  Highest days between any Trait sales: <b>{this.state.profile["liquidity_profile"]["lowest_sale_frequency_30d"]?.toFixed(2)}</b></p>
            </div>
            
            </div>
          </>
      );
    }
  }