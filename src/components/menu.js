import React from 'react';


export default class Menu extends React.Component {
    constructor(props) {
      super(props);
      //this.state = {profile: JSON.parse(this.props.profile)}
    }
  
  
    render() {
      return (
          <>
          <div style={{display:'flex', justifyContent:'right'}}>
            <a className="menuItem">About</a>
            <a className="menuItem" href="https://github.com">Source Code</a>
            <a className="menuItem" href="https://twitter.com/Mephistophy">Contact</a>
          </div>
          </>
      );
    }
  }