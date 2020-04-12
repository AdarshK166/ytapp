import React, { Component } from "react";
import axios from "axios";

//npm i react-axios
//hooks

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      loading: false,
      message: "",
    };
  }

  fetchSearchResults = (query) => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?key=AIzaSyD6mUR1KuljIVgDFGEQGhY-UwZrTCu_MxQ`,
        {
          params: {
            part: "snippet",
            q: query,
            type: "video",
            maxResults: 6,
            order: "relevance",
            safeSearch: "moderate",
          },
        }
      )
      .then((res) => {
        this.setState({
          results: res.data.items,
        });
      });
  };

  handleOnInputChange = (event) => {
    const query = event.target.value;
    this.setState({ query: query }, () => {
      this.fetchSearchResults(query);
    });
  };

  renderSearchResults = () => {
    const { results } = this.state;

    if (Object.keys(results).length && results.length) {
      return (
        <div className="resultsContainer">
          {results.map((result) => {
            const videoSrc = `https://img.youtube.com/vi/${result.id.videoId}/sddefault.jpg`;
            return (
              <a key={result.id.kind}>
                <img src={videoSrc} width="250" height="250"></img>
                <h3>{result.snippet.title}</h3>
              </a>
            );
          })}
        </div>
      );
    }
  };

  render() {
    const { query } = this.state;
    console.warn(this.state);

    return (
      <div className="container">
        <h2 className="heading">Youtube search</h2>
        <input
          type="text"
          name="query"
          value={query}
          id="search-input"
          placeholder="Input text"
          onChange={this.handleOnInputChange}
        ></input>
        {this.renderSearchResults()}
      </div>
    );
  }
}

export default Search;
