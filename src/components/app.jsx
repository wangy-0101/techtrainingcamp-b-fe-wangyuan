import React, { Component } from 'react';
import Main from "./main";
import './search.css'

export default class App extends Component {
  state = {
    searchTxt: ''
  }

  setSearchTxt = (SearchTxt) => {
    //更新状态
    this.setState({ SearchTxt })
  }

  render() {
    return (
      <div className="container">
        <Main SearchTxt={this.state.SearchTxt} />
      </div>
    )
  }
}
