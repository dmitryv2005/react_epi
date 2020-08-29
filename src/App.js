import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import EpiBuilder from './containers/EpiBuilder/EpiBuilder';

class App extends Component {
  render() {
    return <div className="App">
      <Layout>
        <EpiBuilder/>
      </Layout>
    </div>;
  }
}

export default App;
