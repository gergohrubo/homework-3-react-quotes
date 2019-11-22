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
          quotes: data.results.map(quote => {
            return {
              ...quote,
              isLiked: 0
            }
          }),
          isTheDataHere: true
        })
      })
  }
  setLiked = (id, liked) => {
    this.setState({
      quotes: this.state.quotes.map(quote => {
        if (quote._id === id) {
          quote.isLiked = liked
        }
        return quote
      })
    })
  }
  render() {
    return (
      <div>
        <h2>Liked: {this.state.quotes.reduce((sum, quote) => {
          return (quote.isLiked === 1) ? sum += 1 : sum
        }, 0)}
          /Disliked: {this.state.quotes.reduce((sum, quote) => {
            return (quote.isLiked === -1) ? sum += 1 : sum
          }, 0)}</h2>
        {this.state.isTheDataHere && this.state.quotes.map(quote => {
          return <Quote
            text={quote.quoteText}
            author={quote.quoteAuthor}
            id={quote._id}
            isLiked={quote.isLiked}
            key={quote._id}
            setLiked={this.setLiked}
          />
        })}
        {!this.state.isTheDataHere && 'Loading...'}
      </div>
    );
  }
}

export default QuoteSearcher;