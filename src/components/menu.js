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
            <a className="menuItem" href="https://dialectic.notion.site/The-Orbacle-73ea6a072290422d8d9b731ec74fe84b" target="_blank">About</a>
            <a className="menuItem" href="https://api.prod.theorbacle.com/docs" target="_blank">API Docs</a>
            <a className="menuItem" href="https://github.com" target="_blank">Source Code</a>
            <a className="menuItem" href="https://twitter.com/Mephistophy" target="_blank">Contact</a>
          </div>
          
          </>
      );
    }
  }