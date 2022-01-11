import React from 'react';


export default class Profile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {profile: this.props.profile}
    }
  
  
    render() {
      return (
          <>
          <div className="profile-collection">
          <h2> {this.state.profile["collection_name"]}</h2>
          <div style={{ textAlign:"left"}}>
            <h3>Collection Profile:</h3>
            <div style={{display:"flex"}}>
              <div>
                <p className="data-filed">  24h Volume: <b>{this.state.profile.collection_profile["daily_volume"]?.toFixed(2)} </b></p>
                <p className="data-filed">  24h Sales: <b>{this.state.profile.collection_profile["daily_sales"]}</b></p>
                <p className="data-filed">  Nr Of Owners: <b>{this.state.profile.collection_profile["nr_owners"]}</b></p>  
                <p className="data-filed">  Avg. trait Rarity: <b>{(this.state.profile.collection_profile["avg_trait_rarity"]/100).toFixed(2)} %</b></p>          
              </div>
              <div style={{marginLeft:"100px"}}>
                <p className="data-filed">  Collection Floor: <b>{this.state.profile.price_profile["collection_floor"]?.toFixed(2)} </b></p>
                <p className="data-filed">  24h Avg Price: <b>{this.state.profile.collection_profile["daily_avg_price"]?.toFixed(2)} </b></p>
                <p className="data-filed">  7d Avg Price: <b>{this.state.profile.collection_profile["weekly_avg_price"]?.toFixed(2)} </b></p>
                <p className="data-filed">  30d Avg Price: <b>{this.state.profile.collection_profile["monthly_avg_price"]?.toFixed(2)} </b></p>           
              </div> <div style={{marginLeft:"100px"}}> 
                <p className="data-filed">  Nr Listed: <b>{this.state.profile.collection_profile["nr_listed_now"]}</b></p>           
                <p className="data-filed">  New Listings 14d: <b>{this.state.profile.collection_profile["nr_new_listings_14d"]}</b></p>
                <p className="data-filed">  Cancelled Listings 14d: <b>{this.state.profile.collection_profile["nr_cancelled_listings_14d"]}</b></p>
                <p className="data-filed">  Sales 14d: <b>{this.state.profile.collection_profile["nr_sales_14d"]}</b></p>           
              </div>
            </div>
          </div>
          <div >
          <h2> {this.state.profile["name"]}</h2>
          </div>
          <div  style={{display: 'flex',textAlign:"center"}}>
            <div style={{ textAlign:"left"}}>
              <div style={{textAlign:"left"}}> 
              <h3>Token Profile: </h3>
                <p className="data-filed">  Avg. Price:  <b>{this.state.profile.price_profile["avg_price"]?.toFixed(2)} </b></p>
                <p className="data-filed">  Max Price:  <b>{this.state.profile.price_profile["max_price"]?.toFixed(2)} </b></p>
                <p className="data-filed">  Min Price:  <b>{this.state.profile.price_profile["min_price"]?.toFixed(2)} </b></p>
                <p className="data-filed">  Listing Price:  <b>{this.state.profile["listing_price"]?.toFixed(2)} </b></p>
                <p className="data-filed">  Times Listed 30d:   <b>{this.state.profile["nr_listings_30d"]}</b></p>
                <p className="data-filed">  Owner:  <b><a className="profile-link" target="_blank" href={"https://opensea.io/" + this.state.profile["owner"]}>{this.state.profile["owner"]}</a></b></p>
                <p className="data-filed">  Owner Nr Tokens:  <b>{this.state.profile["owner_tokens_in_collection"]}</b></p>
                <br></br>
               </div>
              <a className="profile-link" href={this.state.profile["opensea"]} target="_blank"><img height="500px" width="500px" src={this.state.profile["image_url"]}></img></a>
            </div>
            <div style={{marginLeft: "50px", textAlign:"left"}}>
              
              <h3>Price Profile: </h3>
              <p className="data-filed">  Last Sale: <b>{this.state.profile["price_profile"]["last_sale"]?.toFixed(2)}</b></p>
              <p className="data-filed">  Rarest Trait Floor: <b>{this.state.profile["price_profile"]["most_rare_trait_floor"]?.toFixed(2)}</b></p>
              <p className="data-filed">  Most Valuable Trait Floor: <b>{this.state.profile["price_profile"]["most_valued_trait_floor"]?.toFixed(2)}</b></p>
              <p className="data-filed">  Rarity Weighted Traits Floor: <b>{this.state.profile["price_profile"]["rarity_weighted_floor"]?.toFixed(2)} </b></p>
              <p className="data-filed">  Average Last 3 Most Valuable Trait Sales: <b>{this.state.profile["price_profile"]["avg_last_three_mvt_sales"]?.toFixed(2)} </b></p>
              <p className="data-filed">  Last Sale * Avg Price Change Most Valuable Trait: <b>{this.state.profile["price_profile"]["last_sale_relative_mvt_avg"]?.toFixed(2)} </b></p>
              <p className="data-filed">  Last Sale * Avg Price Change Collection: <b>{this.state.profile["price_profile"]["last_sale_relative_collection_avg"]?.toFixed(2)} </b></p>
              <h3 style={{marginTop:'25px'}}>Liquidity Profile:</h3>
              <p className="data-filed">  Nr Sales Above Max Price 60d: <b>{this.state.profile["liquidity_profile"]["nr_sales_above_max_price_60d"]}</b></p>
              <p className="data-filed">  Nr Sales Rarest Trait last 60d: <b>{this.state.profile["liquidity_profile"]["rarest_trait_sale_count_60d"]?.toFixed(0)}</b></p>
              <p className="data-filed">  Nr Sales Most Valuable Trait last 60d: <b>{this.state.profile["liquidity_profile"]["mvt_sale_count_60d"]?.toFixed(0)}</b></p>
              <p className="data-filed">  Lowest sales on any Trait last 60d: <b>{this.state.profile["liquidity_profile"]["lowest_trait_sales_60d"]?.toFixed(0)}</b></p>
              <p className="data-filed">  Rarest Trait Nr Listed: <b>{this.state.profile["liquidity_profile"]["rarest_trait_nr_listed"][0]} / {this.state.profile["liquidity_profile"]["rarest_trait_nr_listed"][1]}</b></p>
              <p className="data-filed">  Most Valuable Trait Nr Listed: <b>{this.state.profile["liquidity_profile"]["mvt_nr_listed"][0]} / {this.state.profile["liquidity_profile"]["mvt_nr_listed"][1]}</b></p>
              
              <h3 style={{marginTop:'25px'}}>Rarity Profile:</h3>
              <p className="data-filed">  Rarest Trait: <b>{this.state.profile["rarity_profile"]["rarest_trait"]}</b></p>
              <p className="data-filed">  Most Valuable Trait: <b>{this.state.profile["rarity_profile"]["most_valued_trait"]}</b></p>
              <p className="data-filed">  Tokens 3 trait overlap: <b>{this.state.profile["rarity_profile"]["traits_3_combination_overlap"]} -  <br/>
              <p style={{marginLeft:'10px'}}>
                  {
                    this.state.profile["rarity_profile"]["traits_3_combination_overlap_ids"]?.slice(0,60).map(
                      (value, idx) =>
                        <a className="profile-link" href={ this.state.profile["opensea"].substring(0, 69) + value} target="_blank">
                          {idx!== 0 && idx % 10 == 0 ? <br/>:""} {value}
                        </a>)
                  }{
                      this.state.profile["rarity_profile"]["traits_3_combination_overlap_ids"]?.length > 60 ? " ...":""
                  }
                </p></b>
              </p>
              <p className="data-filed">  Tokens 4 trait overlap: <b>{this.state.profile["rarity_profile"]["traits_4_combination_overlap"]} -  <br/>
                <p style={{marginLeft:'10px'}}>
                  {
                    this.state.profile["rarity_profile"]["traits_4_combination_overlap_ids"]?.slice(0,60).map(
                      (value, idx) =>
                        <a className="profile-link"  href={ this.state.profile["opensea"].substring(0, 69) + value} target="_blank">
                          {idx!== 0 && idx % 10 == 0 ? <br/>:""} {value}
                        </a>) 
                  }{
                    this.state.profile["rarity_profile"]["traits_4_combination_overlap_ids"]?.length > 60 ? " ...":""
                }
                </p></b>
              </p>
              <p className="data-filed">  Tokens 5 trait overlap: <b>{this.state.profile["rarity_profile"]["traits_5_combination_overlap"]} -  <br/>
                <p style={{marginLeft:'10px'}}>
                  {
                    this.state.profile["rarity_profile"]["traits_5_combination_overlap_ids"]?.slice(0,60).map(
                      (value, idx) =>
                        <a className="profile-link" href={ this.state.profile["opensea"].substring(0, 69) + value} target="_blank">
                          {idx!== 0 && idx % 10 == 0 ? <br/>:""} {value}
                        </a>) 
                  }{
                    this.state.profile["rarity_profile"]["traits_5_combination_overlap_ids"]?.length > 60 ? " ...":""
                }
                </p></b>
              </p>
              </div>
            
            </div>
            </div>
          </>
      );
    }
  }