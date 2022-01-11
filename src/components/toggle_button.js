import PropTypes from "prop-types";
import React, { Component } from "react";

export class ToggleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { selected, toggleSelected } = this.props;
    return (
      <div className="toggle-container" onClick={toggleSelected}>
        <div className={`dialog-button ${selected ? "" : "disabled"}`}>
          {selected ? "Wallet" : "Token"}
        </div>
      </div>
    );
  }
}

ToggleButton.propTypes = {
  selected: PropTypes.bool.isRequired,
  toggleSelected: PropTypes.func.isRequired
};
