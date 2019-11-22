import React, { Component } from 'react';
import Quote from './Quote'

class QuoteSearcher extends Component {
  state = {
    quotes: [],
    isTheDataHere: false
  }
  componentDidMount() {
    fetch('https://quote-garden.herokuapp.com/quotes/search/tree')
      .then(res => res.json())
      .then(data => {
        this.setState({
          quotes: data.results,
          isTheDataHere: true
        })
      })
  }
  render() {
    return (
      <div>
        {this.state.isTheDataHere && this.state.quotes.map(quote => <Quote text={quote.quoteText} author={quote.quoteAuthor} key={quote._id} />)}
        {!this.state.isTheDataHere && 'Loading...'}
      </div>
    );
  }
}

export default QuoteSearcher;