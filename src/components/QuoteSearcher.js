import React, { Component } from 'react';
import Quote from './Quote'

class QuoteSearcher extends Component {
  state = {
    quotes: [],
    isItFetching: false,
    hasItFetchedAtLeastOnce: false,
    searchKeyWord: '',
    newQuoteName: '',
    newQuoteText: '',
    showNewQuoteError: false
  }
  search = () => {
    this.setState({ isItFetching: true })
    fetch(`https://quote-garden.herokuapp.com/quotes/search/${this.state.searchKeyWord}`)
      .then(res => res.json())
      .then(data => {
        const quotesWithDuplicates = data.results.map(quote => {
          return {
            ...quote,
            isLiked: 0
          }
        })
        const quotes = quotesWithDuplicates.map(element => element["quoteText"])
          .map((element, index, array) => array.indexOf(element) === index && index)
          .filter(element => quotesWithDuplicates[element])
          .map(element => quotesWithDuplicates[element])
        this.setState({
          quotes,
          isItFetching: false,
          hasItFetchedAtLeastOnce: true
        })
      })
  }
  handleOnChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    if (this.state.newQuoteText.indexOf(this.state.searchKeyWord) === -1) {
      this.setState({ showNewQuoteError: true })
    } else {
      this.setState({
        quotes: this.state.quotes.concat({
          quoteText: this.state.newQuoteText,
          quoteAuthor: this.state.newQuoteName,
          isLiked: 0,
          _id: Math.floor(Math.random() * 1000000) + 1
        }),
        showNewQuoteError: false
      })
    }
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
    const authorArray = this.state.quotes.map(element => element["quoteAuthor"])
      .filter((element, index, array) => array.indexOf(element) === index)
    return (
      <div>
        <h2>Number of quotes: {this.state.quotes.length}, and number of distinct authors: {authorArray.length}</h2>
        <input type="text" name="searchKeyWord" onChange={this.handleOnChange} value={this.state.searchKeyWord} />
        <button onClick={this.search}>Search!</button>
        <h2>Liked: {this.state.quotes.reduce((sum, quote) => {
          return (quote.isLiked === 1) ? sum += 1 : sum
        }, 0)}
          /Disliked: {this.state.quotes.reduce((sum, quote) => {
            return (quote.isLiked === -1) ? sum += 1 : sum
          }, 0)}</h2>
        {this.state.quotes.length === 0 && this.state.hasItFetchedAtLeastOnce && 'Unfortunately there is no quote for this keyword'}
        {!this.state.isItFetching && this.state.quotes.map(quote => {
          return <Quote
            text={quote.quoteText}
            author={quote.quoteAuthor}
            id={quote._id}
            isLiked={quote.isLiked}
            key={quote._id}
            setLiked={this.setLiked}
          />
        })}
        {this.state.isItFetching && 'Loading...'}
        {this.state.showNewQuoteError && 'The comment does not contain the search keyword and therefore will not be added!'}
        {this.state.quotes.length > 0 && <form onSubmit={this.handleSubmit}><label>
          Name:
        <input type="text" name="newQuoteName" onChange={this.handleOnChange} value={this.state.newQuoteName} />
        </label>
          <label>
            New quote:
        <input type="text" name="newQuoteText" onChange={this.handleOnChange} value={this.state.newQuoteText} />
          </label>
          <input type="submit" value="Add new quote" />
        </form>}
      </div>
    );
  }
}

export default QuoteSearcher;