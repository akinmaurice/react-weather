import React, { Component } from 'react';
import Search from './Search';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-lg-12 text-center">
            <div className="row justify-content-center align-items-center">
              <a href="/">
                <h1 className="mt-3 text-red">Weather 1.0</h1>
              </a>
            </div>
            <Search />
            <Footer />
          </div>
        </div>
    );
  }
}

export default App;