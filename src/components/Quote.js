import React, { Component } from 'react';
import PropTypes from "prop-types";
import './Quote.css'

class Quote extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  };
  state = {
    isLiked: 0
  }
  render() {
    return (
      <div>
        <p style={
          this.props.isLiked === -1 ? { color: 'red', 'text-decoration': 'line-through' }
            : this.props.isLiked ? { color: 'green' }
              : { color: 'black' }
        }>
          {this.props.text}
        </p>
        <p className="inlineDisplay" style={
          this.props.isLiked === -1 ? { color: 'red', 'text-decoration': 'line-through' }
            : this.props.isLiked ? { color: 'green' }
              : { color: 'black' }
        }>
          By: {this.props.author}
        </p>
        <button onClick={() => this.setState({ isLiked: 1 })}>:)</button>
        <button onClick={() => this.setState({ isLiked: -1 })}>:(</button>
      </div>
    );
  }
}

export default Quote;