import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import axios from "axios";

import React, { Component } from "react";

class App extends Component {
  state = {
    apiEndpoint:
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
    quote: "",
    author: "",
    quotes: [],
  };

  async componentDidMount() {
    // promise (delayed operation) = pending => resolved (success) || rejected (failure)
    const object = await axios.get(this.state.apiEndpoint);
    this.setState({ quotes: object.data.quotes });
    this.newQuote();
  }

  newQuote() {
    const index = Math.floor(Math.random() * this.state.quotes.length);
    const author = this.state.quotes[index].author;
    const quote = this.state.quotes[index].quote;
    this.setState({ quote, author });
  }

  render() {
    return (
      <div id="quote-box">
        <div className="card">
          <h1 id="text">{this.state.quote}</h1>
        </div>
        <div className="row">
          <div className="tweet col-4">
            <button className="btn btn-primary">
              <a
                id="tweet-quote"
                href={`https://twitter.com/intent/tweet?hashtags=quotes,quoteMachine&text="${this.state.quote}" -${this.state.author}`}
                target="_top">
                Tweet
              </a>
            </button>
          </div>
          <div id="author" className="col-8">
            <h2>- {this.state.author}</h2>
          </div>
        </div>
        <div className="quoteBtn">
          <button
            id="new-quote"
            className="btn btn-info"
            onClick={this.newQuote.bind(this)}>
            New Quote
          </button>
        </div>
      </div>
    );
  }
}

export default App;
